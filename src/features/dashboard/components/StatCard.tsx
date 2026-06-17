import { type HugeIconName } from "@/utils/hugeicons";

export function StatCard({
  title,
  value,
  intent,
}: {
  title: string;
  value: number | string;
  intent?: "primary";
  /** Deprecated: icons removed in the minimal redesign. Kept for call-site compatibility. */
  icon?: HugeIconName;
}) {
  return (
    <div className="px-4 py-4">
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {title}
      </p>
      <p
        className={`mt-1.5 text-2xl font-semibold tracking-tight tabular-nums ${
          intent === "primary" ? "text-primary" : "text-foreground"
        }`}
      >
        {value}
      </p>
    </div>
  );
}