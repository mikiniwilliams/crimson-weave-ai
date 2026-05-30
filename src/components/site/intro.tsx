import { useEffect, useState } from "react";

const SESSION_KEY = "aiVisionWeaverIntroSeen";

// Sequence beats: preparing → 3 ritual words → "Enter the Studio" button.
// Site stays hidden until the visitor clicks Enter the Studio (or Skip).
const RITUAL_WORDS = ["Precision.", "Excellence.", "Intelligence."] as const;

// Phase: -1 = tagline only (Screen 1), 0..2 = ritual words (Screen 2), 3 = button (Screen 3).
type Phase = -1 | 0 | 1 | 2 | 3;

export function Intro() {
  const [mounted, setMounted] = useState(false);
  const [veilOut, setVeilOut] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [phase, setPhase] = useState<Phase>(-1);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    setMounted(true);
    document.documentElement.style.overflow = "hidden";

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const skipT = window.setTimeout(() => setShowSkip(true), 1000);

    if (reduced) {
      // Reduced motion: brief intro, jump straight to the button. Still click-to-enter.
      const enterT = window.setTimeout(() => setPhase(3), 400);
      return () => {
        window.clearTimeout(skipT);
        window.clearTimeout(enterT);
        document.documentElement.style.overflow = "";
      };
    }

    // Slow, intentional cadence. Each ritual word lingers ~1.2s.
    const timers = [
      window.setTimeout(() => setPhase(0), 2200),  // Precision.
      window.setTimeout(() => setPhase(1), 3400),  // Excellence.
      window.setTimeout(() => setPhase(2), 4600),  // Intelligence.
      window.setTimeout(() => setPhase(3), 5800),  // → button
    ];

    return () => {
      window.clearTimeout(skipT);
      timers.forEach(window.clearTimeout);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  const dismiss = () => {
    sessionStorage.setItem(SESSION_KEY, "true");
    document.documentElement.style.overflow = "";
    setVeilOut(true);
    window.setTimeout(() => setMounted(false), 700);
  };

  return (
    <div
      className={`intro-veil ${veilOut ? "intro-out" : ""}`}
      aria-hidden={veilOut}
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

      {/* copy + ritual words / CTA */}
      <div className="intro-copy">
        <p className="intro-tagline">The Oracle is preparing your transmission…</p>
        <div className="intro-stage" aria-live="polite">
          {phase >= 0 && phase <= 2 && (
            <span key={phase} className="intro-ritual-word">
              {RITUAL_WORDS[phase]}
            </span>
          )}
          {phase === 3 && (
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
