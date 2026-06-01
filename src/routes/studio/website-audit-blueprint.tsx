import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Nav } from "@/components/site/nav";
import { CelestialDivider } from "@/components/site/patterns";
import {
  ArrowRight,
  ChevronLeft,
  Sparkles,
  Eye,
  Workflow,
  TrendingUp,
  Search,
  Brain,
  Cpu,
  Trophy,
  FileText,
  Check,
  CalendarClock,
  Compass,
  ClipboardList,
  Layers,
} from "lucide-react";

export const Route = createFileRoute("/studio/website-audit-blueprint")({
  head: () => ({
    meta: [
      { title: "Website Audit Blueprint™ — The Studio | The AI Vision Weaver" },
      {
        name: "description",
        content:
          "A premium strategic audit of your digital presence. Brand clarity, conversion, SEO, and AI visibility, woven into a 30/90-day roadmap.",
      },
    ],
  }),
  component: WebsiteAuditBlueprintPage,
});

// CTA destinations — swap these as you wire booking / form / Stripe.
const REQUEST_AUDIT_URL = "mailto:mikinitaylor@me.com?subject=Website%20Audit%20Blueprint%20Request&body=I'd%20like%20to%20commission%20a%20Website%20Audit%20Blueprint.%20My%20website%20is%3A%20%0A%0A";
const DISCOVERY_CALL_URL = "mailto:mikinitaylor@me.com?subject=Discovery%20Call%20Request&body=I'd%20like%20to%20schedule%20a%20discovery%20call.%20My%20business%20is%3A%20%0A%0A";
const SAMPLE_BLUEPRINT_URL = "mailto:mikinitaylor@me.com?subject=Sample%20Blueprint%20Request";

function WebsiteAuditBlueprintPage() {
  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--foreground)]">
      <Nav />
      <main>
        <Hero />
        <DigitalTapestry />
        <BlueprintProcess />
        <WhatsIncluded />
        <AiVisibility />
        <BeforeAfter />
        <Investment />
        <FinalCTA />
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. HERO
// ─────────────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--cream)] section-vignette tapestry-bg pb-24 pt-20 md:pt-28">
      {/* blueprint grid overlay */}
      <BlueprintGrid />

      {/* gentle Nkyimu watermark to the right of the headline */}
      <img
        src="/images/logo/ai-vision-weaver-nkyimu-logo-transparent.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-[18%] z-0 hidden md:block w-[clamp(280px,28vw,520px)] object-contain opacity-[0.07]"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src =
            "/images/logo/ai-vision-weaver-nkyimu-logo-transparent.png";
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 relative z-10">
          <Link
            to="/"
            hash="studio"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[var(--espresso)]/70 hover:text-[var(--crimson)] transition mb-8"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> The Studio
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.78_0.13_80_/_0.5)] bg-[oklch(0.78_0.13_80_/_0.1)] px-4 py-1.5 uppercase tracking-[0.3em] text-[10px] mb-6">
            <Sparkles className="w-3 h-3" /> Flagship Engagement
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] text-[var(--espresso)]">
            Website Audit <span className="gold-text italic">Blueprint</span>
            <span className="text-[var(--gold)] text-3xl md:text-4xl align-top">™</span>
          </h1>

          <p className="mt-7 font-display italic text-2xl md:text-3xl text-[var(--crimson)] leading-snug">
            See what your website can't tell you.
          </p>

          <div className="mt-8 space-y-2.5 text-[var(--espresso)]/85 leading-relaxed max-w-xl">
            <p>Most websites don't have a traffic problem.</p>
            <p>They have a clarity problem.</p>
            <p>They have a trust problem.</p>
            <p>They have a conversion problem.</p>
          </div>

          <p className="mt-6 text-[var(--espresso)]/75 max-w-xl leading-relaxed">
            The Website Audit Blueprint™ reveals where your digital tapestry is unraveling —
            and provides a strategic roadmap to strengthen every thread.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={REQUEST_AUDIT_URL}
              className="btn-primary px-7 py-3.5 rounded-full font-medium tracking-wide inline-flex items-center gap-2"
            >
              Request Your Audit <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={SAMPLE_BLUEPRINT_URL}
              className="btn-ghost-gold px-7 py-3.5 rounded-full font-medium tracking-wide inline-flex items-center gap-2"
            >
              View Sample Blueprint
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <BlueprintVisual />
        </div>
      </div>
    </section>
  );
}

// Hero-side decorative blueprint: nested Nkyimu-inspired grid with woven thread arcs.
function BlueprintVisual() {
  return (
    <div className="relative aspect-square max-w-[480px] mx-auto">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_40%,oklch(0.78_0.13_80_/_0.25),transparent_65%)] blur-3xl ambient-glow" />
      <svg
        viewBox="0 0 400 400"
        className="relative w-full h-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="blueprint-thread" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e8c46a" stopOpacity="0" />
            <stop offset="50%" stopColor="#f3d77a" stopOpacity="1" />
            <stop offset="100%" stopColor="#e8c46a" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="blueprint-node">
            <stop offset="0%" stopColor="#f3d77a" stopOpacity="1" />
            <stop offset="100%" stopColor="#e8c46a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* outer ring */}
        <circle cx="200" cy="200" r="180" stroke="oklch(0.42 0.16 25 / 0.25)" strokeWidth="0.8" fill="none" strokeDasharray="2 6" />
        <circle cx="200" cy="200" r="140" stroke="oklch(0.78 0.13 80 / 0.4)" strokeWidth="1" fill="none" />
        <circle cx="200" cy="200" r="100" stroke="oklch(0.78 0.13 80 / 0.3)" strokeWidth="0.8" fill="none" />

        {/* woven thread arcs */}
        <path d="M 30 200 Q 200 60 370 200 T 30 200" stroke="url(#blueprint-thread)" strokeWidth="1.2" fill="none" />
        <path d="M 200 30 Q 60 200 200 370 T 200 30" stroke="url(#blueprint-thread)" strokeWidth="1.2" fill="none" />

        {/* Nkyimu-style center cross-grid (interlocked rectangles) */}
        <g stroke="oklch(0.42 0.16 25 / 0.7)" strokeWidth="2" fill="none">
          <rect x="160" y="170" width="80" height="14" />
          <rect x="160" y="216" width="80" height="14" />
          <rect x="186" y="150" width="14" height="80" />
          <rect x="216" y="150" width="14" height="80" />
        </g>

        {/* constellation nodes around */}
        {[
          [200, 30], [346, 100], [370, 240], [280, 360],
          [120, 360], [30, 240], [54, 100],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="14" fill="url(#blueprint-node)" />
            <circle cx={x} cy={y} r="4" fill="#f3d77a" />
          </g>
        ))}
      </svg>
    </div>
  );
}

function BlueprintGrid() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <pattern id="bp-grid" width="44" height="44" patternUnits="userSpaceOnUse">
          <path d="M 44 0 L 0 0 0 44" fill="none" stroke="oklch(0.42 0.16 25)" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bp-grid)" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. DIGITAL TAPESTRY ASSESSMENT — 7 nodes around a Nkyimu diagram
// ─────────────────────────────────────────────────────────────────────────────

const tapestryNodes = [
  { icon: <Eye />,       title: "Brand Clarity",          body: "Can visitors immediately understand who you help, what you offer, and why you're different?" },
  { icon: <Workflow />,  title: "User Experience",        body: "Can customers find what they need quickly and confidently?" },
  { icon: <TrendingUp />,title: "Conversion Readiness",   body: "What prevents visitors from becoming leads?" },
  { icon: <Search />,    title: "SEO Visibility",         body: "Can search engines understand and rank your content?" },
  { icon: <Brain />,     title: "AI Visibility",          body: "Can ChatGPT, Claude, Gemini, and Perplexity accurately understand and recommend your business?" },
  { icon: <Cpu />,       title: "Technical Health",       body: "What hidden technical issues are impacting performance?" },
  { icon: <Trophy />,    title: "Competitive Positioning",body: "How do you compare against businesses winning in your market?" },
];

function DigitalTapestry() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative py-24 md:py-32 bg-[var(--cream)]">
      <CelestialDivider label="The Assessment" />
      <div className="max-w-3xl mx-auto px-6 text-center mb-16">
        <h2 className="font-display text-3xl md:text-5xl text-[var(--espresso)] leading-tight">
          Every website tells a story.
        </h2>
        <p className="mt-4 font-display italic text-xl md:text-2xl text-[var(--crimson)]">
          The question is whether it's the story your customers need to hear.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Center diagram with hover-able nodes */}
        <div className="relative aspect-square max-w-[460px] mx-auto w-full">
          <BlueprintGrid />
          <svg viewBox="0 0 400 400" className="relative w-full h-full" aria-hidden>
            <defs>
              <radialGradient id="dta-glow">
                <stop offset="0%" stopColor="#f3d77a" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#e8c46a" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="dta-conn" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e8c46a" stopOpacity="0.05" />
                <stop offset="50%" stopColor="#e8c46a" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#e8c46a" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            <circle cx="200" cy="200" r="190" stroke="oklch(0.42 0.16 25 / 0.18)" strokeWidth="0.6" fill="none" strokeDasharray="2 6" />
            <circle cx="200" cy="200" r="150" stroke="oklch(0.78 0.13 80 / 0.3)" strokeWidth="0.8" fill="none" />

            {/* Nkyimu center mark */}
            <g stroke="oklch(0.42 0.16 25 / 0.8)" strokeWidth="2.5" fill="none">
              <rect x="160" y="172" width="80" height="12" />
              <rect x="160" y="216" width="80" height="12" />
              <rect x="184" y="148" width="12" height="80" />
              <rect x="216" y="148" width="12" height="80" />
            </g>

            {tapestryNodes.map((_, i) => {
              const angle = (i / tapestryNodes.length) * Math.PI * 2 - Math.PI / 2;
              const x = 200 + Math.cos(angle) * 165;
              const y = 200 + Math.sin(angle) * 165;
              const isActive = active === i;
              return (
                <g key={i}>
                  <line
                    x1="200" y1="200" x2={x} y2={y}
                    stroke="url(#dta-conn)"
                    strokeWidth={isActive ? "1.2" : "0.6"}
                    opacity={isActive ? 1 : 0.5}
                  />
                  <circle
                    cx={x} cy={y} r="18"
                    fill="url(#dta-glow)"
                    opacity={isActive ? 1 : 0.6}
                    className="transition-opacity duration-500"
                  />
                  <circle
                    cx={x} cy={y} r={isActive ? 7 : 5}
                    fill="#f3d77a"
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Node list (interactive on the side) */}
        <ul className="grid gap-2.5">
          {tapestryNodes.map((n, i) => (
            <li key={n.title}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onMouseLeave={() => setActive((a) => (a === i ? null : a))}
                onBlur={() => setActive((a) => (a === i ? null : a))}
                className={`w-full text-left glow-card rounded-2xl px-4 py-3 flex items-start gap-3 transition-all ${
                  active === i ? "translate-x-1" : ""
                }`}
                aria-expanded={active === i}
              >
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--wine)] text-[var(--gold)] [&_svg]:w-3.5 [&_svg]:h-3.5">
                  {n.icon}
                </span>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">
                      Node {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-lg text-[var(--espresso)]">{n.title}</h3>
                  </div>
                  {active === i && (
                    <p className="mt-1 text-sm text-[var(--espresso)]/75">{n.body}</p>
                  )}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. BLUEPRINT PROCESS — 5-step timeline
// ─────────────────────────────────────────────────────────────────────────────

const processSteps = [
  { icon: <Eye />,           title: "Discovery",          body: "Business goals, audience, competitors, and website review." },
  { icon: <Compass />,       title: "Analysis",           body: "Comprehensive review across all audit categories." },
  { icon: <ClipboardList />, title: "Blueprint Creation", body: "Findings, opportunities, and strategic recommendations." },
  { icon: <Layers />,        title: "Roadmap",            body: "30-day and 90-day action plans." },
  { icon: <Sparkles />,      title: "Transformation",     body: "Implementation opportunities and next steps." },
];

function BlueprintProcess() {
  return (
    <section className="relative py-24 md:py-28 bg-[var(--cream)] section-vignette overflow-hidden">
      <BlueprintGrid />
      <div className="relative max-w-3xl mx-auto px-6 text-center mb-16">
        <h2 className="font-display text-3xl md:text-5xl text-[var(--espresso)] leading-tight">
          From <span className="gold-text italic">Discovery</span> to <span className="text-[var(--crimson)]">Transformation</span>
        </h2>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* gold connector line behind steps (desktop) */}
        <div className="hidden md:block absolute top-[58px] left-[6%] right-[6%] h-px thread-line" />
        <ol className="grid md:grid-cols-5 gap-6 relative">
          {processSteps.map((s, i) => (
            <li key={s.title} className="relative">
              <div className="glow-card rounded-2xl p-5 text-center flex flex-col items-center gap-3 h-full">
                <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--wine)] text-[var(--gold)] [&_svg]:w-5 [&_svg]:h-5 ring-2 ring-[oklch(0.78_0.13_80_/_0.4)]">
                  {s.icon}
                </span>
                <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">
                  Stage {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-xl text-[var(--espresso)]">{s.title}</h3>
                <p className="text-sm text-[var(--espresso)]/70">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. WHAT'S INCLUDED — deliverables panel styled as a report preview
// ─────────────────────────────────────────────────────────────────────────────

const deliverables = [
  "Executive Summary",
  "Brand & Messaging Analysis",
  "User Experience Review",
  "Conversion Assessment",
  "SEO Assessment",
  "AI Visibility Assessment",
  "Competitive Analysis",
  "Technical Findings",
  "Quick Wins",
  "Strategic Recommendations",
  "30-Day Action Plan",
  "90-Day Roadmap",
  "Loom Walkthrough",
];

function WhatsIncluded() {
  return (
    <section className="relative py-24 md:py-32 bg-[var(--cream)]">
      <CelestialDivider label="The Deliverable" />
      <div className="max-w-3xl mx-auto px-6 text-center mb-14">
        <h2 className="font-display text-3xl md:text-5xl text-[var(--espresso)] leading-tight">
          Inside your <span className="gold-text italic">Blueprint</span>
        </h2>
      </div>

      <div className="relative max-w-5xl mx-auto px-6">
        {/* "report" mock */}
        <div className="relative glow-card rounded-[2rem] p-8 md:p-12 overflow-hidden">
          <div className="absolute inset-0 weave-pattern opacity-30 pointer-events-none" />
          {/* report header */}
          <div className="flex items-center justify-between border-b border-[oklch(0.78_0.13_80_/_0.3)] pb-5 mb-8 relative">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-[var(--gold)]" />
              <div className="leading-tight">
                <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--muted-foreground)]">
                  Confidential Engagement
                </div>
                <div className="font-display text-lg text-[var(--espresso)]">
                  Website Audit Blueprint™ — Report Contents
                </div>
              </div>
            </div>
            <div className="hidden sm:block text-[10px] tracking-[0.25em] uppercase text-[var(--gold)]/90">
              Prepared by The AI Vision Weaver
            </div>
          </div>

          {/* deliverables grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 relative">
            {deliverables.map((d, i) => (
              <div
                key={d}
                className="flex items-start gap-3 rounded-xl bg-[oklch(0.985_0.012_80_/_0.65)] border border-[oklch(0.78_0.13_80_/_0.25)] px-4 py-3"
              >
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--wine)] text-[var(--gold)]">
                  <Check className="w-3 h-3" />
                </span>
                <div className="leading-tight">
                  <div className="text-[9px] tracking-[0.3em] uppercase text-[var(--gold)]/80">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="text-sm font-medium text-[var(--espresso)]">{d}</div>
                </div>
              </div>
            ))}
          </div>

          {/* footer flourish */}
          <div className="mt-8 flex items-center gap-3 text-[var(--muted-foreground)]">
            <span className="flex-1 h-px thread-line" />
            <span className="text-[10px] tracking-[0.3em] uppercase">End of Index</span>
            <span className="flex-1 h-px thread-line" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. AI VISIBILITY — differentiator, dark panel that stands apart
// ─────────────────────────────────────────────────────────────────────────────

const aiPlatforms = ["ChatGPT", "Claude", "Gemini", "Perplexity"];
const aiAreas = [
  "Entity Recognition",
  "Brand Understanding",
  "Structured Content",
  "Authority Signals",
  "Generative Engine Optimization (GEO)",
  "AI Search Readiness",
];

function AiVisibility() {
  return (
    <section className="relative py-28 md:py-32 bg-[var(--wine)] text-[oklch(0.97_0.015_80)] overflow-hidden">
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,oklch(0.78_0.13_80_/_0.45),transparent_55%)]" />
      <div className="absolute inset-0 weave-pattern opacity-50 pointer-events-none" />
      <BlueprintGrid />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.78_0.13_80_/_0.4)] bg-[oklch(0.78_0.13_80_/_0.1)] px-4 py-1.5 uppercase tracking-[0.3em] text-[10px] mb-6">
            <Brain className="w-3 h-3" /> The Differentiator
          </div>
          <h2 className="font-display text-3xl md:text-5xl leading-tight">
            Can AI <span className="gold-text italic">recommend</span> your business?
          </h2>
          <p className="mt-5 text-[oklch(0.97_0.015_80_/_0.85)] leading-relaxed">
            Today's customers increasingly discover businesses through AI-powered search and
            recommendation systems. We evaluate how effectively AI systems understand, interpret,
            and surface your business.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-4">
              Platforms Assessed
            </div>
            <div className="grid grid-cols-2 gap-3">
              {aiPlatforms.map((p) => (
                <div
                  key={p}
                  className="dark-card rounded-xl px-4 py-5 flex flex-col items-center justify-center text-center"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[oklch(0.78_0.13_80_/_0.15)] text-[var(--gold)] mb-2">
                    <Brain className="w-4 h-4" />
                  </span>
                  <span className="font-display text-base">{p}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-4">
              Evaluation Areas
            </div>
            <ul className="grid sm:grid-cols-2 gap-3">
              {aiAreas.map((a) => (
                <li
                  key={a}
                  className="dark-card rounded-xl px-4 py-3 flex items-start gap-3"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[oklch(0.78_0.13_80_/_0.2)] text-[var(--gold)]">
                    <Check className="w-3 h-3" />
                  </span>
                  <span className="text-sm">{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. BEFORE & AFTER
// ─────────────────────────────────────────────────────────────────────────────

const beforeStates = [
  "Unclear messaging",
  "Low conversions",
  "Poor discoverability",
  "Weak positioning",
  "Missed opportunities",
];

const afterStates = [
  "Clear positioning",
  "Stronger trust signals",
  "Better user experience",
  "Improved visibility",
  "Strategic growth roadmap",
];

function BeforeAfter() {
  return (
    <section className="relative py-24 md:py-32 bg-[var(--cream)]">
      <CelestialDivider label="The Shift" />
      <div className="max-w-3xl mx-auto px-6 text-center mb-14">
        <h2 className="font-display text-3xl md:text-5xl text-[var(--espresso)] leading-tight">
          What changes <span className="gold-text italic">after</span> the Blueprint?
        </h2>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-6">
        <div className="glow-card rounded-3xl p-7 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,oklch(0.55_0.18_25),transparent_55%)]" />
          <div className="relative">
            <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--crimson)] mb-3">Before</div>
            <ul className="space-y-2.5">
              {beforeStates.map((s) => (
                <li key={s} className="flex items-start gap-3 text-[var(--espresso)]/75">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--crimson)]/60" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="glow-card rounded-3xl p-7 relative overflow-hidden border-[oklch(0.78_0.13_80_/_0.6)]">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_bottom_right,oklch(0.78_0.13_80_/_0.5),transparent_60%)]" />
          <div className="relative">
            <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-3">After</div>
            <ul className="space-y-2.5">
              {afterStates.map((s) => (
                <li key={s} className="flex items-start gap-3 text-[var(--espresso)]">
                  <span className="mt-1.5 inline-flex h-3 w-3 items-center justify-center rounded-full bg-[var(--gold)] text-[var(--wine)]">
                    <Check className="w-2 h-2" />
                  </span>
                  <span className="font-medium">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. INVESTMENT
// ─────────────────────────────────────────────────────────────────────────────

const investmentLines = [
  "Comprehensive Website Assessment",
  "AI Visibility Audit",
  "Competitor Review",
  "Strategic Blueprint Report",
  "Loom Walkthrough",
  "30-Day Roadmap",
  "90-Day Roadmap",
];

function Investment() {
  return (
    <section className="relative py-24 md:py-32 bg-[var(--cream)] section-vignette overflow-hidden">
      <BlueprintGrid />
      <div className="relative max-w-3xl mx-auto px-6">
        <div className="glow-card rounded-[2rem] p-8 md:p-14 text-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,oklch(0.78_0.13_80_/_0.4),transparent_60%)] blur-3xl ambient-glow" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,oklch(0.42_0.16_25_/_0.3),transparent_60%)] blur-3xl" />
          <div className="relative">
            <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-4">
              The Investment
            </div>
            <h2 className="font-display text-3xl md:text-5xl text-[var(--espresso)]">
              Website Audit Blueprint<span className="text-[var(--gold)]">™</span>
            </h2>
            <div className="mt-5 font-display text-2xl md:text-3xl text-[var(--crimson)]">
              Starting at <span className="gold-text">$997</span>
            </div>

            <ul className="mt-10 grid sm:grid-cols-2 gap-3 text-left max-w-xl mx-auto">
              {investmentLines.map((l) => (
                <li key={l} className="flex items-start gap-2.5 text-sm text-[var(--espresso)]/85">
                  <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-[var(--gold)] text-[var(--wine)]">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>

            <a
              href={REQUEST_AUDIT_URL}
              className="btn-primary mt-10 inline-flex items-center gap-2 rounded-full px-8 py-4 font-medium tracking-wide"
            >
              Apply for an Audit <ArrowRight className="w-4 h-4" />
            </a>
            <p className="mt-3 text-xs text-[var(--muted-foreground)] tracking-wide">
              A strategic engagement, not a transaction. We accept a limited number of audits per month.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FINAL CTA
// ─────────────────────────────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section className="relative py-28 md:py-32 bg-[var(--wine)] text-[oklch(0.97_0.015_80)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.78_0.13_80_/_0.3),transparent_60%)]" />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-5xl leading-tight">
          Every successful business is a <span className="gold-text italic">tapestry</span>.
        </h2>
        <div className="mt-8 space-y-2 text-[oklch(0.97_0.015_80_/_0.85)]">
          <p>The threads already exist.</p>
          <p>Your message. Your offers. Your expertise. Your systems.</p>
        </div>
        <p className="mt-6 text-[oklch(0.97_0.015_80_/_0.75)] leading-relaxed">
          The question is whether they are woven together in a way that creates trust,
          visibility, and growth. The Website Audit Blueprint™ helps you see the pattern —
          and build a stronger one.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <a
            href={REQUEST_AUDIT_URL}
            className="rounded-full bg-[var(--gold)] text-[var(--wine)] px-7 py-3.5 font-medium tracking-wide hover:scale-[1.03] transition shadow-[0_20px_50px_-15px_oklch(0.78_0.13_80_/_0.7)] inline-flex items-center gap-2"
          >
            Request Your Website Audit Blueprint™ <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href={DISCOVERY_CALL_URL}
            className="rounded-full border border-[oklch(0.78_0.13_80_/_0.6)] px-7 py-3.5 font-medium tracking-wide hover:bg-[oklch(0.78_0.13_80_/_0.15)] transition inline-flex items-center gap-2"
          >
            <CalendarClock className="w-4 h-4" /> Book a Discovery Call
          </a>
        </div>
      </div>
    </section>
  );
}
