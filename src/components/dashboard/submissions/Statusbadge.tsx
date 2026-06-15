type StatusBadgeProps = {
  status: string;
};

const STATUS_CONFIG: Record<string, { bg: string; text: string; dot: string }> = {
  HIRED: {
    bg: "bg-emerald-50 dark:bg-emerald-950/50",
    text: "text-emerald-700 dark:text-emerald-400",
    dot: "bg-emerald-500 dark:bg-emerald-400",
  },
  REJECTED: {
    bg: "bg-red-50 dark:bg-red-950/50",
    text: "text-red-600 dark:text-red-400",
    dot: "bg-red-500 dark:bg-red-400",
  },
  APPLIED: {
    bg: "bg-zinc-100 dark:bg-zinc-800",
    text: "text-zinc-600 dark:text-zinc-400",
    dot: "bg-zinc-400 dark:bg-zinc-500",
  },
  INTERVIEWING: {
    bg: "bg-blue-50 dark:bg-blue-950/50",
    text: "text-blue-600 dark:text-blue-400",
    dot: "bg-blue-500 dark:bg-blue-400",
  },
  OFFER_SENT: {
    bg: "bg-violet-50 dark:bg-violet-950/50",
    text: "text-violet-600 dark:text-violet-400",
    dot: "bg-violet-500 dark:bg-violet-400",
  },
};

function formatLabel(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0) + part.slice(1).toLowerCase())
    .join(" ");
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.APPLIED;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${config.bg} ${config.text}`}
    >
      <span className={`size-1.5 shrink-0 rounded-full ${config.dot}`} />
      {formatLabel(status)}
    </span>
  );
}