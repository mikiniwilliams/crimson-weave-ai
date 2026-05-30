import { useEffect, useRef } from "react";

export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

// Cascades [data-stagger] children in sequence when the container enters the viewport.
// `trigger` re-runs the observer when children appear after async data loads
// (e.g. the Vault reads products from Supabase).
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  step = 120,
  offset = 0,
  trigger?: unknown
) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const children = Array.from(el.querySelectorAll<HTMLElement>("[data-stagger]"));
    if (children.length === 0) return;

    // If the container is already in view (common when async data lands after
    // first scroll), apply stagger immediately so cards aren't stuck at opacity 0.
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      children.forEach((child, i) => {
        child.style.setProperty("--delay", `${offset + i * step}ms`);
        child.classList.add("stagger-in");
      });
      return;
    }

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
  }, [step, offset, trigger]);
  return ref;
}
