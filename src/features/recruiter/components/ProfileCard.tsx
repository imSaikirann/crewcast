import { HugeIcon } from "@/utils/hugeicons";

export default function ProfileCard({ recruiter }: any) {
  return (
    <div className="rounded-xl border bg-background p-6 space-y-4">
      <div className="flex items-center gap-3">
    
        <div>
          <p className="font-semibold">{recruiter.name}</p>
          <p className="text-xs text-muted-foreground">Company</p>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-3">
          <HugeIcon name="mail" className="w-4 h-4 text-muted-foreground" />
          <span>{recruiter.email}</span>
        </div>

        <div className="flex items-center gap-3">
          <HugeIcon name="global" className="w-4 h-4 text-muted-foreground" />
          <a href={recruiter.website} className="underline">
            {recruiter.website}
          </a>
        </div>
      </div>
    </div>
  );
}
