import { Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[oklch(0.965_0.018_80_/_0.75)] border-b border-[oklch(0.78_0.13_80_/_0.2)]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="relative inline-flex items-center justify-center w-9 h-9 rounded-full bg-[var(--wine)] text-[var(--gold)] shadow-[0_0_24px_oklch(0.78_0.13_80_/_0.35)]">
            <Eye className="w-4 h-4" strokeWidth={1.8} />
            <span className="absolute inset-0 rounded-full ring-1 ring-[oklch(0.78_0.13_80_/_0.5)]" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[10px] tracking-[0.22em] text-[var(--muted-foreground)]">THE</span>
            <span className="font-display text-lg tracking-tight text-[var(--espresso)]">
              AI Vision <span className="gold-text">Weaver</span>
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
        <a href="#oracle" className="btn-primary text-sm px-5 py-2.5 rounded-full font-medium tracking-wide">
          Join the Oracle
        </a>
      </div>
    </header>
  );
}
