import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as Sparkles, A as ArrowRight, B as Brain, P as Palette, N as Network, F as FileCodeCorner, W as Workflow, L as Layers, T as TrendingUp, M as MessagesSquare, a as Lock, b as Mail, c as WandSparkles, d as BookOpen, E as Eye, C as Compass, R as Rocket, e as Wrench, G as GraduationCap } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
function useStaggerReveal(step = 120, offset = 0) {
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const children = Array.from(el.querySelectorAll("[data-stagger]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          children.forEach((child, i) => {
            child.style.setProperty("--delay", `${offset + i * step}ms`);
            child.classList.add("stagger-in");
          });
          io.unobserve(e.target);
        });
      },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [step, offset]);
  return ref;
}
function Nav() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 backdrop-blur-md bg-[oklch(0.965_0.018_80_/_0.75)] border-b border-[oklch(0.78_0.13_80_/_0.2)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 py-4 flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2.5 group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--wine)] shadow-[0_0_24px_oklch(0.78_0.13_80_/_0.35)] overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/images/logo/ai-vision-weaver-nkyimu-logo-transparent.svg",
            alt: "",
            "aria-hidden": true,
            className: "w-7 h-7 object-contain",
            onError: (e) => {
              e.currentTarget.src = "/images/logo/ai-vision-weaver-nkyimu-logo-transparent.png";
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 rounded-full ring-1 ring-[oklch(0.78_0.13_80_/_0.5)]" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-col leading-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.22em] text-[var(--muted-foreground)]", children: "THE" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-lg tracking-tight text-[var(--espresso)]", children: [
          "AI Vision ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gold-text", children: "Weaver" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden md:flex items-center gap-8 text-sm text-[var(--espresso)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#tapestry", className: "hover:text-[var(--crimson)] transition", children: "Tapestry" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#vault", className: "hover:text-[var(--crimson)] transition", children: "Vault" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#studio", className: "hover:text-[var(--crimson)] transition", children: "Studio" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#oracle", className: "hover:text-[var(--crimson)] transition", children: "Oracle" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#about", className: "hover:text-[var(--crimson)] transition", children: "About" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#oracle", className: "btn-primary text-sm px-5 py-2.5 rounded-full font-medium tracking-wide", children: "Join the Oracle" })
  ] }) });
}
function ThreadPatternSvg({ className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      className,
      "aria-hidden": true,
      viewBox: "0 0 1200 400",
      preserveAspectRatio: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "thread-grad", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#e8c46a", stopOpacity: "0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "#f3d77a", stopOpacity: "0.8" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#e8c46a", stopOpacity: "0" })
        ] }) }),
        [80, 140, 210, 280].map((y, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: `M -50 ${y} Q 300 ${y - 40 + i * 20} 600 ${y} T 1250 ${y - 10}`,
            stroke: "url(#thread-grad)",
            strokeWidth: 1.2 - i * 0.15,
            fill: "none",
            opacity: 0.55 - i * 0.08
          },
          y
        ))
      ]
    }
  );
}
function CelestialDivider({ label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-4 my-16 px-6 celestial-divider", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "flex-1 max-w-xs h-2", viewBox: "0 0 320 8", preserveAspectRatio: "none", "aria-hidden": true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "cd-l", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#e8c46a", stopOpacity: "0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#e8c46a", stopOpacity: "0.9" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "line",
        {
          x1: "0",
          y1: "4",
          x2: "320",
          y2: "4",
          stroke: "url(#cd-l)",
          strokeWidth: "1",
          className: "cd-draw"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3 text-[var(--gold)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "14", height: "14", viewBox: "0 0 14 14", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          d: "M7 0 L8.2 5.8 L14 7 L8.2 8.2 L7 14 L5.8 8.2 L0 7 L5.8 5.8 Z",
          fill: "currentColor",
          opacity: "0.9"
        }
      ) }),
      label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase tracking-[0.3em] text-[10px] text-[var(--muted-foreground)]", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "14", height: "14", viewBox: "0 0 14 14", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          d: "M7 0 L8.2 5.8 L14 7 L8.2 8.2 L7 14 L5.8 8.2 L0 7 L5.8 5.8 Z",
          fill: "currentColor",
          opacity: "0.9"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "flex-1 max-w-xs h-2", viewBox: "0 0 320 8", preserveAspectRatio: "none", "aria-hidden": true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "cd-r", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#e8c46a", stopOpacity: "0.9" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#e8c46a", stopOpacity: "0" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "line",
        {
          x1: "0",
          y1: "4",
          x2: "320",
          y2: "4",
          stroke: "url(#cd-r)",
          strokeWidth: "1",
          className: "cd-draw"
        }
      )
    ] })
  ] });
}
const SESSION_KEY = "avw-intro-seen";
function Intro() {
  const [mounted, setMounted] = reactExports.useState(false);
  const [phase, setPhase] = reactExports.useState("in");
  const [showSkip, setShowSkip] = reactExports.useState(false);
  const [count, setCount] = reactExports.useState(3);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      sessionStorage.setItem(SESSION_KEY, "1");
      return;
    }
    setMounted(true);
    document.documentElement.style.overflow = "hidden";
    const skipT = window.setTimeout(() => setShowSkip(true), 1e3);
    const c3 = window.setTimeout(() => setCount(2), 2200);
    const c2 = window.setTimeout(() => setCount(1), 3200);
    const c1 = window.setTimeout(() => setCount(0), 4200);
    const outT = window.setTimeout(() => setPhase("out"), 5e3);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `intro-veil ${phase === "out" ? "intro-out" : ""}`,
      "aria-hidden": phase === "out",
      role: "dialog",
      "aria-label": "The Oracle is weaving your transmission",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "intro-particles", "aria-hidden": true, children: Array.from({ length: 26 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "intro-particle",
            style: {
              left: `${i * 53 % 100}%`,
              top: `${i * 71 % 100}%`,
              animationDelay: `${i * 0.3 % 6}s`,
              animationDuration: `${6 + i % 5}s`
            }
          },
          i
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "intro-threads", viewBox: "0 0 800 800", "aria-hidden": true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "intro-thread", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#e8c46a", stopOpacity: "0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "#f3d77a", stopOpacity: "1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#e8c46a", stopOpacity: "0" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "400", cy: "400", r: "220", stroke: "url(#intro-thread)", strokeWidth: "1", fill: "none", className: "intro-thread-arc" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "400", cy: "400", r: "270", stroke: "url(#intro-thread)", strokeWidth: "0.8", fill: "none", className: "intro-thread-arc d2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "400", cy: "400", r: "320", stroke: "url(#intro-thread)", strokeWidth: "0.6", fill: "none", className: "intro-thread-arc d3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M 80 400 Q 400 200 720 400 T 80 400",
              stroke: "url(#intro-thread)",
              strokeWidth: "0.7",
              fill: "none",
              className: "intro-thread-arc d4"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "intro-logo-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/images/logo/ai-vision-weaver-nkyimu-logo-transparent.svg",
              alt: "The AI Vision Weaver",
              className: "intro-logo",
              onError: (e) => {
                e.currentTarget.src = "/images/logo/ai-vision-weaver-nkyimu-logo-transparent.png";
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "intro-logo-halo", "aria-hidden": true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "intro-copy", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "intro-tagline", children: "The Oracle is weaving your transmission…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "intro-count", "aria-live": "polite", children: count > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "intro-count-num", children: count }, count) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "intro-enter", children: "Enter the Studio" }) })
        ] }),
        showSkip && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: skip, className: "intro-skip", children: "Skip" })
      ]
    }
  );
}
const oracleStanding = "/images/oracle/oracle-standing-new.png";
const oracleLaptop = "/images/oracle/oracle-laptop-new.png";
const oracleLaptopFallback = "/images/oracle/oracle-laptop.png";
const oracleCloseup = "/images/oracle/oracle-closeup-new.png";
const oracleCloseupFallback = "/images/oracle/Oracle-closeup.png";
const mikiniPortrait = "/images/founder/mikini-real.jpeg";
const mikiniPortraitFallback = "/images/founder/mikini-portrait.png";
function imgFallback(fb) {
  return (e) => {
    const el = e.currentTarget;
    if (el.src.endsWith(fb)) return;
    el.src = fb;
  };
}
function CursorSpotlight() {
  reactExports.useEffect(() => {
    let raf = 0;
    let nx = 50, ny = 30;
    const onMove = (e) => {
      nx = e.clientX / window.innerWidth * 100;
      ny = e.clientY / window.innerHeight * 100;
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "cursor-spotlight", "aria-hidden": true });
}
function FloatingCard({
  title,
  icon,
  className = "",
  delay = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `absolute glow-card rounded-2xl px-4 py-3 flex items-center gap-2.5 float-card ${delay} ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-7 h-7 rounded-lg bg-[var(--wine)] text-[var(--gold)] flex items-center justify-center", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium tracking-wide text-[var(--espresso)] whitespace-nowrap", children: title })
  ] });
}
function Section({
  id,
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id, className: `max-w-7xl mx-auto px-6 ${className}`, children });
}
function Hero() {
  const heroRef = reactExports.useRef(null);
  const leftColRef = useStaggerReveal(140);
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: heroRef, className: "relative overflow-hidden tapestry-bg section-vignette", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        className: "absolute inset-0 w-full h-full opacity-40 pointer-events-none",
        style: { transform: "translateY(calc(var(--hero-y, 0px) * -0.05))", willChange: "transform" },
        "aria-hidden": true,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: "dot", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#e8c46a", stopOpacity: "1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#e8c46a", stopOpacity: "0" })
          ] }) }),
          Array.from({ length: 40 }).map((_, i) => {
            const cx = i * 137 % 1400;
            const cy = i * 89 % 800;
            return /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx, cy, r: "2", fill: "url(#dot)" }, i);
          })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-7xl mx-auto px-6 pt-28 pb-32 md:pt-40 md:pb-44 grid lg:grid-cols-12 lg:gap-20 gap-16 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-6 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: leftColRef, className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "aria-hidden": true,
            className: "absolute -inset-6 -z-10 rounded-3xl bg-[oklch(0.985_0.012_80_/_0.55)] backdrop-blur-[2px]",
            style: { maskImage: "radial-gradient(ellipse at left, black 55%, transparent 90%)", WebkitMaskImage: "radial-gradient(ellipse at left, black 55%, transparent 90%)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-stagger": true, className: "stagger-child inline-flex items-center gap-2 rounded-full border border-[oklch(0.78_0.13_80_/_0.5)] bg-[oklch(0.78_0.13_80_/_0.1)] px-4 py-1.5 uppercase tracking-[0.25em] mb-7 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
          " Strategy · Systems · AI · Magic"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { "data-stagger": true, className: "stagger-child relative z-10 font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] text-[var(--espresso)]", children: [
          "The ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gold-text italic", children: "AI" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Vision ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--crimson)]", children: "Weaver" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { "data-stagger": true, className: "stagger-child mt-7 text-lg text-[var(--espresso)]/80 max-w-xl leading-relaxed", children: "Weaving strategy, systems, AI, and design into digital products that feel like the future." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { "data-stagger": true, className: "stagger-child mt-3 text-sm text-[var(--muted-foreground)] max-w-xl", children: "For entrepreneurs, consultants, and creators ready to turn ideas into intelligent brands, content systems, and digital income." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-stagger": true, className: "stagger-child mt-9 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#studio", className: "btn-primary px-7 py-3.5 rounded-full font-medium tracking-wide inline-flex items-center gap-2", children: [
            "Enter the Studio ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#vault", className: "btn-ghost-gold px-7 py-3.5 rounded-full font-medium tracking-wide inline-flex items-center gap-2", children: "Explore the Vault" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-stagger": true, className: "stagger-child mt-12 grid grid-cols-3 sm:grid-cols-6 gap-4 max-w-lg", children: [
          { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-4 h-4" }), label: "Prompts" },
          { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "w-4 h-4" }), label: "Branding" },
          { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Network, { className: "w-4 h-4" }), label: "Systems" },
          { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileCodeCorner, { className: "w-4 h-4" }), label: "Content" },
          { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Workflow, { className: "w-4 h-4" }), label: "Automate" },
          { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-4 h-4" }), label: "Products" }
        ].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5 text-[var(--espresso)]/70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-9 h-9 rounded-full border border-[oklch(0.78_0.13_80_/_0.5)] flex items-center justify-center text-[var(--crimson)]", children: p.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider", children: p.label })
        ] }, p.label)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "lg:col-span-6 relative",
          style: { transform: "translateY(calc(var(--hero-y, 0px) * -0.13))", willChange: "transform" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-[640px] md:min-h-[820px] lg:min-h-[920px] flex items-center justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.78_0.13_80_/_0.45),transparent_60%)] blur-3xl breathe" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-10 rounded-full bg-[radial-gradient(circle_at_50%_40%,oklch(0.42_0.16_25_/_0.28),transparent_65%)] blur-2xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-4 rounded-full border border-[oklch(0.78_0.13_80_/_0.18)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-14 rounded-full border border-[oklch(0.78_0.13_80_/_0.12)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-24 rounded-full border border-[oklch(0.78_0.13_80_/_0.08)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dashed-ring inset-2 slow-spin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "absolute inset-0 w-full h-full pointer-events-none", viewBox: "0 0 100 100", preserveAspectRatio: "none", "aria-hidden": true, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "hero-thread", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#e8c46a", stopOpacity: "0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "#f3d77a", stopOpacity: "0.65" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#e8c46a", stopOpacity: "0" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M 0 30 Q 50 10 100 35", stroke: "url(#hero-thread)", strokeWidth: "0.25", fill: "none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M 0 70 Q 50 95 100 65", stroke: "url(#hero-thread)", strokeWidth: "0.25", fill: "none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M 15 0 Q 50 50 18 100", stroke: "url(#hero-thread)", strokeWidth: "0.2", fill: "none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M 85 0 Q 50 50 82 100", stroke: "url(#hero-thread)", strokeWidth: "0.2", fill: "none" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", children: [[18, 22], [78, 18], [12, 62], [88, 70], [50, 92], [30, 8], [70, 88]].map(([x, y], i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "absolute constellation-dot node-pulse",
                style: { left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.4}s` }
              },
              i
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", children: Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "particle",
                style: {
                  left: `${10 + i * 41 % 80}%`,
                  top: `${55 + i * 23 % 35}%`,
                  animationDelay: `${i * 0.9 % 7}s`,
                  animationDuration: `${7 + i % 4}s`
                }
              },
              i
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "video",
              {
                src: "/videos/oracle-movement.mp4",
                poster: oracleStanding,
                autoPlay: true,
                loop: true,
                muted: true,
                playsInline: true,
                preload: "metadata",
                "aria-label": "The Crimson Oracle, AI Vision Weaver guide",
                className: "oracle-figure relative w-full max-w-3xl lg:max-w-[42rem] xl:max-w-[48rem] mx-auto lg:-mr-6 xl:-mr-10 drop-shadow-[0_70px_110px_oklch(0.30_0.11_22_/_0.55)] oracle-woven"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FloatingCard,
              {
                title: "AI Strategy",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-3.5 h-3.5" }),
                className: "top-8 -left-2 md:-left-10"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FloatingCard,
              {
                title: "Automation",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Workflow, { className: "w-3.5 h-3.5" }),
                className: "top-1/4 -right-2 md:-right-6",
                delay: "delay-1"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FloatingCard,
              {
                title: "Brand Strategy",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "w-3.5 h-3.5" }),
                className: "top-1/2 -left-2 md:-left-14",
                delay: "delay-2"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FloatingCard,
              {
                title: "Marketing Growth",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5" }),
                className: "top-[58%] -right-2 md:-right-10",
                delay: "delay-3"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FloatingCard,
              {
                title: "Content Systems",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileCodeCorner, { className: "w-3.5 h-3.5" }),
                className: "bottom-32 -left-4 md:-left-12",
                delay: "delay-1"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FloatingCard,
              {
                title: "The Vault",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-3.5 h-3.5" }),
                className: "bottom-20 right-0 md:right-2",
                delay: "delay-2"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FloatingCard,
              {
                title: "The Oracle Says",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessagesSquare, { className: "w-3.5 h-3.5" }),
                className: "bottom-6 left-1/3 md:left-[38%]",
                delay: "delay-3"
              }
            )
          ] })
        }
      )
    ] })
  ] });
}
const tapestrySteps = [
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-5 h-5" }), title: "Vision", body: "Clarify the idea, the audience, and the offer." },
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "w-5 h-5" }), title: "Strategy", body: "Shape the offer into a profitable positioning." },
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Workflow, { className: "w-5 h-5" }), title: "Systems", body: "Build the workflows, automations, and AI stack." },
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "w-5 h-5" }), title: "Design", body: "Package the experience into something premium." }
];
function Tapestry() {
  const introRef = useStaggerReveal(130);
  const gridRef = useStaggerReveal(100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "tapestry", className: "py-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CelestialDivider, { label: "The Tapestry" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-12 gap-12 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: introRef, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { "data-stagger": true, className: "stagger-child font-display text-4xl md:text-5xl text-[var(--espresso)] leading-tight", children: [
          "Every powerful brand begins as a ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "gold-text not-italic", children: "thread" }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { "data-stagger": true, className: "stagger-child mt-6 text-[var(--espresso)]/75 leading-relaxed", children: "The AI Vision Weaver turns scattered ideas into a connected digital tapestry: strategy, storytelling, automation, content, products, and design working together instead of fighting for attention." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-7", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: gridRef, className: "relative grid sm:grid-cols-2 gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "absolute inset-0 w-full h-full pointer-events-none", "aria-hidden": true, viewBox: "0 0 100 100", preserveAspectRatio: "none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M 25 25 Q 50 50 75 25", stroke: "url(#tg)", strokeWidth: "0.4", fill: "none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M 25 75 Q 50 50 75 75", stroke: "url(#tg)", strokeWidth: "0.4", fill: "none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M 25 25 Q 25 50 25 75", stroke: "url(#tg)", strokeWidth: "0.4", fill: "none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M 75 25 Q 75 50 75 75", stroke: "url(#tg)", strokeWidth: "0.4", fill: "none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "tg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#e8c46a", stopOpacity: "0.1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "#e8c46a", stopOpacity: "0.8" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#e8c46a", stopOpacity: "0.1" })
          ] }) })
        ] }),
        tapestrySteps.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-stagger": true,
            className: "stagger-child relative glow-card rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-11 h-11 rounded-xl bg-[var(--wine)] text-[var(--gold)] flex items-center justify-center", children: s.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-3xl text-[var(--gold)]/70", children: [
                  "0",
                  i + 1
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl text-[var(--espresso)]", children: s.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-[var(--espresso)]/70", children: s.body }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-1 -right-1 constellation-dot" })
            ]
          },
          s.title
        ))
      ] }) })
    ] })
  ] });
}
const vaultProducts = [
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, {}), title: "Oracle Prompt Vault", desc: "200+ premium AI prompts for brand, content, and strategy.", price: "$47" },
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, {}), title: "AI Brand Weaver Kit", desc: "Brand voice, identity, and positioning playbook.", price: "$97" },
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileCodeCorner, {}), title: "Crimson Content System", desc: "A weekly content engine powered by AI and intention.", price: "$67" },
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, {}), title: "Website Audit Blueprint", desc: "Diagnose, refine, and elevate your digital presence.", price: "$37" },
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, {}), title: "Digital Product Starter Kit", desc: "Launch your first digital product in seven days.", price: "$57" },
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, {}), title: "Canva Marketing Templates", desc: "120 luxe templates for socials, lead magnets, and decks.", price: "$29" }
];
function Vault() {
  const introRef = useStaggerReveal(130);
  const gridRef = useStaggerReveal(80);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "vault", className: "py-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CelestialDivider, { label: "The Vault" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: introRef, className: "text-center max-w-2xl mx-auto mb-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { "data-stagger": true, className: "stagger-child font-display text-4xl md:text-5xl text-[var(--espresso)]", children: [
        "Open the ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gold-text italic", children: "Vault" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { "data-stagger": true, className: "stagger-child mt-5 text-[var(--espresso)]/75", children: "Digital products, templates, prompts, and creative systems designed to help you build smarter, faster, and with more intention." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: gridRef, className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: vaultProducts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "article",
      {
        "data-stagger": true,
        className: "stagger-child group relative glow-card rounded-3xl overflow-hidden flex flex-col hover:-translate-y-1.5 transition-all duration-500",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-44 bg-gradient-to-br from-[var(--wine)] to-[oklch(0.22_0.07_25)] flex items-center justify-center overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 weave-pattern opacity-60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_30%,oklch(0.78_0.13_80_/_0.6),transparent_55%)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative w-20 h-20 rounded-2xl bg-[oklch(0.78_0.13_80_/_0.15)] border border-[oklch(0.78_0.13_80_/_0.45)] text-[var(--gold)] flex items-center justify-center [&_svg]:w-8 [&_svg]:h-8 shadow-[0_0_30px_oklch(0.78_0.13_80_/_0.4)_inset] group-hover:scale-105 transition-transform duration-500", children: p.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute top-4 right-4 w-4 h-4 text-[var(--gold)]/60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute bottom-3 left-4 text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]/70", children: [
              "Artifact · 0",
              vaultProducts.indexOf(p) + 1
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative p-6 flex-1 flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "oracle-watermark", "aria-hidden": true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl text-[var(--espresso)]", children: p.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-[var(--espresso)]/70 flex-1 relative", children: p.desc }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center justify-between relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl text-[var(--crimson)]", children: p.price }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "text-xs uppercase tracking-[0.2em] text-[var(--espresso)] inline-flex items-center gap-1.5 group-hover:gap-2.5 group-hover:text-[var(--crimson)] transition-all", children: [
                "View Product ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute top-2 left-2 w-3 h-3 border-l border-t border-[var(--gold)]/40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute top-2 right-2 w-3 h-3 border-r border-t border-[var(--gold)]/40" })
          ] })
        ]
      },
      p.title
    )) })
  ] });
}
const studioOffers = [
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, {}), title: "AI Brand Strategy Session", body: "90 minutes to clarify positioning, audience, and AI offer." },
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, {}), title: "Website Audit + Redesign Plan", body: "A premium audit and a clear redesign roadmap." },
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Workflow, {}), title: "AI Workflow Mapping", body: "Design the automations behind your content and ops." },
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, {}), title: "Digital Product Launch Support", body: "From idea to first sale with smart systems behind it." },
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, {}), title: "Canva + Content Design Sprint", body: "Two weeks of high-craft visuals and templates." },
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, {}), title: "AI Clarity Workshop", body: "A small-group session to demystify AI for your business." }
];
function Studio() {
  const headerRef = useStaggerReveal(130);
  const gridRef = useStaggerReveal(80);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative py-28 mt-12 bg-[var(--wine)] text-[oklch(0.97_0.015_80)] overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,oklch(0.78_0.13_80_/_0.45),transparent_55%)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 weave-pattern opacity-50 pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ThreadPatternSvg, { className: "absolute inset-0 w-full h-full pointer-events-none opacity-30" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "absolute inset-0 w-full h-full opacity-30 pointer-events-none", "aria-hidden": true, children: Array.from({ length: 60 }).map((_, i) => {
      const cx = i * 113 % 1600;
      const cy = i * 71 % 700;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx, cy, r: "1.5", fill: "#e8c46a" }, i);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", children: Array.from({ length: 14 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "particle",
        style: {
          left: `${i * 73 % 100}%`,
          top: `${60 + i * 17 % 35}%`,
          animationDelay: `${i * 0.6 % 7}s`,
          animationDuration: `${6 + i % 5}s`
        }
      },
      i
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "studio", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: headerRef, className: "grid lg:grid-cols-12 gap-12 items-center mb-16 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-stagger": true, className: "stagger-child lg:col-span-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-[radial-gradient(circle,oklch(0.78_0.13_80_/_0.55),transparent_60%)] blur-3xl ambient-glow" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-6 rounded-full border border-[oklch(0.78_0.13_80_/_0.15)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: oracleLaptop,
              onError: imgFallback(oracleLaptopFallback),
              alt: "The Crimson Oracle working on a laptop",
              className: "relative w-full max-w-sm mx-auto drop-shadow-[0_30px_50px_oklch(0_0_0_/_0.45)]"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-7", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-stagger": true, className: "stagger-child text-[var(--gold)] uppercase tracking-[0.3em] text-xs mb-4", children: "The Studio" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { "data-stagger": true, className: "stagger-child font-display text-4xl md:text-5xl", children: [
            "Work with The AI ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gold-text italic", children: "Vision Weaver" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { "data-stagger": true, className: "stagger-child mt-5 text-[oklch(0.97_0.015_80_/_0.8)] max-w-xl", children: "One-to-one sessions and sprints to weave AI, strategy, and design into the spine of your business — without losing your voice." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: gridRef, className: "grid md:grid-cols-2 lg:grid-cols-3 gap-5", children: studioOffers.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-stagger": true,
          className: "stagger-child dark-card rounded-2xl p-6 hover:border-[var(--gold)] transition-all duration-300 hover:-translate-y-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-11 h-11 rounded-xl bg-[oklch(0.78_0.13_80_/_0.15)] text-[var(--gold)] flex items-center justify-center [&_svg]:w-5 [&_svg]:h-5", children: o.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-display text-xl", children: o.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-[oklch(0.97_0.015_80_/_0.7)]", children: o.body })
          ]
        },
        o.title
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#oracle", className: "inline-flex items-center gap-2 rounded-full bg-[var(--gold)] text-[var(--wine)] px-8 py-4 font-medium tracking-wide hover:scale-[1.03] transition shadow-[0_20px_50px_-15px_oklch(0.78_0.13_80_/_0.7)]", children: [
        "Book a Strategy Session ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
      ] }) })
    ] })
  ] });
}
function Oracle() {
  const innerRef = useStaggerReveal(150);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "oracle", className: "py-28", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CelestialDivider, { label: "Transmissions" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: innerRef, className: "relative grid lg:grid-cols-12 gap-10 items-center glow-card rounded-[2rem] p-8 md:p-14 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[radial-gradient(circle,oklch(0.78_0.13_80_/_0.35),transparent_70%)] blur-2xl ambient-glow" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 weave-pattern opacity-50 pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ThreadPatternSvg, { className: "absolute inset-0 w-full h-full pointer-events-none opacity-50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", children: Array.from({ length: 10 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "particle",
          style: {
            left: `${i * 53 % 100}%`,
            top: `${50 + i * 13 % 40}%`,
            animationDelay: `${i * 0.7 % 6}s`,
            animationDuration: `${6 + i % 4}s`
          }
        },
        i
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-stagger": true, className: "stagger-child lg:col-span-5 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-xs mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-6 rounded-full bg-[radial-gradient(circle,oklch(0.78_0.13_80_/_0.5),transparent_65%)] blur-2xl ambient-glow" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-3 rounded-full border border-[oklch(0.78_0.13_80_/_0.35)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: oracleCloseup,
            onError: imgFallback(oracleCloseupFallback),
            alt: "The Crimson Oracle close-up portrait",
            className: "relative w-full rounded-full ring-1 ring-[oklch(0.78_0.13_80_/_0.5)] shadow-[0_40px_70px_-20px_oklch(0.42_0.16_25_/_0.55)]"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-7 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-stagger": true, className: "stagger-child text-[var(--crimson)] uppercase tracking-[0.3em] text-xs mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessagesSquare, { className: "w-3.5 h-3.5" }),
          " Oracle Transmissions"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { "data-stagger": true, className: "stagger-child font-display text-4xl md:text-5xl text-[var(--espresso)] leading-tight", children: [
          "Weekly wisdom from ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gold-text italic", children: "the Oracle" }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { "data-stagger": true, className: "stagger-child mt-3 text-sm uppercase tracking-[0.22em] text-[var(--gold)]/90", children: "Weekly intelligence for creators building the future." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { "data-stagger": true, className: "stagger-child mt-5 text-[var(--espresso)]/75 max-w-xl", children: "AI trends, prompt drops, design ideas, automation tips, and digital business strategy — distilled into one thoughtful transmission." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            "data-stagger": true,
            onSubmit: (e) => e.preventDefault(),
            className: "stagger-child mt-7 flex flex-col sm:flex-row gap-3 max-w-lg",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "oracle-email", className: "sr-only", children: "Email address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "oracle-email",
                    type: "email",
                    placeholder: "Enter your email",
                    className: "w-full rounded-full bg-[oklch(0.985_0.012_80)] border border-[oklch(0.78_0.13_80_/_0.4)] py-3.5 pl-11 pr-5 text-sm focus:outline-none focus:border-[var(--crimson)] focus:ring-2 focus:ring-[oklch(0.42_0.16_25_/_0.2)] shadow-[inset_0_1px_0_oklch(1_0_0_/_0.6)]"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "btn-primary rounded-full px-7 py-3.5 text-sm font-medium tracking-wide inline-flex items-center justify-center gap-2", children: [
                "Receive the Transmission ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { "data-stagger": true, className: "stagger-child mt-3 text-xs text-[var(--muted-foreground)]", children: "One thoughtful email a week. Unsubscribe whenever the threads unravel." })
      ] })
    ] })
  ] });
}
function About() {
  const imageRef = useStaggerReveal(0);
  const contentRef = useStaggerReveal(120);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { id: "about", className: "py-28", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CelestialDivider, { label: "The Weaver" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-12 gap-12 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: imageRef, className: "lg:col-span-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-stagger": true, className: "stagger-child relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[oklch(0.78_0.13_80_/_0.3)] to-[oklch(0.42_0.16_25_/_0.2)] blur-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: mikiniPortrait,
            onError: imgFallback(mikiniPortraitFallback),
            alt: "Mikini Williams, AI strategist and founder of The AI Vision Weaver",
            className: "relative w-full max-w-md rounded-[2rem] object-cover shadow-[0_40px_80px_-30px_oklch(0.30_0.11_22_/_0.55)]"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -bottom-4 -right-4 glow-card rounded-2xl px-5 py-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-[var(--gold)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.25em] text-[var(--muted-foreground)]", children: "Founder" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-sm text-[var(--espresso)]", children: "Mikini Williams" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: contentRef, className: "lg:col-span-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-stagger": true, className: "stagger-child text-[var(--crimson)] uppercase tracking-[0.3em] text-xs mb-3", children: "About" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { "data-stagger": true, className: "stagger-child font-display text-4xl md:text-5xl text-[var(--espresso)] leading-tight", children: [
          "Meet ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gold-text italic", children: "Mikini Williams" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { "data-stagger": true, className: "stagger-child mt-5 text-base md:text-lg text-[var(--wine)] font-medium italic", children: "Cybersecurity strategist. AI consultant. Systems thinker." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { "data-stagger": true, className: "stagger-child mt-6 text-lg text-[var(--espresso)]/80 leading-relaxed", children: "20+ years in technology — and still obsessed with building. Mikini helps entrepreneurs use AI without losing their voice, values, or vision." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { "data-stagger": true, className: "stagger-child mt-4 text-[var(--espresso)]/70", children: [
          "She believes the best brands are ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "not-italic text-[var(--crimson)] font-medium", children: "woven" }),
          ", not assembled. Every offer, system, and pixel is a thread in a larger tapestry of meaning, intelligence, and income."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-stagger": true, className: "stagger-child mt-9 grid sm:grid-cols-3 gap-4", children: [
          { k: "20+", v: "Years in tech & cybersecurity" },
          { k: "200+", v: "Brands & creators guided" },
          { k: "AI-Certified", v: "Strategist & consultant" }
        ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glow-card rounded-2xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl gold-text", children: s.k }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-[var(--espresso)]/70 mt-1", children: s.v })
        ] }, s.v)) })
      ] })
    ] })
  ] });
}
function FinalCTA() {
  const innerRef = useStaggerReveal(160);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative py-28 overflow-hidden bg-[var(--wine)] text-[oklch(0.97_0.015_80)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.78_0.13_80_/_0.3),transparent_60%)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-px", "aria-hidden": true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "0", y1: "0", x2: "100%", y2: "0", stroke: "url(#g)", strokeWidth: "1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "g", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#e8c46a", stopOpacity: "0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "#e8c46a", stopOpacity: "1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#e8c46a", stopOpacity: "0" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { className: "relative text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: innerRef, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { "data-stagger": true, className: "stagger-child w-8 h-8 mx-auto text-[var(--gold)] mb-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { "data-stagger": true, className: "stagger-child font-display text-4xl md:text-6xl max-w-3xl mx-auto leading-tight", children: [
        "Ready to weave your next digital idea into something ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "gold-text not-italic", children: "real" }),
        "?"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-stagger": true, className: "stagger-child mt-10 flex flex-wrap gap-4 justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#vault", className: "rounded-full bg-[var(--gold)] text-[var(--wine)] px-8 py-4 font-medium tracking-wide hover:scale-[1.03] transition shadow-[0_20px_50px_-15px_oklch(0.78_0.13_80_/_0.7)]", children: "Shop the Vault" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#studio", className: "rounded-full border border-[oklch(0.78_0.13_80_/_0.6)] px-8 py-4 font-medium tracking-wide hover:bg-[oklch(0.78_0.13_80_/_0.15)] transition", children: "Book a Session" })
      ] })
    ] }) })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "relative pt-20 pb-14 text-center text-sm text-[var(--muted-foreground)] tapestry-bg overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-6 mb-12 flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px thread-line" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "constellation-dot" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "constellation-dot", style: { opacity: 0.6 } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "constellation-dot" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px thread-line" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute left-1/2 top-24 -translate-x-1/2 w-56 h-56 opacity-[0.06] pointer-events-none",
        style: {
          background: "radial-gradient(circle at center, transparent 26%, oklch(0.42 0.16 25) 27% 30%, transparent 31% 44%, oklch(0.42 0.16 25) 45% 47%, transparent 48%)",
          borderRadius: "999px"
        },
        "aria-hidden": true
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-2xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-2xl md:text-3xl text-[var(--espresso)] italic leading-snug", children: [
        '"Excellence is ',
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gold-text not-italic", children: "woven" }),
        ', not assembled."'
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-[10px] tracking-[0.35em] uppercase text-[var(--gold)]", children: "— The Crimson Oracle" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-center gap-2 mt-12 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5 text-[var(--gold)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase tracking-[0.3em] text-xs", children: "The AI Vision Weaver" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "relative", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Mikini Williams. Woven with intention."
    ] })
  ] });
}
function Landing() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[var(--cream)] text-[var(--foreground)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Intro, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CursorSpotlight, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tapestry, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Vault, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Studio, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Oracle, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(About, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FinalCTA, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
const SplitComponent = Landing;
export {
  SplitComponent as component
};
