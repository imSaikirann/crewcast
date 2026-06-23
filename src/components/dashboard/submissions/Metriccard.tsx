type MetricCardProps = {
  label: string;
  value: number;
  helper: string;
};

export function MetricCard({ label, value, helper }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card px-5 py-4 transition-colors hover:border-[var(--border-strong)]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 font-mono text-3xl font-light tabular-nums text-foreground">
        {value.toLocaleString()}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{helper}</p>
      {/* Bottom accent: dark on light, light on dark */}
    </div>
  );
}

