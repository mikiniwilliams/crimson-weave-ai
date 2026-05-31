import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, User } from "lucide-react";
import { useAuth, signOut } from "@/lib/supabase/auth";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[oklch(0.965_0.018_80_/_0.75)] border-b border-[oklch(0.78_0.13_80_/_0.2)]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--wine)] shadow-[0_0_24px_oklch(0.78_0.13_80_/_0.35)] overflow-hidden">
            <img
              src="/images/logo/ai-vision-weaver-nkyimu-logo-transparent.svg"
              alt=""
              aria-hidden
              className="w-7 h-7 object-contain nkyimu-logo-glow"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "/images/logo/ai-vision-weaver-nkyimu-logo-transparent.png";
              }}
            />
            <span className="absolute inset-0 rounded-full ring-1 ring-[oklch(0.78_0.13_80_/_0.5)]" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[10px] tracking-[0.22em] text-[var(--muted-foreground)]">THE</span>
            <span className="font-display text-lg tracking-tight text-[var(--espresso)]">
              AI Vision <span className="gold-text">Weaver</span>
            </span>
            <span className="hidden sm:block text-[8px] font-mono tracking-[0.22em] uppercase text-[var(--gold)] mt-1">
              Precision · Excellence · Intelligence
            </span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-[var(--espresso)]">
          <a href="#tapestry" className="hover:text-[var(--crimson)] transition">Tapestry</a>
          <a href="#vault" className="hover:text-[var(--crimson)] transition">Vault</a>
          <a href="#studio" className="hover:text-[var(--crimson)] transition">Studio</a>
          <a href="#oracle" className="hover:text-[var(--crimson)] transition">Oracle</a>
          <a href="#about" className="hover:text-[var(--crimson)] transition">About</a>
        </nav>
        <AccountMenu />
      </div>
    </header>
  );
}

// Auth-aware right-hand action:
// - signed out: "Join the Oracle" CTA (unchanged from original)
// - signed in:  initial-avatar + dropdown → My Vault / Sign out
function AccountMenu() {
  const auth = useAuth();

  if (auth.status !== "signed-in") {
    return (
      <a
        href="#oracle"
        className="btn-primary text-sm px-5 py-2.5 rounded-full font-medium tracking-wide"
      >
        Join the Oracle
      </a>
    );
  }

  const email = auth.user.email ?? "";
  const initial = (email[0] ?? "?").toUpperCase();
  return <AuthedDropdown initial={initial} email={email} />;
}

function AuthedDropdown({ initial, email }: { initial: string; email: string }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full bg-[var(--wine)] text-[var(--gold)] pl-1 pr-3 py-1 border border-[oklch(0.78_0.13_80_/_0.4)] shadow-[0_0_18px_oklch(0.78_0.13_80_/_0.3)] hover:scale-[1.02] transition"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="inline-flex w-8 h-8 rounded-full items-center justify-center bg-[oklch(0.78_0.13_80_/_0.18)] font-display text-sm">
          {initial}
        </span>
        <ChevronDown className="w-3.5 h-3.5" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 rounded-2xl border border-[oklch(0.78_0.13_80_/_0.35)] bg-[oklch(0.985_0.012_80_/_0.95)] backdrop-blur shadow-[0_30px_60px_-20px_oklch(0.30_0.11_22_/_0.35)] overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-[oklch(0.78_0.13_80_/_0.2)]">
            <div className="text-[10px] tracking-[0.25em] uppercase text-[var(--muted-foreground)]">
              Signed in
            </div>
            <div className="text-xs text-[var(--espresso)] truncate">{email}</div>
          </div>
          <Link
            to="/my-vault"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--espresso)] hover:bg-[oklch(0.78_0.13_80_/_0.1)] transition"
            role="menuitem"
          >
            <User className="w-4 h-4 text-[var(--gold)]" /> My Vault
          </Link>
          <button
            type="button"
            onClick={async () => {
              setOpen(false);
              await signOut();
            }}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--espresso)] hover:bg-[oklch(0.78_0.13_80_/_0.1)] transition"
            role="menuitem"
          >
            <LogOut className="w-4 h-4 text-[var(--crimson)]" /> Sign out
          </button>
        </div>
      )}
    </div>
  );
}
