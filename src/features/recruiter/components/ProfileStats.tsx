import { HugeIcon } from "@/utils/hugeicons";

export default function ProfileStats({ recruiter }: any) {
  return (
    <div className="rounded-xl border bg-background p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <HugeIcon name="analytics-up" className="w-5 h-5 text-primary" />
        </div>
        <p className="font-semibold">Performance</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-muted-foreground">Jobs</p>
          <p className="text-xl font-semibold">{recruiter.totalJobs}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Applications</p>
          <p className="text-xl font-semibold">{recruiter.totalApplications}</p>
        </div>
      </div>
    </div>
  );
}

