type MetricCardProps = {
  label: string;
  value: number;
  helper: string;
};

export function MetricCard({ label, value, helper }: MetricCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-zinc-100 bg-white px-5 py-4 transition-all hover:border-zinc-200 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:shadow-none">
      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
        {label}
      </p>
      <p className="mt-2 font-mono text-3xl font-light tabular-nums text-zinc-900 dark:text-zinc-50">
        {value.toLocaleString()}
      </p>
      <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">{helper}</p>
      {/* Bottom accent: dark on light, light on dark */}
      <span className="absolute bottom-0 left-0 h-px w-0 bg-zinc-900 transition-all duration-300 group-hover:w-full dark:bg-zinc-400" />
    </div>
  );
}