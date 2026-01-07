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
              {recruiter.name}
            </h1>

            {recruiter.verified && (
              <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                <HugeIcon name="verified-checkmark" className="w-3 h-3" />
                Verified
              </span>
            )}
          </div>

          <p className="text-sm text-muted-foreground">
            Recruiter account
          </p>
        </div>
      </div>

      {/* Right: Primary action */}
      <div className="flex gap-2">
        <button className="px-4 py-2 rounded-lg border flex items-center gap-2">
          <HugeIcon name="edit" className="w-4 h-4" />
          Edit profile
        </button>

        <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground flex items-center gap-2">
          <HugeIcon name="add-circle" className="w-4 h-4" />
          Create Job
        </button>
      </div>
    </div>
  );
}
