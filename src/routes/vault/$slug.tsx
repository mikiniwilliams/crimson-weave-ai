import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Nav } from "@/components/site/nav";
import { CelestialDivider } from "@/components/site/patterns";
import { ArrowRight, ChevronLeft, Lock, Sparkles } from "lucide-react";
import { loadProductBySlug } from "@/lib/products";
import type { Product } from "@/lib/products/types";

// Click handler for the dynamic checkout path. Starts a Stripe Checkout
// Session for the given product slug and redirects the browser to it.
async function startCheckout(slug: string): Promise<string | null> {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ slug }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Checkout failed: ${res.status}`);
  }
  const { url } = (await res.json()) as { url?: string };
  return url ?? null;
}

export const Route = createFileRoute("/vault/$slug")({
  component: VaultProductPage,
  head: ({ params }) => ({
    meta: [
      { title: `${prettifySlug(params.slug)} — The Vault` },
      {
        name: "description",
        content: `An artifact from The Vault by The AI Vision Weaver.`,
      },
    ],
  }),
});

function prettifySlug(slug: string): string {
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

// Lightweight, scaffold-friendly detail page. Renders whatever product fields
// exist in Supabase + sensible default scaffolding (benefits, what's included,
// FAQ) so we can flesh these out later without rebuilding the route.
function VaultProductPage() {
  const { slug } = Route.useParams();
  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadProductBySlug(slug).then((p) => {
      if (!cancelled) setProduct(p);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const onBuyDynamic = async () => {
    if (!product) return;
    setCheckingOut(true);
    setCheckoutError(null);
    try {
      const url = await startCheckout(product.slug);
      if (url) window.location.href = url;
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Checkout failed.");
      setCheckingOut(false);
    }
  };

  if (product === undefined) {
    return (
      <div className="min-h-screen bg-[var(--cream)] text-[var(--foreground)]">
        <Nav />
        <main className="max-w-4xl mx-auto px-6 py-24 text-center text-[var(--muted-foreground)]">
          Loading artifact…
        </main>
      </div>
    );
  }

  if (product === null) {
    return (
      <div className="min-h-screen bg-[var(--cream)] text-[var(--foreground)]">
        <Nav />
        <main className="max-w-4xl mx-auto px-6 py-24 text-center">
          <h1 className="font-display text-4xl text-[var(--espresso)]">
            Artifact not found
          </h1>
          <p className="mt-4 text-[var(--espresso)]/70">
            This artifact may be archived or moved. Return to the Vault to see active artifacts.
          </p>
          <Link
            to="/"
            hash="vault"
            className="btn-primary mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium tracking-wide"
          >
            Back to the Vault <ArrowRight className="w-4 h-4" />
          </Link>
        </main>
      </div>
    );
  }

  // Purchase mode resolution:
  //   1. Has stripe_payment_link  -> link directly to the Payment Link (legacy/manual)
  //   2. Has stripe_price_id      -> POST /api/checkout to create a session at click
  //   3. Neither                  -> "Coming soon"
  const purchaseHref = product.stripePaymentLink;
  const canCheckoutDynamic = !purchaseHref && Boolean(product.stripePriceId);
  const hasPurchase = Boolean(purchaseHref) || canCheckoutDynamic;

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--foreground)]">
      <Nav />
      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        <Link
          to="/"
          hash="vault"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[var(--espresso)]/70 hover:text-[var(--crimson)] transition"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> Return to the Vault
        </Link>

        <div className="mt-10 grid lg:grid-cols-12 gap-12 items-start">
          {/* Visual panel */}
          <aside className="lg:col-span-5">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--wine)] to-[oklch(0.22_0.07_25)] glow-card">
              <div className="absolute inset-0 weave-pattern opacity-60" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,oklch(0.78_0.13_80_/_0.55),transparent_60%)]" />
              {product.image && (
                <img
                  src={product.image}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              )}
              <Lock className="absolute top-5 right-5 w-4 h-4 text-[var(--gold)]/60" />
              <div className="absolute bottom-5 left-5 text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]/80">
                Artifact · {(product.sortOrder || 1).toString().padStart(2, "0")}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display italic text-[var(--gold)] text-3xl md:text-4xl drop-shadow-[0_0_30px_oklch(0.78_0.13_80_/_0.6)]">
                  {product.category}
                </span>
              </div>
            </div>
          </aside>

          {/* Detail panel */}
          <article className="lg:col-span-7">
            <div className="text-[var(--gold)] uppercase tracking-[0.3em] text-xs mb-3 inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> The Vault · {product.category}
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-[var(--espresso)] leading-tight">
              {product.title}
            </h1>
            <p className="mt-6 text-lg text-[var(--espresso)]/80 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-8 flex items-center gap-5">
              <span className="font-display text-4xl text-[var(--crimson)]">
                {product.price}
              </span>
              {purchaseHref ? (
                <a
                  href={purchaseHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-medium tracking-wide"
                >
                  {product.ctaLabel} <ArrowRight className="w-4 h-4" />
                </a>
              ) : canCheckoutDynamic ? (
                <button
                  type="button"
                  onClick={onBuyDynamic}
                  disabled={checkingOut}
                  className="btn-primary inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-medium tracking-wide disabled:opacity-70"
                >
                  {checkingOut ? "Preparing…" : product.ctaLabel} <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <span className="text-sm uppercase tracking-[0.25em] text-[var(--muted-foreground)]">
                  Coming soon
                </span>
              )}
            </div>
            {checkoutError && (
              <p className="mt-3 text-sm text-[var(--crimson)]">{checkoutError}</p>
            )}

            <CelestialDivider />

            {/* Scaffolded sections — currently render sensible defaults derived from the
                product's category/delivery type. When the data model is extended with
                benefits / inclusions / faq fields, swap these placeholders for real content. */}
            <Section title="What you receive">
              <ul className="space-y-2 text-[var(--espresso)]/80">
                <Bullet>Lifetime access to the artifact and all future updates</Bullet>
                <Bullet>Delivered as a {product.deliveryType}</Bullet>
                <Bullet>Designed and curated by The AI Vision Weaver</Bullet>
              </ul>
            </Section>

            <Section title="Why this exists">
              <p className="text-[var(--espresso)]/80 leading-relaxed">
                Built for entrepreneurs, consultants, and creators ready to turn ideas into
                intelligent brands, content systems, and digital income — without losing their
                voice or vision in the process.
              </p>
            </Section>

            <Section title="Questions">
              <FaqItem
                q="How is this delivered?"
                a={`Delivered as a ${product.deliveryType}. Access details are sent right after purchase.`}
              />
              <FaqItem
                q="Is this a one-time payment?"
                a="Yes — the listed price is a one-time payment unless otherwise noted on the purchase page."
              />
              <FaqItem
                q="Do you offer support?"
                a="Every artifact comes with email support from The AI Vision Weaver studio."
              />
            </Section>

            {hasPurchase && (
              <div className="mt-12 rounded-3xl border border-[oklch(0.78_0.13_80_/_0.35)] bg-[oklch(0.985_0.012_80_/_0.7)] p-6 md:p-8 text-center backdrop-blur">
                <p className="font-display italic text-2xl text-[var(--espresso)]">
                  "Excellence is woven, not assembled."
                </p>
                {purchaseHref ? (
                  <a
                    href={purchaseHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-medium tracking-wide"
                  >
                    {product.ctaLabel} <ArrowRight className="w-4 h-4" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={onBuyDynamic}
                    disabled={checkingOut}
                    className="btn-primary mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-medium tracking-wide disabled:opacity-70"
                  >
                    {checkingOut ? "Preparing…" : product.ctaLabel} <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </article>
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl text-[var(--espresso)]">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
      <span>{children}</span>
    </li>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border-b border-[oklch(0.78_0.13_80_/_0.25)] py-3">
      <summary className="cursor-pointer list-none font-display text-lg text-[var(--espresso)] flex items-center justify-between">
        <span>{q}</span>
        <span className="text-[var(--gold)] transition-transform group-open:rotate-45 text-xl leading-none">+</span>
      </summary>
      <p className="mt-2 text-[var(--espresso)]/75 leading-relaxed">{a}</p>
    </details>
  );
}

// Marker to satisfy import — referenced from createFileRoute's notFound option if used later.
void notFound;
