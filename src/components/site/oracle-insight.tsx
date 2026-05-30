import { Sparkles } from "lucide-react";

// Small, restrained callout that places the Oracle's voice between sections.
// Visual treatment intentionally matches the existing glow-card vocabulary so
// it reads as part of the brand, not a popup.
export function OracleInsight({
  body,
  title = "Oracle Insight",
  align = "left",
}: {
  body: string;
  title?: string;
  align?: "left" | "right" | "center";
}) {
  const alignClass =
    align === "right" ? "ml-auto" : align === "center" ? "mx-auto" : "mr-auto";

  return (
    <div
      className={`oracle-insight max-w-md ${alignClass} my-12 md:my-16 relative`}
      role="note"
    >
      <div className="glow-card relative rounded-2xl px-5 py-4 flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--wine)] text-[var(--gold)]">
          <Sparkles className="h-3.5 w-3.5" />
        </span>
        <div className="flex flex-col leading-snug">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">
            {title}
          </span>
          <p className="mt-1 font-display italic text-[var(--espresso)] text-base md:text-lg">
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}
