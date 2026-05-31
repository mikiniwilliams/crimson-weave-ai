// Embedded Stripe Checkout — creates a Checkout Session for a Vault product
// and returns the redirect URL. The Vault detail page calls this on CTA click.
//
// Route path: POST /api/checkout
// Request body: { slug: string }
// Response:     { url: string }   (Stripe-hosted checkout URL)
//
// On success: Stripe webhook fires checkout.session.completed → row written
// to public.orders with metadata.product_slug = <slug>, so the customer's
// /my-vault portal can pair the order to the product automatically.

import { createFileRoute } from "@tanstack/react-router";
import Stripe from "stripe";
import { getServerConfig } from "@/lib/config.server";
import { getSupabaseAdmin } from "@/lib/supabase/admin.server";

export const Route = createFileRoute("/api/checkout")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const cfg = getServerConfig();
        if (!cfg.stripeSecretKey) {
          return jsonError("Stripe not configured", 500);
        }

        let slug: string | undefined;
        try {
          const body = await request.json();
          slug = typeof body?.slug === "string" ? body.slug : undefined;
        } catch {
          return jsonError("Body must be JSON: { slug }", 400);
        }
        if (!slug) return jsonError("Missing 'slug' in request body", 400);

        const sb = getSupabaseAdmin();
        if (!sb) return jsonError("Supabase not configured", 500);

        // Look up product. Admin client bypasses RLS so we can read regardless
        // of session state — but we still enforce status='active' so drafts
        // can't be purchased.
        const { data, error } = await sb
          .from("products")
          .select("slug, title, stripe_price_id, status, delivery_type")
          .eq("slug", slug)
          .maybeSingle();
        if (error) return jsonError(error.message, 500);
        if (!data) return jsonError("Product not found", 404);
        if (data.status !== "active") {
          return jsonError("Product is not available for purchase", 400);
        }
        if (!data.stripe_price_id) {
          return jsonError(
            "Product has no stripe_price_id. Set one in /admin/products.",
            400
          );
        }

        const origin = new URL(request.url).origin;
        const stripe = new Stripe(cfg.stripeSecretKey);

        try {
          const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: [{ price: data.stripe_price_id, quantity: 1 }],
            // Pair the session back to our product on the webhook side.
            metadata: { product_slug: data.slug },
            // Where Stripe sends the user after success/cancel.
            success_url: `${origin}/my-vault?welcome=1&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/vault/${data.slug}`,
            // Collect email so the order can be matched to a Supabase user later.
            customer_email: undefined,
            phone_number_collection: { enabled: false },
            allow_promotion_codes: true,
          });
          if (!session.url) return jsonError("Stripe returned no session URL", 500);
          return new Response(JSON.stringify({ url: session.url }), {
            status: 200,
            headers: { "content-type": "application/json" },
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : "Stripe error";
          console.error("[checkout] create failed:", message);
          return jsonError(message, 500);
        }
      },
    },
  },
});

function jsonError(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "content-type": "application/json" },
  });
}
