## Goal

Swap the static `oracleStanding` PNG in the hero for the uploaded MP4, present it noticeably larger so it reads as a dimensional 3D centerpiece, and protect the legibility of the "The AI Vision Weaver" headline and surrounding copy.

## Changes

### 1. Add the video as a project asset
- Copy `user-uploads://media-1779942874128-3.mp4` → `src/assets/oracle-hero.mp4`.
- Import it in `src/components/site/landing.tsx` as a URL: `import oracleHero from "@/assets/oracle-hero.mp4"`.
- Remove the now-unused `oracleStanding` import (kept only if referenced elsewhere; quick check shows it is only used in Hero).

### 2. Replace the hero `<img>` with a `<video>` (Hero, lines ~127–159)
Replace the `<img src={oracleStanding} … />` block with:

```tsx
<video
  src={oracleHero}
  autoPlay
  loop
  muted
  playsInline
  preload="metadata"
  aria-label="The Crimson Oracle, AI Vision Weaver mascot"
  className="relative w-full max-w-3xl lg:max-w-[44rem] xl:max-w-[50rem]
             mx-auto lg:-mr-10 xl:-mr-20
             scale-110 md:scale-[1.18] lg:scale-[1.25]
             [transform:perspective(1400px)_rotateY(-6deg)_rotateX(2deg)]
             drop-shadow-[0_70px_110px_oklch(0.30_0.11_22_/_0.55)]
             rounded-[2rem]"
/>
```

- Larger max-width + scale + a subtle perspective tilt give the 3D "stepping out of the frame" feel.
- `autoPlay muted loop playsInline` ensures it plays silently on all browsers including iOS.
- Keep the existing halos, holographic rings, dashed ring and particles around it — they already sell the dimensionality.

### 3. Enlarge the stage so the video can breathe
- Bump the hero stage container (line 128) from `min-h-[600px] md:min-h-[720px]` to `min-h-[640px] md:min-h-[820px] lg:min-h-[880px]`.
- Widen ambient halo blur slightly (no structural change) so the bigger subject still sits in light.

### 4. Protect headline readability
Because the enlarged video will visually push toward the left column on `lg`, add a soft readability layer behind the copy without changing the palette:

- Wrap the left column's text block (the badge + h1 + paragraphs + CTAs + icon row) in a relative container with a pseudo-backdrop:
  ```tsx
  <div className="relative">
    <div className="absolute -inset-6 -z-10 rounded-3xl
                    bg-[oklch(0.985_0.012_80_/_0.55)]
                    backdrop-blur-[2px]
                    [mask-image:radial-gradient(ellipse_at_left,black_55%,transparent_90%)]" />
    {/* existing badge + h1 + … */}
  </div>
  ```
- Add `relative z-10` to the headline `<h1>` (already inside `z-10` column, but reinforce stacking above the video on small screens where they overlap).
- On `lg+` increase the gap between columns from `gap-16` to `gap-20` so the larger video doesn't crowd the headline.
- On mobile, the columns stack vertically (existing behavior), so the video sits below the text and never covers it — no further mobile work needed beyond keeping `lg:` scoped tilt/scale.

### 5. Reduced-motion + perf
- Wrap the `[transform:…]` tilt class behind `motion-safe:` (Tailwind) so users with `prefers-reduced-motion: reduce` get a flat, non-tilted video.
- Keep `preload="metadata"` to avoid blocking LCP; the poster frame is the video's first frame.

## Files touched
- `src/assets/oracle-hero.mp4` (new, copied from upload)
- `src/components/site/landing.tsx` (Hero section only)

## Out of scope
- No changes to palette, typography, other sections, copy, or layout outside the Hero.
- No new dependencies.
- `oracleStanding` PNG file is left in `src/assets/` untouched in case it's reused later; only its import is removed.
