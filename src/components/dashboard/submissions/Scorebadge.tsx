type ScoreBadgeProps = {
  score?: number;
};

export function ScoreBadge({ score }: ScoreBadgeProps) {
  if (typeof score !== "number") {
    return (
      <span className="text-xs text-zinc-400 dark:text-zinc-600">—</span>
    );
  }

  const rounded = Math.round(score);
  const pct = Math.min(100, Math.max(0, rounded));

  const color =
    pct >= 80
      ? "text-emerald-600 dark:text-emerald-400"
      : pct >= 60
        ? "text-amber-600 dark:text-amber-400"
        : "text-red-600 dark:text-red-400";

  // Track uses a dimmer dark variant so it doesn't overpower the dark bg
  const trackFill =
    pct >= 80
      ? "bg-emerald-500 dark:bg-emerald-500/70"
      : pct >= 60
        ? "bg-amber-500 dark:bg-amber-500/70"
        : "bg-red-500 dark:bg-red-500/70";

  return (
    <div className="flex items-center gap-2">
      {/* Track */}
      <div className="h-1 w-12 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div
          className={`h-full rounded-full transition-all ${trackFill}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {/* Number */}
      <span className={`font-mono text-xs font-medium tabular-nums ${color}`}>
        {rounded}
      </span>
    </div>
  );
}