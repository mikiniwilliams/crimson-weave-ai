import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Nav } from "@/components/site/nav";
import { CelestialDivider } from "@/components/site/patterns";
import { OracleInsight } from "@/components/site/oracle-insight";
import { useAuth } from "@/lib/supabase/auth";
import { loadMyOrders, type OrderWithProduct } from "@/lib/orders";
import {
  Sparkles,
  Lock,
  ArrowRight,
  Download,
  Calendar,
  Users,
  GraduationCap,
  BookOpen,
} from "lucide-react";

export const Route = createFileRoute("/my-vault")({
  head: () => ({
    meta: [
      { title: "My Vault — The AI Vision Weaver" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): { welcome?: string; session_id?: string } => ({
    welcome: typeof search.welcome === "string" ? search.welcome : undefined,
    session_id: typeof search.session_id === "string" ? search.session_id : undefined,
  }),
  component: MyVaultPage,
});

function MyVaultPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const search = Route.useSearch();
  const justPurchased = search.welcome === "1";
  const [orders, setOrders] = useState<OrderWithProduct[] | null>(null);

  // Gate behind auth — redirect to login if not signed in.
  useEffect(() => {
    if (auth.status === "signed-out") {
      navigate({ to: "/account/login" });
    }
  }, [auth.status, navigate]);

  useEffect(() => {
    if (auth.status !== "signed-in") return;
    let cancelled = false;
    loadMyOrders().then((rows) => {
      if (!cancelled) setOrders(rows);
    });
    return () => {
      cancelled = true;
    };
  }, [auth.status]);

  if (auth.status === "loading" || auth.status === "signed-out") {
    return (
      <div className="min-h-screen bg-[var(--cream)] text-[var(--foreground)] tapestry-bg">
        <Nav />
        <main className="max-w-4xl mx-auto px-6 py-24 text-center text-[var(--muted-foreground)]">
          Loading…
        </main>
      </div>
    );
  }

  if (auth.status === "unconfigured") {
    return (
      <div className="min-h-screen bg-[var(--cream)] text-[var(--foreground)] tapestry-bg">
        <Nav />
        <main className="max-w-4xl mx-auto px-6 py-24 text-center">
          <p className="text-[var(--muted-foreground)]">
            Authentication is not configured. Please contact support.
          </p>
        </main>
      </div>
    );
  }

  const email = auth.user.email ?? "";
  const firstName =
    (auth.user.user_metadata?.first_name as string | undefined) ||
    email.split("@")[0]?.split(/[._-]/)[0] ||
    "Weaver";

  // Split orders by delivery type for the section layout.
  const downloads: OrderWithProduct[] = [];
  const workshops: OrderWithProduct[] = [];
  const community: OrderWithProduct[] = [];
  const sessions: OrderWithProduct[] = [];
  for (const o of orders ?? []) {
    switch (o.product?.deliveryType) {
      case "workshop":
        workshops.push(o);
        break;
      case "community":
        community.push(o);
        break;
      case "booking":
        sessions.push(o);
        break;
      case "download":
      default:
        downloads.push(o);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--foreground)] tapestry-bg">
      <Nav />
      <main className="max-w-6xl mx-auto px-6 pt-16 pb-24">
        <CelestialDivider label="My Vault" />

        {justPurchased && (
          <div className="max-w-2xl mx-auto mb-10 rounded-2xl border border-[oklch(0.78_0.13_80_/_0.45)] bg-[oklch(0.78_0.13_80_/_0.08)] px-5 py-4 text-center">
            <p className="font-display italic text-lg text-[var(--espresso)]">
              The thread has been woven. Your new artifact is being prepared.
            </p>
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
              If it isn't shown yet, refresh in a moment — the transmission is still arriving.
            </p>
          </div>
        )}

        <header className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="font-display text-4xl md:text-5xl text-[var(--espresso)]">
            Welcome back, <span className="gold-text italic">{capitalize(firstName)}</span>.
          </h1>
          <p className="mt-5 text-[var(--espresso)]/75">
            Your artifacts, sessions, and resources — gathered in one place.
          </p>
        </header>

        {orders === null && (
          <p className="text-center text-[var(--muted-foreground)]">Loading your artifacts…</p>
        )}

        {orders !== null && orders.length === 0 && <EmptyState />}

        {orders !== null && orders.length > 0 && (
          <div className="space-y-16">
            {downloads.length > 0 && (
              <PortalSection
                title="Purchased Artifacts"
                subtitle="Lifetime access — download anytime."
                icon={<Download className="w-3.5 h-3.5" />}
              >
                <ArtifactGrid orders={downloads} />
              </PortalSection>
            )}

            {sessions.length > 0 && (
              <PortalSection
                title="Strategy Sessions"
                subtitle="One-to-one work with The AI Vision Weaver."
                icon={<Calendar className="w-3.5 h-3.5" />}
              >
                <ArtifactGrid orders={sessions} />
              </PortalSection>
            )}

            {workshops.length > 0 && (
              <PortalSection
                title="Workshop Access"
                subtitle="Live small-group transmissions."
                icon={<GraduationCap className="w-3.5 h-3.5" />}
              >
                <ArtifactGrid orders={workshops} />
              </PortalSection>
            )}

            {community.length > 0 && (
              <PortalSection
                title="Community Memberships"
                subtitle="Your access to The AI Clarity Lab."
                icon={<Users className="w-3.5 h-3.5" />}
              >
                <ArtifactGrid orders={community} />
              </PortalSection>
            )}

            <OracleInsight
              align="center"
              body="Your purchased artifacts are threads in a larger tapestry. Open them with intention."
            />

            <PortalSection
              title="The AI Clarity Lab"
              subtitle="Implementation environment and community."
              icon={<BookOpen className="w-3.5 h-3.5" />}
            >
              <div className="glow-card rounded-3xl p-8 text-center">
                <p className="text-[var(--espresso)]/75 max-w-md mx-auto">
                  The Lab opens soon — the membership community and implementation
                  environment where your artifacts become real systems.
                </p>
                <span className="mt-5 inline-block text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">
                  Coming soon
                </span>
              </div>
            </PortalSection>
          </div>
        )}
      </main>
    </div>
  );
}

function PortalSection({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-6">
        <div className="text-[var(--gold)] uppercase tracking-[0.3em] text-xs mb-2 flex items-center gap-2">
          {icon} {title}
        </div>
        <p className="text-sm text-[var(--espresso)]/65">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

function ArtifactGrid({ orders }: { orders: OrderWithProduct[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {orders.map((o) => (
        <ArtifactCard key={o.id} order={o} />
      ))}
    </div>
  );
}

function ArtifactCard({ order }: { order: OrderWithProduct }) {
  const product = order.product;
  const title = product?.title ?? order.productSlug ?? "Artifact";
  const description = product?.description ?? "Your purchased artifact.";
  const action = ctaForDelivery(product?.deliveryType ?? "download");
  const purchaseDate = new Date(order.createdAt).toLocaleDateString();

  return (
    <article className="vault-card group relative glow-card rounded-3xl overflow-hidden flex flex-col">
      <div className="relative h-32 bg-gradient-to-br from-[var(--wine)] to-[oklch(0.22_0.07_25)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 weave-pattern opacity-60" />
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_30%,oklch(0.78_0.13_80_/_0.6),transparent_55%)]" />
        <Lock className="absolute top-3 right-3 w-3.5 h-3.5 text-[var(--gold)]/60" />
        <Sparkles className="relative w-10 h-10 text-[var(--gold)] drop-shadow-[0_0_20px_oklch(0.78_0.13_80_/_0.6)]" />
        <span className="absolute bottom-2 left-3 text-[9px] tracking-[0.3em] uppercase text-[var(--gold)]/80">
          Yours · since {purchaseDate}
        </span>
      </div>
      <div className="relative p-5 flex-1 flex flex-col">
        <h3 className="font-display text-lg text-[var(--espresso)] leading-tight">{title}</h3>
        <p className="mt-2 text-xs text-[var(--espresso)]/70 flex-1">{description}</p>
        {product?.slug ? (
          <Link
            to="/vault/$slug"
            params={{ slug: product.slug }}
            className="vault-card-cta mt-4 text-xs uppercase tracking-[0.2em] text-[var(--espresso)] inline-flex items-center gap-1.5 group-hover:gap-2.5 group-hover:text-[var(--crimson)] transition-all"
          >
            {action} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <span className="mt-4 text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
            Access details emailed
          </span>
        )}
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="max-w-xl mx-auto text-center">
      <div className="glow-card rounded-3xl p-10">
        <Sparkles className="w-8 h-8 mx-auto text-[var(--gold)] mb-4" />
        <h2 className="font-display text-2xl text-[var(--espresso)]">
          Your Vault is waiting to be woven.
        </h2>
        <p className="mt-3 text-[var(--espresso)]/70">
          You haven't claimed any artifacts yet. Visit the Vault and choose your first thread.
        </p>
        <Link
          to="/"
          hash="vault"
          className="btn-primary mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium tracking-wide"
        >
          Open the Vault <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

function capitalize(s: string): string {
  return s.length ? s[0].toUpperCase() + s.slice(1).toLowerCase() : s;
}

function ctaForDelivery(t: "download" | "booking" | "community" | "workshop"): string {
  switch (t) {
    case "download":
      return "Download";
    case "booking":
      return "Book your session";
    case "community":
      return "Open community";
    case "workshop":
      return "Workshop details";
  }
}
