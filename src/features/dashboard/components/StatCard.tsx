import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="overflow-hidden rounded-lg border-muted-foreground/15 py-5 shadow-xs transition duration-120 hover:-translate-y-0.5 hover:bg-secondary/40 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between gap-4 pb-1">
        <CardTitle className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </CardTitle>
        <div className="grid size-8 place-items-center rounded-lg bg-secondary text-muted-foreground">
          <HugeIcon name={icon} className="size-4" />
        </div>
      </CardHeader>
      <CardContent>
        <p
          className={`font-display text-[28px] font-semibold tracking-tight ${
            intent === "primary" ? "text-primary" : ""
          }`}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
