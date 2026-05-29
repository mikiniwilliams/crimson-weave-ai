// Reusable decorative SVGs for the tapestry visual language.
// All purely decorative — aria-hidden, no interactivity, transform/opacity only.

export function WeavePatternSvg({ className = "" }: { className?: string }) {
  // Subtle interlocking weave — tiles via SVG <pattern>.
  return (
    <svg className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="weave-tile" width="48" height="48" patternUnits="userSpaceOnUse">
          <path
            d="M0 12 Q12 0 24 12 T48 12 M0 36 Q12 24 24 36 T48 36"
            stroke="oklch(0.78 0.13 80 / 0.18)"
            strokeWidth="0.8"
            fill="none"
          />
          <path
            d="M12 0 Q24 12 12 24 T12 48 M36 0 Q24 12 36 24 T36 48"
            stroke="oklch(0.42 0.16 25 / 0.14)"
            strokeWidth="0.8"
            fill="none"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#weave-tile)" />
    </svg>
  );
}

export function ThreadPatternSvg({ className = "" }: { className?: string }) {
  // Long flowing threads — used as a section background accent.
  return (
    <svg
      className={className}
      aria-hidden
      viewBox="0 0 1200 400"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="thread-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e8c46a" stopOpacity="0" />
          <stop offset="50%" stopColor="#f3d77a" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#e8c46a" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[80, 140, 210, 280].map((y, i) => (
        <path
          key={y}
          d={`M -50 ${y} Q 300 ${y - 40 + i * 20} 600 ${y} T 1250 ${y - 10}`}
          stroke="url(#thread-grad)"
          strokeWidth={1.2 - i * 0.15}
          fill="none"
          opacity={0.55 - i * 0.08}
        />
      ))}
    </svg>
  );
}

export function CelestialDivider({ label }: { label?: string }) {
  // Animated, drawing thread + central star — used between sections.
  return (
    <div className="flex items-center justify-center gap-4 my-16 px-6 celestial-divider">
      <svg className="flex-1 max-w-xs h-2" viewBox="0 0 320 8" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="cd-l" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e8c46a" stopOpacity="0" />
            <stop offset="100%" stopColor="#e8c46a" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <line
          x1="0" y1="4" x2="320" y2="4"
          stroke="url(#cd-l)"
          strokeWidth="1"
          className="cd-draw"
        />
      </svg>
      <span className="flex items-center gap-3 text-[var(--gold)]">
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
          <path
            d="M7 0 L8.2 5.8 L14 7 L8.2 8.2 L7 14 L5.8 8.2 L0 7 L5.8 5.8 Z"
            fill="currentColor"
            opacity="0.9"
          />
        </svg>
        {label && (
          <span className="uppercase tracking-[0.3em] text-[10px] text-[var(--muted-foreground)]">
            {label}
          </span>
        )}
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
          <path
            d="M7 0 L8.2 5.8 L14 7 L8.2 8.2 L7 14 L5.8 8.2 L0 7 L5.8 5.8 Z"
            fill="currentColor"
            opacity="0.9"
          />
        </svg>
      </span>
      <svg className="flex-1 max-w-xs h-2" viewBox="0 0 320 8" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="cd-r" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e8c46a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#e8c46a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line
          x1="0" y1="4" x2="320" y2="4"
          stroke="url(#cd-r)"
          strokeWidth="1"
          className="cd-draw"
        />
      </svg>
    </div>
  );
}
