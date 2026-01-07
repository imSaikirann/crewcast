import { HugeIcon } from "@/utils/hugeicons";

export default function PlanUsageCard({ plan }: any) {
  const activePct = (plan.activeForms / plan.activeLimit) * 100;
  const totalPct = (plan.totalForms / plan.totalLimit) * 100;

  return (
    <div className="rounded-xl border bg-background p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <HugeIcon name="credit-card" className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="font-semibold">{plan.name} Plan</p>
          <p className="text-xs text-muted-foreground">Usage</p>
        </div>
      </div>

      <div className="space-y-4 text-sm">
        <div>
          <div className="flex justify-between mb-1">
            <span>Active forms</span>
            <span>{plan.activeForms}/{plan.activeLimit}</span>
          </div>
          <div className="h-2 rounded bg-muted">
            <div className="h-2 rounded bg-primary" style={{ width: `${activePct}%` }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span>Total forms</span>
            <span>{plan.totalForms}/{plan.totalLimit}</span>
          </div>
          <div className="h-2 rounded bg-muted">
            <div className="h-2 rounded bg-primary" style={{ width: `${totalPct}%` }} />
          </div>
        </div>
      </div>

      <button className="w-full mt-2 py-2 rounded-lg bg-primary text-primary-foreground">
        Upgrade Plan
      </button>
    </div>
  );
}
