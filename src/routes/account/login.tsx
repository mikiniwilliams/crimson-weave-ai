import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Nav } from "@/components/site/nav";
import { CelestialDivider } from "@/components/site/patterns";
import { useAuth, signInWithPassword } from "@/lib/supabase/auth";
import { Mail, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/account/login")({
  head: () => ({
    meta: [
      { title: "Sign in — The AI Vision Weaver" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // If already signed in, head to the vault.
  useEffect(() => {
    if (auth.status === "signed-in") {
      navigate({ to: "/my-vault" });
    }
  }, [auth.status, navigate]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await signInWithPassword(email, password);
      navigate({ to: "/my-vault" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--foreground)] tapestry-bg">
      <Nav />
      <main className="max-w-md mx-auto px-6 pt-16 pb-24">
        <CelestialDivider label="My Vault" />
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl md:text-5xl text-[var(--espresso)]">
            Welcome <span className="gold-text italic">back</span>.
          </h1>
          <p className="mt-4 text-[var(--espresso)]/75">
            Sign in to access your purchased artifacts and resources.
          </p>
        </div>

        <form onSubmit={onSubmit} className="glow-card rounded-3xl p-8 space-y-5">
          <label className="block">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">
              Email
            </span>
            <div className="relative mt-2">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full bg-[oklch(0.985_0.012_80)] border border-[oklch(0.78_0.13_80_/_0.4)] py-3.5 pl-11 pr-5 text-sm focus:outline-none focus:border-[var(--crimson)] focus:ring-2 focus:ring-[oklch(0.42_0.16_25_/_0.2)]"
                placeholder="you@example.com"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">
              Password
            </span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-full bg-[oklch(0.985_0.012_80)] border border-[oklch(0.78_0.13_80_/_0.4)] py-3.5 px-5 text-sm focus:outline-none focus:border-[var(--crimson)] focus:ring-2 focus:ring-[oklch(0.42_0.16_25_/_0.2)]"
            />
          </label>

          {error && (
            <div className="text-sm text-[var(--crimson)] bg-[oklch(0.97_0.05_25_/_0.4)] border border-[oklch(0.55_0.18_25_/_0.4)] rounded-xl px-4 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="btn-primary w-full rounded-full px-7 py-3.5 text-sm font-medium tracking-wide inline-flex items-center justify-center gap-2"
          >
            {busy ? "Signing in…" : <>Enter My Vault <ArrowRight className="w-4 h-4" /></>}
          </button>

          <p className="text-xs text-center text-[var(--muted-foreground)]">
            Don't have an account yet? Purchase any artifact from{" "}
            <Link to="/" hash="vault" className="text-[var(--crimson)] underline">
              the Vault
            </Link>{" "}
            to get one.
          </p>
        </form>
      </main>
    </div>
  );
}
