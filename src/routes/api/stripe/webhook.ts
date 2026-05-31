// Stripe webhook endpoint.
//
// Route path: /api/stripe/webhook
// Production: https://www.theaivisionweaver.com/api/stripe/webhook
//
// TanStack Start 1.167.x: HTTP method handlers attach to a regular file route
// via the `server.handlers` config. The file route generator picks this up by
// scanning for `createFileRoute` (from @tanstack/react-router), which is why
// the earlier `createServerFileRoute` version never registered.

import { createFileRoute } from "@tanstack/react-router";
import Stripe from "stripe";
import { getServerConfig } from "@/lib/config.server";
import { getSupabaseAdmin } from "@/lib/supabase/admin.server";

export const Route = createFileRoute("/api/stripe/webhook")({
  server: {
    handlers: {
      // Stripe sometimes pings GET when you verify the endpoint in the dashboard.
      GET: () =>
        new Response(
          JSON.stringify({
            ok: true,
            endpoint: "/api/stripe/webhook",
            note: "Send POST events from Stripe here.",
          }),
          { status: 200, headers: { "content-type": "application/json" } }
        ),

      POST: async ({ request }) => {
        const cfg = getServerConfig();
        if (!cfg.stripeSecretKey || !cfg.stripeWebhookSecret) {
          console.error("[stripe.webhook] missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET");
          return new Response("Stripe not configured", { status: 500 });
        }

        const signature = request.headers.get("stripe-signature");
        if (!signature) {
          return new Response("Missing stripe-signature header", { status: 400 });
        }

        // IMPORTANT: Stripe verifies the RAW body. Do not parse to JSON first.
        const rawBody = await request.text();
        const stripe = new Stripe(cfg.stripeSecretKey);

        let event: Stripe.Event;
        try {
          // constructEventAsync uses Web Crypto and works in Edge/Node runtimes.
          event = await stripe.webhooks.constructEventAsync(
            rawBody,
            signature,
            cfg.stripeWebhookSecret
          );
        } catch (err) {
          const message = err instanceof Error ? err.message : "unknown";
          console.error("[stripe.webhook] signature verification failed:", message);
          return new Response(`Invalid signature: ${message}`, { status: 400 });
        }

        try {
          await handleEvent(event);
        } catch (err) {
          console.error("[stripe.webhook] handler error:", err);
          return new Response("Handler failed", { status: 500 });
        }

        return new Response(JSON.stringify({ received: true, type: event.type }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      },
    },
  },
});

// ----- Event handlers -----

async function handleEvent(event: Stripe.Event) {
  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      await onCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
      break;

    case "checkout.session.async_payment_failed":
      await onCheckoutFailed(event.data.object as Stripe.Checkout.Session);
      break;

    case "payment_intent.payment_failed":
      await onPaymentFailed(event.data.object as Stripe.PaymentIntent);
      break;

    case "charge.refunded":
      await onCharged(event.data.object as Stripe.Charge);
      break;

    default:
      console.log("[stripe.webhook] unhandled event:", event.type);
  }
}

async function onCheckoutCompleted(session: Stripe.Checkout.Session) {
  const sb = getSupabaseAdmin();
  if (!sb) throw new Error("Supabase admin not configured");

  const productSlug =
    (session.metadata?.product_slug as string | undefined) ?? null;

  let productId: string | null = null;
  if (productSlug) {
    const { data } = await sb
      .from("products")
      .select("id")
      .eq("slug", productSlug)
      .maybeSingle();
    productId = (data?.id as string) ?? null;
  }

  const row = {
    stripe_session_id: session.id,
    stripe_payment_intent_id:
      typeof session.payment_intent === "string" ? session.payment_intent : null,
    stripe_customer_id:
      typeof session.customer === "string" ? session.customer : null,
    customer_email: session.customer_details?.email ?? session.customer_email ?? null,
    product_slug: productSlug,
    product_id: productId,
    amount_total: session.amount_total ?? null,
    currency: session.currency ?? "usd",
    status: "succeeded",
    metadata: session.metadata ?? {},
  };

  // Upsert by stripe_session_id so retries are idempotent.
  const { error } = await sb
    .from("orders")
    .upsert(row, { onConflict: "stripe_session_id" });
  if (error) throw error;
}

async function onCheckoutFailed(session: Stripe.Checkout.Session) {
  const sb = getSupabaseAdmin();
  if (!sb) return;
  const row = {
    stripe_session_id: session.id,
    stripe_payment_intent_id:
      typeof session.payment_intent === "string" ? session.payment_intent : null,
    customer_email: session.customer_details?.email ?? session.customer_email ?? null,
    amount_total: session.amount_total ?? null,
    currency: session.currency ?? "usd",
    status: "failed",
    metadata: session.metadata ?? {},
  };
  await sb.from("orders").upsert(row, { onConflict: "stripe_session_id" });
}

async function onPaymentFailed(intent: Stripe.PaymentIntent) {
  const sb = getSupabaseAdmin();
  if (!sb) return;
  await sb
    .from("orders")
    .update({ status: "failed" })
    .eq("stripe_payment_intent_id", intent.id);
}

async function onCharged(charge: Stripe.Charge) {
  if (!charge.refunded) return;
  const sb = getSupabaseAdmin();
  if (!sb) return;
  await sb
    .from("orders")
    .update({ status: "refunded" })
    .eq("stripe_payment_intent_id", charge.payment_intent as string);
}
