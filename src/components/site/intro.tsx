import { useEffect, useState } from "react";

const SESSION_KEY = "avw-intro-seen";

// Full-screen cinematic intro. Shows once per session.
// Sequence (~5s total): logo settles → threads weave → countdown 3-2-1 → "Enter" → fade out.
export function Intro() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [showSkip, setShowSkip] = useState(false);
  const [count, setCount] = useState<3 | 2 | 1 | 0>(3);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      // Honor reduced motion: do not show the intro at all.
      sessionStorage.setItem(SESSION_KEY, "1");
      return;
    }

    setMounted(true);
    document.documentElement.style.overflow = "hidden";

    const skipT = window.setTimeout(() => setShowSkip(true), 1000);
    const c3 = window.setTimeout(() => setCount(2), 2200);
    const c2 = window.setTimeout(() => setCount(1), 3200);
    const c1 = window.setTimeout(() => setCount(0), 4200);
    const outT = window.setTimeout(() => setPhase("out"), 5000);
    const doneT = window.setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      document.documentElement.style.overflow = "";
      setMounted(false);
    }, 5800);

    return () => {
      [skipT, c3, c2, c1, outT, doneT].forEach(window.clearTimeout);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  const skip = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    document.documentElement.style.overflow = "";
    setPhase("out");
    window.setTimeout(() => setMounted(false), 600);
  };

  return (
    <div
      className={`intro-veil ${phase === "out" ? "intro-out" : ""}`}
      aria-hidden={phase === "out"}
      role="dialog"
      aria-label="The Oracle is weaving your transmission"
    >
      {/* particle field */}
      <div className="intro-particles" aria-hidden>
        {Array.from({ length: 26 }).map((_, i) => (
          <span
            key={i}
            className="intro-particle"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 71) % 100}%`,
              animationDelay: `${(i * 0.3) % 6}s`,
              animationDuration: `${6 + (i % 5)}s`,
            }}
          />
        ))}
      </div>

      {/* woven thread paths around the logo */}
      <svg className="intro-threads" viewBox="0 0 800 800" aria-hidden>
        <defs>
          <linearGradient id="intro-thread" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e8c46a" stopOpacity="0" />
            <stop offset="50%" stopColor="#f3d77a" stopOpacity="1" />
            <stop offset="100%" stopColor="#e8c46a" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* concentric arcs that "draw" around the logo */}
        <circle cx="400" cy="400" r="220" stroke="url(#intro-thread)" strokeWidth="1" fill="none" className="intro-thread-arc" />
        <circle cx="400" cy="400" r="270" stroke="url(#intro-thread)" strokeWidth="0.8" fill="none" className="intro-thread-arc d2" />
        <circle cx="400" cy="400" r="320" stroke="url(#intro-thread)" strokeWidth="0.6" fill="none" className="intro-thread-arc d3" />
        <path
          d="M 80 400 Q 400 200 720 400 T 80 400"
          stroke="url(#intro-thread)"
          strokeWidth="0.7"
          fill="none"
          className="intro-thread-arc d4"
        />
      </svg>

      {/* logo */}
      <div className="intro-logo-wrap">
        <img
          src="/images/logo/ai-vision-weaver-nkyimu-logo-transparent.svg"
          alt="The AI Vision Weaver"
          className="intro-logo"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "/images/logo/ai-vision-weaver-nkyimu-logo-transparent.png";
          }}
        />
        <div className="intro-logo-halo" aria-hidden />
      </div>

      {/* copy */}
      <div className="intro-copy">
        <p className="intro-tagline">The Oracle is weaving your transmission…</p>
        <div className="intro-count" aria-live="polite">
          {count > 0 ? (
            <span key={count} className="intro-count-num">{count}</span>
          ) : (
            <span className="intro-enter">Enter the Studio</span>
          )}
        </div>
      </div>

      {showSkip && (
        <button type="button" onClick={skip} className="intro-skip">
          Skip
        </button>
      )}
    </div>
  );
}
