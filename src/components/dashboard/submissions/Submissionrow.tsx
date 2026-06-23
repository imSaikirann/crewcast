import Link from "next/link";
import { formatDateTime } from "@/utils/date";
import { StatusBadge } from "./Statusbadge";
import { ScoreBadge } from "./Scorebadge";

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

function formatLabel(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0) + part.slice(1).toLowerCase())
    .join(" ");
}

export function SubmissionRow({
  submission,
  gridClassName,
}: {
  submission: RecentSubmission;
  gridClassName: string; // passed from SubmissionsTable â€” keeps header & row in sync
}) {
  return (
    <Link
      href={`/dashboard/submissions/${submission.form.publicId}`}
      className={`${gridClassName} py-3 text-sm transition-colors hover:bg-muted/60 dark:hover:bg-muted/60`}
    >
      {/* Col 1 â€” Candidate */}
      <div className="min-w-0">
        <p className="truncate font-medium text-foreground dark:text-foreground">
          {submission.fullName}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {submission.email}
        </p>
      </div>

      {/* Col 2 â€” Position */}
      <div className="min-w-0">
        <p className="truncate text-foreground">
          {submission.form.title}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatLabel(submission.form.roleType)}
        </p>
      </div>

      {/* Col 3 â€” Status */}
      <div>
        <StatusBadge status={submission.status} />
      </div>

      {/* Col 4 â€” Score */}
      <div>
        <ScoreBadge score={submission.score} />
      </div>

      {/* Col 5 â€” Date */}
      <p className="text-right text-xs tabular-nums text-muted-foreground">
        {formatDateTime(submission.createdAt)}
      </p>
    </Link>
  );
}

