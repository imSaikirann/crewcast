import { HugeIcon, type HugeIconName } from "@/utils/hugeicons";

export function StatCard({
  title,
  value,
  intent,
  icon = "analytics-up",
}: {
  title: string;
  value: number | string;
  intent?: "primary";
  icon?: HugeIconName;
}) {
  return (
    <div className="rounded-lg border border-border/60 bg-card px-4 py-4 transition-colors hover:bg-secondary/40">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </p>
        <div className="grid size-7 shrink-0 place-items-center rounded-md bg-secondary text-muted-foreground">
          <HugeIcon name={icon} className="size-3.5" />
        </div>
      </div>
      <p
        className={`mt-2 font-display text-2xl font-semibold tracking-tight ${
          intent === "primary" ? "text-primary" : "text-foreground"
        }`}
      >
        {value}
      </p>
    </div>
  );
}