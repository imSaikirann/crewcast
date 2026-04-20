import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HugeIcon, type HugeIconName } from "@/utils/hugeicons";

export function StatCard({
  title,
  value,
  delta,
  intent,
  icon = "analytics-up",
}: {
  title: string;
  value: number | string;
  delta?: string;
  intent?: "primary";
  icon?: HugeIconName;
}) {
  const positive = !delta?.startsWith("-");

  return (
    <Card className="overflow-hidden rounded-xl border-muted-foreground/15 shadow-xs transition duration-120 hover:-translate-y-0.5 hover:bg-secondary/40 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between gap-4 pb-1">
        <CardTitle className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </CardTitle>
        <div className="grid size-8 place-items-center rounded-lg bg-secondary text-muted-foreground">
          <HugeIcon name={icon} className="size-4" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className={`font-display text-[28px] font-semibold tracking-tight ${intent === "primary" ? "text-primary" : ""}`}>
          {value}
        </p>
        {delta && (
          <p className={positive ? "text-xs text-[#4CAF82]" : "text-xs text-destructive"}>
            {positive ? "↑" : "↓"} {delta} last 30 days
          </p>
        )}
      </CardContent>
    </Card>
  );
}
