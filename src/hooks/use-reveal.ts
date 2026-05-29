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
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  step = 120,
  offset = 0
) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const children = Array.from(el.querySelectorAll<HTMLElement>("[data-stagger]"));
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
