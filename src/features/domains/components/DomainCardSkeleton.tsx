export function DomainCardSkeleton() {
  return (
    <div
      className="flex h-full flex-col rounded-lg border border-border bg-card p-5"
      aria-hidden="true"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <Shimmer className="size-9 rounded-md" />
        <Shimmer className="h-5 w-16 rounded-full" />
      </div>

      {/* Title + description */}
      <div className="mt-5 space-y-2">
        <Shimmer className="h-4 w-3/5 rounded" />
        <Shimmer className="h-3 w-full rounded" />
        <Shimmer className="h-3 w-4/5 rounded" />
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-border pt-3">
        <Shimmer className="h-3 w-20 rounded" />
        <Shimmer className="h-3 w-12 rounded" />
      </div>
    </div>
  );
}

/**
 * Token-driven shimmer that adapts to light + dark themes.
 * Uses `bg-muted` (subtle) with `animate-pulse` â€” no hardcoded grays.
 */
function Shimmer({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-muted ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-foreground/[0.04] to-transparent" />
    </div>
  );
}

