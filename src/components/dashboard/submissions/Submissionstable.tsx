import { SubmissionRow } from "./Submissionrow";

type RecentSubmission = {
  id: string;
  fullName: string;
  email: string;
  status: string;
  createdAt: string;
  score?: number;
  form: {
    title: string;
    publicId: string;
    roleType: string;
  };
};

// Single source of truth â€” passed to every row so header & data always align
export const TABLE_GRID =
  "grid grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)_110px_120px_100px] items-center gap-x-4 px-4";

// Fixed: dark is zinc-500 not zinc-600 â€” legible on zinc-900 bg
const COL_HEADER =
  "text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground";

export function SubmissionsTable({ submissions }: { submissions: RecentSubmission[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card dark:border-border ">

      {/* Header */}
      <div className={`${TABLE_GRID} border-b border-border py-2.5 dark:border-border`}>
        <span className={COL_HEADER}>Candidate</span>
        <span className={COL_HEADER}>Position</span>
        <span className={COL_HEADER}>Status</span>
        <span className={COL_HEADER}>Score</span>
        <span className={`${COL_HEADER} text-right`}>Applied</span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-border dark:divide-border">
        {submissions.map((s) => (
          <SubmissionRow key={s.id} submission={s} gridClassName={TABLE_GRID} />
        ))}
      </div>

    </div>
  );
}

