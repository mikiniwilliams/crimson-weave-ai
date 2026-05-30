import { useEffect, useRef } from "react";

// A fixed-position vertical "thread" that runs the height of the viewport
// and visually connects every section. Reacts subtly to scroll: a slow
// vertical drift + a phase shift on the wave. Pure SVG + rAF — no layout cost.
//
// Accessibility: aria-hidden, pointer-events: none. Honors prefers-reduced-motion.
export function TapestryThread() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
        const p = Math.min(1, Math.max(0, window.scrollY / max));
        wrapRef.current?.style.setProperty("--thread-scroll", String(p));
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={wrapRef} className="tapestry-thread" aria-hidden>
      <svg
        viewBox="0 0 60 1000"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="tt-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e8c46a" stopOpacity="0" />
            <stop offset="12%" stopColor="#e8c46a" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#f3d77a" stopOpacity="0.85" />
            <stop offset="88%" stopColor="#e8c46a" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#e8c46a" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* gentle braided strand */}
        <path
          className="tapestry-thread-path"
          d="M 30 0 C 12 120, 48 240, 30 360 S 12 600, 30 720 S 48 880, 30 1000"
          stroke="url(#tt-grad)"
          strokeWidth="1.1"
          fill="none"
        />
        <path
          className="tapestry-thread-path tt-secondary"
          d="M 30 0 C 48 120, 12 240, 30 360 S 48 600, 30 720 S 12 880, 30 1000"
          stroke="url(#tt-grad)"
          strokeWidth="0.6"
          fill="none"
        />
      </svg>
    </div>
  );
}
