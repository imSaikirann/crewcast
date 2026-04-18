import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HugeIcon, type HugeIconName } from "@/utils/hugeicons";

export function StatCard({
  title,
  value,
  helper,
  icon = "analytics-up",
}: {
  title: string;
  value: number | string;
  helper?: string;
  icon?: HugeIconName;
}) {
  return (
    <Card className="overflow-hidden border-muted-foreground/15">
      <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="grid size-9 place-items-center rounded-md bg-muted text-foreground">
          <HugeIcon name={icon} className="size-4" />
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        <p className="text-3xl font-bold">{value}</p>
        {helper && <p className="text-xs text-muted-foreground">{helper}</p>}
      </CardContent>
    </Card>
  );
}
