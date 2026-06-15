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
  gridClassName: string; // passed from SubmissionsTable — keeps header & row in sync
}) {
  return (
    <Link
      href={`/dashboard/submissions/${submission.form.publicId}`}
      className={`${gridClassName} py-3 text-sm transition-colors hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40`}
    >
      {/* Col 1 — Candidate */}
      <div className="min-w-0">
        <p className="truncate font-medium text-zinc-900 dark:text-zinc-100">
          {submission.fullName}
        </p>
        <p className="truncate text-xs text-zinc-400 dark:text-zinc-500">
          {submission.email}
        </p>
      </div>

      {/* Col 2 — Position */}
      <div className="min-w-0">
        <p className="truncate text-zinc-700 dark:text-zinc-300">
          {submission.form.title}
        </p>
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          {formatLabel(submission.form.roleType)}
        </p>
      </div>

      {/* Col 3 — Status */}
      <div>
        <StatusBadge status={submission.status} />
      </div>

      {/* Col 4 — Score */}
      <div>
        <ScoreBadge score={submission.score} />
      </div>

      {/* Col 5 — Date */}
      <p className="text-right text-xs tabular-nums text-zinc-400 dark:text-zinc-500">
        {formatDateTime(submission.createdAt)}
      </p>
    </Link>
  );
}