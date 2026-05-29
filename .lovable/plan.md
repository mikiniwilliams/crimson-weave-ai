
# Cinematic Refinement Pass — AI Vision Weaver

Polish-only pass. No layout, palette, typography, imagery, or section-order changes. All edits live in `src/styles.css`, `src/components/site/landing.tsx`, `src/components/site/nav.tsx`, `src/components/site/thread-divider.tsx`, and `src/hooks/use-reveal.ts`.

## 1. Motion system (styles.css)
- Slow all `float-card` to 9–11s with eased sine drift on both X and Y (not just Y); stagger delays so cards never sync.
- Replace abrupt `.reveal` with longer 1.2s ease with a slight blur(6→0) for cinematic entry; add `.reveal-slow` variant for hero/headings.
- Add `prefers-reduced-motion` guard disabling all ambient animations.
- Add a global cursor-reactive spotlight: a single fixed radial-gradient div positioned via CSS variables `--mx/--my`, very subtle (8% gold), updated by a lightweight pointer listener in landing.tsx.
- Add `.breathe` utility (slow opacity+scale 8s) for ambient halos to replace harder `ambient-glow` in a couple of places.

## 2. Thread system (styles.css + thread-divider.tsx)
- Slow `threadFlow` to 14s, add a second offset shimmer layer for woven double-thread feel.
- Add `.node-pulse` staggered timing (3 variants) and a faint outer ring pulse.
- Add a new `.thread-rail` vertical class so the page can carry one continuous faint gold rail down the left edge connecting Hero → Tapestry → Vault → Studio → Transmissions → Footer (rendered once in landing.tsx as a fixed/absolute decorative element behind content).

## 3. Hero (landing.tsx)
- Increase top/bottom padding (~`pt-36 md:pt-44 pb-44`) and column gap on lg.
- Enlarge oracle container (`min-h-[720px]`, `max-w-2xl` image) and pull floating cards slightly further out.
- Add a 3rd holographic ring + a subtle rotating dashed ring (very slow, 60s) behind the oracle for depth.
- Add 6–8 ambient particles inside the hero halo area.
- Add a soft vignette gradient at the section bottom for cinematic falloff.

## 4. Tapestry (landing.tsx)
- Add a subtle gold node at each card corner intersection so woven SVG paths visibly "tie" into cards.
- Lengthen card hover transition; add gentle inner-glow on hover.

## 5. Vault — premium artifacts (styles.css + landing.tsx)
- Refine `.weave-pattern` to a finer 22px grid and reduce opacity for embossed feel.
- Add an embossed gold "eye" watermark SVG behind each card title (very low opacity, brightens on hover).
- Stronger layered shadow stack on `.glow-card` hover (ambient + key + gold rim).
- Add a thin gold hairline along the top edge of each card image area for collectible framing.

## 6. Studio (landing.tsx)
- Double particle count, add slow large gold halo behind oracleLaptop that breathes.
- Add a faint horizontal gold rule above the section title and a small "II" chapter marker (luxury editorial cue).
- Replace the dark card hard border with a gradient border (gold→transparent) for integrated feel.

## 7. Oracle Transmissions (landing.tsx)
- Tighten typography hierarchy: small uppercase eyebrow → display headline → italic supporting line.
- Add microcopy under input: "Weekly intelligence for creators building the future."
- Stronger CTA: gradient crimson→wine with gold inner hairline and soft outer gold glow.
- Add 5–6 drifting "transmission" particles in this section only.
- Ensure seated oracle image presence is preserved (already used here per current code).

## 8. About (landing.tsx)
- Update bio copy to include the three positioning lines verbatim:
  - "20+ years in technology. Still obsessed with building."
  - "Cybersecurity strategist. AI consultant. Systems thinker."
  - "Helping entrepreneurs use AI without losing their voice, values, or vision."
- Keep portrait, layout, and surrounding structure unchanged.

## 9. Footer (landing.tsx)
- Add a constellation divider (row of pulsing gold dots connected by `.thread-line`) above footer content.
- Add large faint embossed eye watermark centered behind footer.
- Add quote line in italic display font: "Every powerful vision begins as a thread."
- Add a slow fading ambient glow at the very bottom edge.

## 10. Mobile
- Verify hero stacks with oracle still ≥ 420px tall and floating cards repositioned (use `md:` to keep extreme offsets desktop-only).
- Increase mobile vertical section padding so spacing stays luxurious.
- Ensure thread-rail is hidden < lg.

## Technical notes
- Cursor spotlight: one `useEffect` in landing.tsx attaching a throttled (rAF) `pointermove` updating `document.documentElement.style.setProperty('--mx', ...)`. Renders a single fixed `pointer-events-none` div with `background: radial-gradient(600px circle at var(--mx) var(--my), oklch(0.78 0.13 80 / 0.06), transparent 60%)`.
- All new animations gated behind `@media (prefers-reduced-motion: no-preference)`.
- No new dependencies. No route, schema, or backend changes.

## Out of scope
Layout restructuring, image swaps, color/typography changes, new sections, copy rewrites beyond the About lines and Transmissions microcopy listed above.
