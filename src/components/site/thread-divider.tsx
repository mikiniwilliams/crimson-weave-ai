export function ThreadDivider({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-4 my-16 px-6">
      <div className="flex-1 max-w-xs h-px thread-line" />
      <div className="flex items-center gap-2 text-[var(--gold)]">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] node-pulse" />
        {label && (
          <span className="uppercase tracking-[0.3em] text-[10px] text-[var(--muted-foreground)]">
            {label}
          </span>
        )}
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] node-pulse" />
      </div>
      <div className="flex-1 max-w-xs h-px thread-line" />
    </div>
  );
}
