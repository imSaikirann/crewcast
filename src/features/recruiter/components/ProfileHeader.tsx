import { HugeIcon } from "@/utils/hugeicons";

export default function ProfileHeader({ recruiter }: any) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {/* Left: Identity */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
          <HugeIcon name="office-building" className="w-7 h-7 text-primary" />
        </div>

        {/* Name + status */}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold">
              {recruiter.companyName}
            </h1>

            {recruiter.verified && (
              <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                <HugeIcon name="verified-checkmark" className="w-3 h-3 text-primary" />
                Verified
              </span>
            )}
          </div>

          <p className="text-sm text-muted-foreground">
            Recruiter account
          </p>
        </div>
      </div>

    </div>
  );
}

