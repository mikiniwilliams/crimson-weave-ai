import { useEffect, useRef, useState } from "react";
import { useStaggerReveal } from "@/hooks/use-reveal";
import { Nav } from "@/components/site/nav";
import { CelestialDivider, ThreadPatternSvg } from "@/components/site/patterns";
import { Intro } from "@/components/site/intro";
import { loadActiveProducts, type Product } from "@/lib/products";
import {
  Sparkles, Wand2, Workflow, Palette, BookOpen, Layers, FileCode2,
  Compass, Rocket, MessagesSquare, GraduationCap, Eye, Lock,
  ArrowRight, Mail, Brain, Network, Wrench, Megaphone, TrendingUp,
} from "lucide-react";

// Public asset paths (served from /public/images)
const oracleStanding = "/images/oracle/oracle-standing-new.png";
const oracleStandingFallback = "/images/oracle/crimson_oracle-standing.png";
const oracleLaptop = "/images/oracle/oracle-laptop-new.png";
const oracleLaptopFallback = "/images/oracle/oracle-laptop.png";
const oracleCloseup = "/images/oracle/oracle-closeup-new.png";
const oracleCloseupFallback = "/images/oracle/Oracle-closeup.png";
const mikiniPortrait = "/images/founder/mikini-real.jpeg";
const mikiniPortraitFallback = "/images/founder/mikini-portrait.png";

function imgFallback(fb: string) {
  return (e: React.SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget;
    if (el.src.endsWith(fb)) return;
    el.src = fb;
  };
}

function CursorSpotlight() {
  useEffect(() => {
    let raf = 0;
    let nx = 50, ny = 30;
    const onMove = (e: PointerEvent) => {
      nx = (e.clientX / window.innerWidth) * 100;
      ny = (e.clientY / window.innerHeight) * 100;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          document.documentElement.style.setProperty("--mx", `${nx}%`);
          document.documentElement.style.setProperty("--my", `${ny}%`);
          raf = 0;
        });
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return <div className="cursor-spotlight" aria-hidden />;
}

function FloatingCard({
  title, icon, className = "", delay = "",
}: { title: string; icon: React.ReactNode; className?: string; delay?: string }) {
  return (
    <div className={`absolute glow-card rounded-2xl px-4 py-3 flex items-center gap-2.5 float-card ${delay} ${className}`}>
      <span className="w-7 h-7 rounded-lg bg-[var(--wine)] text-[var(--gold)] flex items-center justify-center">
        {icon}
      </span>
      <span className="text-xs font-medium tracking-wide text-[var(--espresso)] whitespace-nowrap">{title}</span>
    </div>
  );
}

// Plain layout wrapper — animation is owned by each section's own stagger refs.
function Section({
  id, children, className = "",
}: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`max-w-7xl mx-auto px-6 ${className}`}>
      {children}
    </section>
  );
}

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const leftColRef = useStaggerReveal<HTMLDivElement>(140);

  // Scroll-linked parallax: constellation drifts slowest, video column drifts fastest.
  // No-ops when prefers-reduced-motion is set.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      if (!raf) {
        raf = requestAnimationFrame(() => {
          heroRef.current?.style.setProperty("--hero-y", `${window.scrollY}px`);
          raf = 0;
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={heroRef} className="relative overflow-hidden tapestry-bg section-vignette">
      {/* Nkyimu watermark — beside the Oracle on desktop, a celestial sigil that slowly rotates
          and pulses. Wrapper holds positioning (so translateX from -1/2 doesn't fight the inner
          rotation); inner img owns the animation. */}
      <div
        aria-hidden
        className="nkyimu-watermark-wrap pointer-events-none absolute left-1/2 top-[8%] z-0 w-[78vw] max-w-[380px] -translate-x-1/2 md:left-auto md:right-[8%] md:top-[15%] md:w-[clamp(320px,30vw,560px)] md:max-w-none md:translate-x-0"
      >
        <img
          src="/images/logo/ai-vision-weaver-nkyimu-logo-transparent.svg"
          alt=""
          aria-hidden
          className="nkyimu-watermark w-full h-auto object-contain"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "/images/logo/ai-vision-weaver-nkyimu-logo-transparent.png";
          }}
        />
      </div>
      {/* constellation — slowest parallax layer */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
        style={{ transform: "translateY(calc(var(--hero-y, 0px) * -0.05))", willChange: "transform" }}
        aria-hidden
      >
        <defs>
          <radialGradient id="dot">
            <stop offset="0%" stopColor="#e8c46a" stopOpacity="1" />
            <stop offset="100%" stopColor="#e8c46a" stopOpacity="0" />
          </radialGradient>
        </defs>
        {Array.from({ length: 40 }).map((_, i) => {
          const cx = (i * 137) % 1400;
          const cy = (i * 89) % 800;
          return <circle key={i} cx={cx} cy={cy} r="2" fill="url(#dot)" />;
        })}
      </svg>

      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-6 pt-28 pb-24 md:pt-36 md:pb-28 lg:grid-cols-12 lg:gap-20">
        {/* Left column — stagger reveal. Widened ~15% so headline has more breathing room. */}
        <div className="lg:col-span-7 relative z-10">
          <div ref={leftColRef} className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-3xl bg-[oklch(0.985_0.012_80_/_0.55)] backdrop-blur-[2px]"
              style={{ maskImage: "radial-gradient(ellipse at left, black 55%, transparent 90%)", WebkitMaskImage: "radial-gradient(ellipse at left, black 55%, transparent 90%)" }}
            />
            <div data-stagger className="stagger-child inline-flex items-center gap-2 rounded-full border border-[oklch(0.78_0.13_80_/_0.5)] bg-[oklch(0.78_0.13_80_/_0.1)] px-4 py-1.5 uppercase tracking-[0.25em] mb-7 text-xs">
              <Sparkles className="w-3.5 h-3.5" /> Strategy · Systems · AI · Magic
            </div>
            <h1 data-stagger className="stagger-child relative z-10 font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] text-[var(--espresso)]">
              The <span className="gold-text italic">AI</span>
              <br />
              Vision <span className="text-[var(--crimson)]">Weaver</span>
            </h1>
            <p data-stagger className="stagger-child mt-7 text-lg text-[var(--espresso)]/80 max-w-xl leading-relaxed">
              Weaving strategy, systems, AI, and design into digital products that feel like
              the future.
            </p>
            <p
              data-stagger
              className="stagger-child mt-3 inline-block max-w-xl rounded-[14px] border border-[oklch(0.78_0.13_80_/_0.25)] bg-[rgba(255,247,235,0.92)] px-4 py-3 text-sm font-semibold leading-relaxed text-[oklch(0.20_0.05_35)] shadow-[0_2px_16px_rgba(72,32,24,0.12)] backdrop-blur-[8px]"
            >
              For entrepreneurs, consultants, and creators ready to turn ideas into intelligent
              brands, content systems, and digital income.
            </p>
            <div data-stagger className="stagger-child mt-9 flex flex-wrap gap-3">
              <a href="#studio" className="btn-primary px-7 py-3.5 rounded-full font-medium tracking-wide inline-flex items-center gap-2">
                Enter the Studio <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#vault" className="btn-ghost-gold px-7 py-3.5 rounded-full font-medium tracking-wide inline-flex items-center gap-2">
                Explore the Vault
              </a>
            </div>
            <div data-stagger className="stagger-child mt-12 grid grid-cols-3 sm:grid-cols-6 gap-4 max-w-lg">
              {[
                { icon: <Brain className="w-4 h-4" />, label: "Prompts" },
                { icon: <Palette className="w-4 h-4" />, label: "Branding" },
                { icon: <Network className="w-4 h-4" />, label: "Systems" },
                { icon: <FileCode2 className="w-4 h-4" />, label: "Content" },
                { icon: <Workflow className="w-4 h-4" />, label: "Automate" },
                { icon: <Layers className="w-4 h-4" />, label: "Products" },
              ].map((p) => (
                <div key={p.label} className="flex flex-col items-center gap-1.5 text-[var(--espresso)]/70">
                  <span className="w-9 h-9 rounded-full border border-[oklch(0.78_0.13_80_/_0.5)] flex items-center justify-center text-[var(--crimson)]">
                    {p.icon}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider">{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column — fastest parallax layer. Oracle is woven INTO the environment (no card frame).
            Narrower col-span-5 + lg:w-clamp on the video means the figure keeps its size
            and is free to overflow the column to the right. */}
        <div
          className="relative z-[2] lg:col-span-5"
          style={{ transform: "translateY(calc(var(--hero-y, 0px) * -0.13))", willChange: "transform" }}
        >
          <div className="relative flex min-h-[700px] items-center justify-center md:min-h-[900px] lg:min-h-[1100px]">
            {/* layered ambient halos */}
            {/* hero glow overlays reduced ~20% so headline reads as the focal point */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.78_0.13_80_/_0.36),transparent_60%)] blur-3xl breathe" />
            <div className="absolute inset-10 rounded-full bg-[radial-gradient(circle_at_50%_40%,oklch(0.42_0.16_25_/_0.22),transparent_65%)] blur-2xl" />
            {/* concentric thread rings */}
            <div className="absolute inset-4 rounded-full border border-[oklch(0.78_0.13_80_/_0.18)]" />
            <div className="absolute inset-14 rounded-full border border-[oklch(0.78_0.13_80_/_0.12)]" />
            <div className="absolute inset-24 rounded-full border border-[oklch(0.78_0.13_80_/_0.08)]" />
            <div className="dashed-ring inset-2 slow-spin" />

            {/* golden thread pathways behind the oracle */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              <defs>
                <linearGradient id="hero-thread" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e8c46a" stopOpacity="0" />
                  <stop offset="50%" stopColor="#f3d77a" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#e8c46a" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M 0 30 Q 50 10 100 35" stroke="url(#hero-thread)" strokeWidth="0.25" fill="none" />
              <path d="M 0 70 Q 50 95 100 65" stroke="url(#hero-thread)" strokeWidth="0.25" fill="none" />
              <path d="M 15 0 Q 50 50 18 100" stroke="url(#hero-thread)" strokeWidth="0.2" fill="none" />
              <path d="M 85 0 Q 50 50 82 100" stroke="url(#hero-thread)" strokeWidth="0.2" fill="none" />
            </svg>

            {/* constellation nodes */}
            <div className="absolute inset-0 pointer-events-none">
              {[[18, 22], [78, 18], [12, 62], [88, 70], [50, 92], [30, 8], [70, 88]].map(([x, y], i) => (
                <span
                  key={i}
                  className="absolute constellation-dot node-pulse"
                  style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.4}s` }}
                />
              ))}
            </div>

            {/* drifting particles */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 12 }).map((_, i) => (
                <span
                  key={i}
                  className="particle"
                  style={{
                    left: `${10 + ((i * 41) % 80)}%`,
                    top: `${55 + ((i * 23) % 35)}%`,
                    animationDelay: `${(i * 0.9) % 7}s`,
                    animationDuration: `${7 + (i % 4)}s`,
                  }}
                />
              ))}
            </div>

            {/* Oracle — embedded video, no frame. Background blends via radial mask. */}
            <video
              src="/videos/oracle-movement.mp4"
              poster={oracleStanding}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="The Crimson Oracle, AI Vision Weaver guide"
              className="oracle-figure relative mx-auto w-full max-w-[clamp(520px,48vw,760px)] lg:w-[clamp(520px,48vw,760px)] lg:max-w-none drop-shadow-[0_70px_110px_oklch(0.30_0.11_22_/_0.44)] oracle-woven"
            />

            {/* Floating interface panels */}
            <FloatingCard
              title="AI Strategy"
              icon={<Brain className="w-3.5 h-3.5" />}
              className="top-8 -left-2 md:-left-10"
            />
            <FloatingCard
              title="Automation"
              icon={<Workflow className="w-3.5 h-3.5" />}
              className="top-1/4 -right-2 md:-right-6"
              delay="delay-1"
            />
            <FloatingCard
              title="Brand Strategy"
              icon={<Palette className="w-3.5 h-3.5" />}
              className="top-1/2 -left-2 md:-left-14"
              delay="delay-2"
            />
            <FloatingCard
              title="Marketing Growth"
              icon={<TrendingUp className="w-3.5 h-3.5" />}
              className="top-[58%] -right-2 md:-right-10"
              delay="delay-3"
            />
            <FloatingCard
              title="Content Systems"
              icon={<FileCode2 className="w-3.5 h-3.5" />}
              className="bottom-32 -left-4 md:-left-12"
              delay="delay-1"
            />
            <FloatingCard
              title="The Vault"
              icon={<Layers className="w-3.5 h-3.5" />}
              className="bottom-20 right-0 md:right-2"
              delay="delay-2"
            />
            <FloatingCard
              title="The Oracle Says"
              icon={<MessagesSquare className="w-3.5 h-3.5" />}
              className="bottom-6 left-1/3 md:left-[38%]"
              delay="delay-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const tapestrySteps = [
  { icon: <Eye className="w-5 h-5" />, title: "Vision", body: "Clarify the idea, the audience, and the offer." },
  { icon: <Compass className="w-5 h-5" />, title: "Strategy", body: "Shape the offer into a profitable positioning." },
  { icon: <Workflow className="w-5 h-5" />, title: "Systems", body: "Build the workflows, automations, and AI stack." },
  { icon: <Palette className="w-5 h-5" />, title: "Design", body: "Package the experience into something premium." },
];

function Tapestry() {
  const introRef = useStaggerReveal<HTMLDivElement>(130);
  const gridRef = useStaggerReveal<HTMLDivElement>(100);

  return (
    <Section id="tapestry" className="py-24">
      <CelestialDivider label="The Tapestry" />
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <div ref={introRef}>
            <h2 data-stagger className="stagger-child font-display text-4xl md:text-5xl text-[var(--espresso)] leading-tight">
              Every powerful brand begins as a <em className="gold-text not-italic">thread</em>.
            </h2>
            <p data-stagger className="stagger-child mt-6 text-[var(--espresso)]/75 leading-relaxed">
              The AI Vision Weaver turns scattered ideas into a connected digital tapestry:
              strategy, storytelling, automation, content, products, and design working
              together instead of fighting for attention.
            </p>
          </div>
        </div>
        <div className="lg:col-span-7">
          <div ref={gridRef} className="relative grid sm:grid-cols-2 gap-5">
            {/* connecting threads */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 25 25 Q 50 50 75 25" stroke="url(#tg)" strokeWidth="0.4" fill="none" />
              <path d="M 25 75 Q 50 50 75 75" stroke="url(#tg)" strokeWidth="0.4" fill="none" />
              <path d="M 25 25 Q 25 50 25 75" stroke="url(#tg)" strokeWidth="0.4" fill="none" />
              <path d="M 75 25 Q 75 50 75 75" stroke="url(#tg)" strokeWidth="0.4" fill="none" />
              <defs>
                <linearGradient id="tg">
                  <stop offset="0%" stopColor="#e8c46a" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#e8c46a" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#e8c46a" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
            {tapestrySteps.map((s, i) => (
              <div
                key={s.title}
                data-stagger
                className="stagger-child relative glow-card rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="w-11 h-11 rounded-xl bg-[var(--wine)] text-[var(--gold)] flex items-center justify-center">
                    {s.icon}
                  </span>
                  <span className="font-display text-3xl text-[var(--gold)]/70">0{i + 1}</span>
                </div>
                <h3 className="font-display text-2xl text-[var(--espresso)]">{s.title}</h3>
                <p className="mt-2 text-sm text-[var(--espresso)]/70">{s.body}</p>
                <div className="absolute -top-1 -right-1 constellation-dot" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// Map a product category to the existing Vault icon vocabulary so the visual
// treatment stays identical when products load from Supabase.
function iconForCategory(category: string): React.ReactNode {
  const c = category.toLowerCase();
  if (c.includes("prompt")) return <Brain />;
  if (c.includes("brand")) return <Palette />;
  if (c.includes("content")) return <FileCode2 />;
  if (c.includes("strategy") || c.includes("audit")) return <Eye />;
  if (c.includes("system") || c.includes("product")) return <Rocket />;
  if (c.includes("design") || c.includes("template")) return <Layers />;
  return <Layers />;
}

function Vault() {
  const introRef = useStaggerReveal<HTMLDivElement>(130);
  const [products, setProducts] = useState<Product[]>([]);
  // Re-observe stagger children when products arrive so async-loaded cards reveal.
  const gridRef = useStaggerReveal<HTMLDivElement>(80, 0, products.length);

  useEffect(() => {
    let cancelled = false;
    console.log("Supabase enabled:", Boolean(import.meta.env.VITE_SUPABASE_URL));
    loadActiveProducts()
      .then((rows) => {
        if (cancelled) return;
        console.log("Vault products loaded:", rows);
        setProducts(rows);
      })
      .catch(() => {
        /* loader already falls back to local; ignore */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Section id="vault" className="py-24">
      <CelestialDivider label="The Vault" />
      <div ref={introRef} className="text-center max-w-2xl mx-auto mb-14">
        <h2 data-stagger className="stagger-child font-display text-4xl md:text-5xl text-[var(--espresso)]">
          Open the <span className="gold-text italic">Vault</span>
        </h2>
        <p data-stagger className="stagger-child mt-5 text-[var(--espresso)]/75">
          Digital products, templates, prompts, and creative systems designed to help you
          build smarter, faster, and with more intention.
        </p>
      </div>
      <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p, i) => {
          const artifactNum = String(i + 1).padStart(2, "0");
          const href = p.stripePaymentLink || `#${p.slug}`;
          const isExternal = Boolean(p.stripePaymentLink);
          return (
            <article
              key={p.id}
              data-stagger
              className="stagger-child group relative glow-card rounded-3xl overflow-hidden flex flex-col hover:-translate-y-1.5 transition-all duration-500"
            >
              <div className="relative h-44 bg-gradient-to-br from-[var(--wine)] to-[oklch(0.22_0.07_25)] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 weave-pattern opacity-60" />
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_30%,oklch(0.78_0.13_80_/_0.6),transparent_55%)]" />
                {p.image ? (
                  <img
                    src={p.image}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-[1.04] transition-transform duration-700"
                    onError={(e) => {
                      // Hide broken images so the gradient + icon fallback remains clean.
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : null}
                <span className="relative w-20 h-20 rounded-2xl bg-[oklch(0.78_0.13_80_/_0.15)] border border-[oklch(0.78_0.13_80_/_0.45)] text-[var(--gold)] flex items-center justify-center [&_svg]:w-8 [&_svg]:h-8 shadow-[0_0_30px_oklch(0.78_0.13_80_/_0.4)_inset] group-hover:scale-105 transition-transform duration-500">
                  {iconForCategory(p.category)}
                </span>
                <Lock className="absolute top-4 right-4 w-4 h-4 text-[var(--gold)]/60" />
                <span className="absolute bottom-3 left-4 text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]/70">
                  Artifact · {artifactNum}
                </span>
              </div>
              <div className="relative p-6 flex-1 flex flex-col">
                <span className="oracle-watermark" aria-hidden />
                <h3 className="font-display text-xl text-[var(--espresso)]">{p.title}</h3>
                <p className="mt-2 text-sm text-[var(--espresso)]/70 flex-1 relative">{p.description}</p>
                <div className="mt-5 flex items-center justify-between relative">
                  <span className="font-display text-2xl text-[var(--crimson)]">{p.price}</span>
                  <a
                    href={href}
                    {...(isExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="text-xs uppercase tracking-[0.2em] text-[var(--espresso)] inline-flex items-center gap-1.5 group-hover:gap-2.5 group-hover:text-[var(--crimson)] transition-all"
                  >
                    {p.ctaLabel} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
                <span className="pointer-events-none absolute top-2 left-2 w-3 h-3 border-l border-t border-[var(--gold)]/40" />
                <span className="pointer-events-none absolute top-2 right-2 w-3 h-3 border-r border-t border-[var(--gold)]/40" />
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

const studioOffers = [
  { icon: <Brain />, title: "AI Brand Strategy Session", body: "90 minutes to clarify positioning, audience, and AI offer." },
  { icon: <Wrench />, title: "Website Audit + Redesign Plan", body: "A premium audit and a clear redesign roadmap." },
  { icon: <Workflow />, title: "AI Workflow Mapping", body: "Design the automations behind your content and ops." },
  { icon: <Rocket />, title: "Digital Product Launch Support", body: "From idea to first sale with smart systems behind it." },
  { icon: <Palette />, title: "Canva + Content Design Sprint", body: "Two weeks of high-craft visuals and templates." },
  { icon: <GraduationCap />, title: "AI Clarity Workshop", body: "A small-group session to demystify AI for your business." },
];

function Studio() {
  const headerRef = useStaggerReveal<HTMLDivElement>(130);
  const gridRef = useStaggerReveal<HTMLDivElement>(80);

  return (
    <div className="relative py-28 mt-12 bg-[var(--wine)] text-[oklch(0.97_0.015_80)] overflow-hidden">
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,oklch(0.78_0.13_80_/_0.45),transparent_55%)]" />
      <div className="absolute inset-0 weave-pattern opacity-50 pointer-events-none" />
      <ThreadPatternSvg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" />
      <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" aria-hidden>
        {Array.from({ length: 60 }).map((_, i) => {
          const cx = (i * 113) % 1600;
          const cy = (i * 71) % 700;
          return <circle key={i} cx={cx} cy={cy} r="1.5" fill="#e8c46a" />;
        })}
      </svg>
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${(i * 73) % 100}%`,
              top: `${60 + ((i * 17) % 35)}%`,
              animationDelay: `${(i * 0.6) % 7}s`,
              animationDuration: `${6 + (i % 5)}s`,
            }}
          />
        ))}
      </div>
      <Section id="studio">
        <div ref={headerRef} className="grid lg:grid-cols-12 gap-12 items-center mb-16 relative">
          <div data-stagger className="stagger-child lg:col-span-5">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,oklch(0.78_0.13_80_/_0.55),transparent_60%)] blur-3xl ambient-glow" />
              <div className="absolute inset-6 rounded-full border border-[oklch(0.78_0.13_80_/_0.15)]" />
              <img
                src={oracleLaptop}
                onError={imgFallback(oracleLaptopFallback)}
                alt="The Crimson Oracle working on a laptop"
                className="relative w-full max-w-sm mx-auto drop-shadow-[0_30px_50px_oklch(0_0_0_/_0.45)]"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div data-stagger className="stagger-child text-[var(--gold)] uppercase tracking-[0.3em] text-xs mb-4">The Studio</div>
            <h2 data-stagger className="stagger-child font-display text-4xl md:text-5xl">
              Work with The AI <span className="gold-text italic">Vision Weaver</span>
            </h2>
            <p data-stagger className="stagger-child mt-5 text-[oklch(0.97_0.015_80_/_0.8)] max-w-xl">
              One-to-one sessions and sprints to weave AI, strategy, and design into the
              spine of your business — without losing your voice.
            </p>
          </div>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {studioOffers.map((o) => (
            <div
              key={o.title}
              data-stagger
              className="stagger-child dark-card rounded-2xl p-6 hover:border-[var(--gold)] transition-all duration-300 hover:-translate-y-1"
            >
              <span className="w-11 h-11 rounded-xl bg-[oklch(0.78_0.13_80_/_0.15)] text-[var(--gold)] flex items-center justify-center [&_svg]:w-5 [&_svg]:h-5">
                {o.icon}
              </span>
              <h3 className="mt-4 font-display text-xl">{o.title}</h3>
              <p className="mt-2 text-sm text-[oklch(0.97_0.015_80_/_0.7)]">{o.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#oracle" className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] text-[var(--wine)] px-8 py-4 font-medium tracking-wide hover:scale-[1.03] transition shadow-[0_20px_50px_-15px_oklch(0.78_0.13_80_/_0.7)]">
            Book a Strategy Session <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </Section>
    </div>
  );
}

function Oracle() {
  const innerRef = useStaggerReveal<HTMLDivElement>(150);

  return (
    <Section id="oracle" className="py-28">
      <CelestialDivider label="Transmissions" />
      <div ref={innerRef} className="relative grid lg:grid-cols-12 gap-10 items-center glow-card rounded-[2rem] p-8 md:p-14 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[radial-gradient(circle,oklch(0.78_0.13_80_/_0.35),transparent_70%)] blur-2xl ambient-glow" />
        <div className="absolute inset-0 weave-pattern opacity-50 pointer-events-none" />
        <ThreadPatternSvg className="absolute inset-0 w-full h-full pointer-events-none opacity-50" />
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="particle"
              style={{
                left: `${(i * 53) % 100}%`,
                top: `${50 + ((i * 13) % 40)}%`,
                animationDelay: `${(i * 0.7) % 6}s`,
                animationDuration: `${6 + (i % 4)}s`,
              }}
            />
          ))}
        </div>
        <div data-stagger className="stagger-child lg:col-span-5 relative">
          <div className="relative w-full max-w-xs mx-auto">
            <div className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,oklch(0.78_0.13_80_/_0.5),transparent_65%)] blur-2xl ambient-glow" />
            <div className="absolute -inset-3 rounded-full border border-[oklch(0.78_0.13_80_/_0.35)]" />
            <img
              src={oracleCloseup}
              onError={imgFallback(oracleCloseupFallback)}
              alt="The Crimson Oracle close-up portrait"
              className="relative w-full rounded-full ring-1 ring-[oklch(0.78_0.13_80_/_0.5)] shadow-[0_40px_70px_-20px_oklch(0.42_0.16_25_/_0.55)]"
            />
          </div>
        </div>
        <div className="lg:col-span-7 relative">
          <div data-stagger className="stagger-child text-[var(--crimson)] uppercase tracking-[0.3em] text-xs mb-4 flex items-center gap-2">
            <MessagesSquare className="w-3.5 h-3.5" /> Oracle Transmissions
          </div>
          <h2 data-stagger className="stagger-child font-display text-4xl md:text-5xl text-[var(--espresso)] leading-tight">
            Weekly wisdom from <span className="gold-text italic">the Oracle</span>.
          </h2>
          <p data-stagger className="stagger-child mt-3 text-sm uppercase tracking-[0.22em] text-[var(--gold)]/90">
            Weekly intelligence for creators building the future.
          </p>
          <p data-stagger className="stagger-child mt-5 text-[var(--espresso)]/75 max-w-xl">
            AI trends, prompt drops, design ideas, automation tips, and digital business
            strategy — distilled into one thoughtful transmission.
          </p>
          <form
            data-stagger
            onSubmit={(e) => e.preventDefault()}
            className="stagger-child mt-7 flex flex-col sm:flex-row gap-3 max-w-lg"
          >
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
              <label htmlFor="oracle-email" className="sr-only">Email address</label>
              <input
                id="oracle-email"
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-full bg-[oklch(0.985_0.012_80)] border border-[oklch(0.78_0.13_80_/_0.4)] py-3.5 pl-11 pr-5 text-sm focus:outline-none focus:border-[var(--crimson)] focus:ring-2 focus:ring-[oklch(0.42_0.16_25_/_0.2)] shadow-[inset_0_1px_0_oklch(1_0_0_/_0.6)]"
              />
            </div>
            <button type="submit" className="btn-primary rounded-full px-7 py-3.5 text-sm font-medium tracking-wide inline-flex items-center justify-center gap-2">
              Receive the Transmission <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          <p data-stagger className="stagger-child mt-3 text-xs text-[var(--muted-foreground)]">
            One thoughtful email a week. Unsubscribe whenever the threads unravel.
          </p>
        </div>
      </div>
    </Section>
  );
}

function About() {
  const imageRef = useStaggerReveal<HTMLDivElement>(0);
  const contentRef = useStaggerReveal<HTMLDivElement>(120);

  return (
    <Section id="about" className="py-28">
      <CelestialDivider label="The Weaver" />
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <div ref={imageRef} className="lg:col-span-5">
          <div data-stagger className="stagger-child relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[oklch(0.78_0.13_80_/_0.3)] to-[oklch(0.42_0.16_25_/_0.2)] blur-2xl" />
            <img
              src={mikiniPortrait}
              onError={imgFallback(mikiniPortraitFallback)}
              alt="Mikini Williams, AI strategist and founder of The AI Vision Weaver"
              className="relative w-full max-w-md rounded-[2rem] object-cover shadow-[0_40px_80px_-30px_oklch(0.30_0.11_22_/_0.55)]"
            />
            <div className="absolute -bottom-4 -right-4 glow-card rounded-2xl px-5 py-4 flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-[var(--gold)]" />
              <div className="leading-tight">
                <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--muted-foreground)]">Founder</div>
                <div className="font-display text-sm text-[var(--espresso)]">Mikini Williams</div>
              </div>
            </div>
          </div>
        </div>
        <div ref={contentRef} className="lg:col-span-7">
          <div data-stagger className="stagger-child text-[var(--crimson)] uppercase tracking-[0.3em] text-xs mb-3">About</div>
          <h2 data-stagger className="stagger-child font-display text-4xl md:text-5xl text-[var(--espresso)] leading-tight">
            Meet <span className="gold-text italic">Mikini Williams</span>
          </h2>
          <p data-stagger className="stagger-child mt-5 text-base md:text-lg text-[var(--wine)] font-medium italic">
            Cybersecurity strategist. AI consultant. Systems thinker.
          </p>
          <p data-stagger className="stagger-child mt-6 text-lg text-[var(--espresso)]/80 leading-relaxed">
            20+ years in technology — and still obsessed with building. Mikini helps
            entrepreneurs use AI without losing their voice, values, or vision.
          </p>
          <p data-stagger className="stagger-child mt-4 text-[var(--espresso)]/70">
            She believes the best brands are <em className="not-italic text-[var(--crimson)] font-medium">woven</em>, not
            assembled. Every offer, system, and pixel is a thread in a larger tapestry of
            meaning, intelligence, and income.
          </p>
          <div data-stagger className="stagger-child mt-9 grid sm:grid-cols-3 gap-4">
            {[
              { k: "20+", v: "Years in tech & cybersecurity" },
              { k: "200+", v: "Brands & creators guided" },
              { k: "AI-Certified", v: "Strategist & consultant" },
            ].map((s) => (
              <div key={s.v} className="glow-card rounded-2xl p-5">
                <div className="font-display text-2xl gold-text">{s.k}</div>
                <div className="text-xs text-[var(--espresso)]/70 mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function FinalCTA() {
  const innerRef = useStaggerReveal<HTMLDivElement>(160);

  return (
    <div className="relative py-28 overflow-hidden bg-[var(--wine)] text-[oklch(0.97_0.015_80)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.78_0.13_80_/_0.3),transparent_60%)]" />
      <svg className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-px" aria-hidden>
        <line x1="0" y1="0" x2="100%" y2="0" stroke="url(#g)" strokeWidth="1" />
        <defs>
          <linearGradient id="g">
            <stop offset="0%" stopColor="#e8c46a" stopOpacity="0" />
            <stop offset="50%" stopColor="#e8c46a" stopOpacity="1" />
            <stop offset="100%" stopColor="#e8c46a" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <Section className="relative text-center">
        <div ref={innerRef}>
          <Wand2 data-stagger className="stagger-child w-8 h-8 mx-auto text-[var(--gold)] mb-6" />
          <h2 data-stagger className="stagger-child font-display text-4xl md:text-6xl max-w-3xl mx-auto leading-tight">
            Ready to weave your next digital idea into something <em className="gold-text not-italic">real</em>?
          </h2>
          <div data-stagger className="stagger-child mt-10 flex flex-wrap gap-4 justify-center">
            <a href="#vault" className="rounded-full bg-[var(--gold)] text-[var(--wine)] px-8 py-4 font-medium tracking-wide hover:scale-[1.03] transition shadow-[0_20px_50px_-15px_oklch(0.78_0.13_80_/_0.7)]">
              Shop the Vault
            </a>
            <a href="#studio" className="rounded-full border border-[oklch(0.78_0.13_80_/_0.6)] px-8 py-4 font-medium tracking-wide hover:bg-[oklch(0.78_0.13_80_/_0.15)] transition">
              Book a Session
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative pt-20 pb-14 text-center text-sm text-[var(--muted-foreground)] tapestry-bg overflow-hidden">
      {/* Nkyimu watermark — large, faint mark anchoring the footer */}
      <img
        src="/images/logo/ai-vision-weaver-nkyimu-logo-transparent.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.04]"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src =
            "/images/logo/ai-vision-weaver-nkyimu-logo-transparent.png";
        }}
      />
      <div className="relative max-w-3xl mx-auto px-6 mb-12 flex items-center gap-4">
        <div className="flex-1 h-px thread-line" />
        <span className="constellation-dot" />
        <span className="constellation-dot" style={{ opacity: 0.6 }} />
        <span className="constellation-dot" />
        <div className="flex-1 h-px thread-line" />
      </div>

      <div className="absolute left-1/2 top-24 -translate-x-1/2 w-56 h-56 opacity-[0.06] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 26%, oklch(0.42 0.16 25) 27% 30%, transparent 31% 44%, oklch(0.42 0.16 25) 45% 47%, transparent 48%)",
          borderRadius: "999px",
        }}
        aria-hidden
      />

      <div className="relative max-w-2xl mx-auto px-6">
        <p className="font-display text-2xl md:text-3xl text-[var(--espresso)] italic leading-snug">
          "Excellence is <span className="gold-text not-italic">woven</span>, not assembled."
        </p>
        <div className="mt-3 text-[10px] tracking-[0.35em] uppercase text-[var(--gold)]">— The Crimson Oracle</div>
      </div>

      <div className="relative flex items-center justify-center gap-2 mt-12 mb-3">
        <BookOpen className="w-3.5 h-3.5 text-[var(--gold)]" />
        <span className="uppercase tracking-[0.3em] text-xs">The AI Vision Weaver</span>
      </div>
      <p className="relative">© {new Date().getFullYear()} Mikini Williams. Woven with intention.</p>
    </footer>
  );
}

export function Landing() {
  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--foreground)]">
      <Intro />
      <CursorSpotlight />
      <Nav />
      <main>
        <Hero />
        <Tapestry />
        <Vault />
        <Studio />
        <Oracle />
        <About />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
