import { useEffect, useState } from "react";

const SESSION_KEY = "aiVisionWeaverIntroSeen";

// Full-screen cinematic intro. Shows once per session.
// Sequence: logo settles → threads weave → countdown 3-2-1 → pause on "Enter the Studio".
// The site stays hidden until the visitor clicks "Enter the Studio" or "Skip".
export function Intro() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [showSkip, setShowSkip] = useState(false);
  const [count, setCount] = useState<3 | 2 | 1 | 0>(3);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    setMounted(true);
    document.documentElement.style.overflow = "hidden";

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Skip button appears after 1s in both modes.
    const skipT = window.setTimeout(() => setShowSkip(true), 1000);

    if (reduced) {
      // Reduced motion: show the veil briefly, then jump straight to "Enter the Studio".
      // Still requires a click — never auto-enters.
      const enterT = window.setTimeout(() => setCount(0), 400);
      return () => {
        window.clearTimeout(skipT);
        window.clearTimeout(enterT);
        document.documentElement.style.overflow = "";
      };
    }

    // Full countdown sequence. After 0, we pause on "Enter the Studio" and wait for a click.
    const c3 = window.setTimeout(() => setCount(2), 2200);
    const c2 = window.setTimeout(() => setCount(1), 3200);
    const c1 = window.setTimeout(() => setCount(0), 4200);

    return () => {
      [skipT, c3, c2, c1].forEach(window.clearTimeout);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  const dismiss = () => {
    sessionStorage.setItem(SESSION_KEY, "true");
    document.documentElement.style.overflow = "";
    setPhase("out");
    window.setTimeout(() => setMounted(false), 700);
  };

  return (
    <div
      className={`intro-veil ${phase === "out" ? "intro-out" : ""}`}
      aria-hidden={phase === "out"}
      role="dialog"
      aria-label="The Oracle is preparing your transmission"
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

      {/* copy + countdown/CTA */}
      <div className="intro-copy">
        <p className="intro-tagline">The Oracle is preparing your transmission…</p>
        <div className="intro-count" aria-live="polite">
          {count > 0 ? (
            <span key={count} className="intro-count-num">{count}</span>
          ) : (
            <button
              type="button"
              onClick={dismiss}
              className="intro-enter-btn"
              autoFocus
            >
              Enter the Studio
            </button>
          )}
        </div>
      </div>

      {showSkip && (
        <button type="button" onClick={dismiss} className="intro-skip">
          Skip
        </button>
      )}
    </div>
  );
}
