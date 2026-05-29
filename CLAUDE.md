# CLAUDE.md — The AI Vision Weaver

Project context for Claude Code. Read this first on every session.

## What this is

The marketing site for The AI Vision Weaver — Mikini Williams' AI strategy, digital products, and creative-systems brand. Single-page landing site. Premium, editorial, "luxury occult/oracle" aesthetic built around a weaving / tapestry metaphor (threads → tapestry; sections named Tapestry, Vault, Studio, Oracle, About).

The north star for design work: cinematic and flowy. Slow, deliberate, continuous motion that responds to scroll — not a pile of independent looping effects. When in doubt, choreograph and restrain rather than add.

## Stack

- React 19 + TypeScript
- Vite 7 (`vite dev`, `vite build`, `vite preview`)
- Tailwind CSS v4 — config is CSS-first via `@theme inline` in `src/styles.css`. There is NO `tailwind.config.js`. Design tokens are CSS custom properties.
- TanStack Router + TanStack Start (file-based routes in `src/routes/`)
- shadcn/ui (Radix primitives in `src/components/ui/` — generally leave these alone)
- bun as the package manager (`bun install`, `bun add <pkg>`)
- lucide-react for icons

## Commands

```bash
bun install        # install deps
bun dev            # local dev server
bun run build      # production build
bun run preview    # preview the build
bun run lint       # eslint
bun run format     # prettier
```

## Where things live

- `src/components/site/landing.tsx` — the whole page. All sections (Hero, Tapestry, Vault, Studio, Oracle, About, FinalCTA, Footer) are functions in this one file (~620 lines).
- `src/components/site/nav.tsx` — sticky header
- `src/components/site/thread-divider.tsx` — the animated gold section divider
- `src/hooks/use-reveal.ts` — IntersectionObserver scroll-reveal hook
- `src/styles.css` — all design tokens + custom animations/keyframes (~356 lines)
- `src/routes/index.tsx` — renders `<Landing />`
- `src/assets/` — `oracle-hero.mp4`, oracle/portrait PNGs, svg logo/divider

## Design system (do not drift from these)

Colors are oklch custom properties defined in `:root` in `src/styles.css`:

- `--cream` (background, warm off-white) · `--crimson` (primary) · `--wine` (deep red, used for dark sections) · `--gold` (accent / threads) · `--espresso` (body text)
- A `.dark` theme block exists but the site ships in the light cream theme. This is intentional — the brand is warm-luxury, NOT a dark site. Do not "go dark" to make it cinematic; achieve cinematic through motion, depth, and contrast within the cream palette.

Type: Cormorant Garamond (display, headings, `.font-display`) + Inter (sans/body).

Reusable visual classes already in `styles.css` (prefer these over inventing new ones): `.reveal`/`.reveal.in`, `.glow-card`, `.dark-card`, `.thread-line`, `.gold-text`, `.float-card`, `.particle`, `.ambient-glow`, `.breathe`, `.node-pulse`, `.cursor-spotlight`, `.section-vignette`, `.weave-pattern`, `.constellation-dot`, `.dashed-ring`.

## Hard constraints

- **Respect `prefers-reduced-motion`.** `styles.css` already disables loops and softens `.reveal` under reduced motion — any new motion (parallax, smooth scroll, stagger) MUST also no-op or degrade gracefully under reduced motion.
- **Performance:** scroll/pointer handlers must be `requestAnimationFrame`-throttled and registered `{ passive: true }`. Use `transform`/`opacity` only (no layout-thrashing props). Add `will-change` sparingly.
- **Tailwind v4:** new tokens go in `@theme inline` / `:root` in `styles.css`, not a config file. Keep using the `oklch(...)` token pattern already in use.
- **Accessibility:** keep `aria-hidden` on decorative layers, keep focus states, don't trap scroll, keep the email field labeled.
- **Secrets:** never put secrets in client code or `VITE_`-prefixed env. Server-only values go through `src/lib/config.server.ts` patterns. (Repo is currently clean — keep it that way.)
- Keep the `shadcn/ui` components in `src/components/ui/` untouched unless there's a reason.

## Working style (Mikini)

Direct and action-oriented. Prefers comprehensive changes in one pass over many tiny diffs, and paste-ready output. Briefly explain the why behind a change, then make it. Keep code comments meaningful and human, not noise.

## Deploy

Repo syncs with Lovable (bi-directional). For production hosting, Vercel is the intended target — connect this GitHub repo to Vercel for auto-deploy on push to `main`.
