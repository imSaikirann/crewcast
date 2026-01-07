import { HugeIcon } from "@/utils/hugeicons";

export default function ProfileActions() {
  return (
    <div className="rounded-xl border bg-background p-4 flex flex-wrap gap-3">
      <button className="flex items-center gap-2 px-4 py-2 border rounded-lg">
        <HugeIcon name="plus" className="w-4 h-4" />
        Create Job
      </button>

      <button className="flex items-center gap-2 px-4 py-2 border rounded-lg">
        <HugeIcon name="document-text" className="w-4 h-4" />
        View Applications
      </button>

      <button className="flex items-center gap-2 px-4 py-2 border rounded-lg">
        <HugeIcon name="check-badge" className="w-4 h-4" />
        Verify Profile
      </button>
    </div>
  );
}
