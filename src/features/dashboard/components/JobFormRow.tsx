import { formatDate } from "@/utils/date";

import type { JobForm } from "../types/dashboard.types";
import { JobFormActionsMenu } from "./JobFormActionsMenu";

export function JobFormRow({ form }: { form: JobForm }) {
  const expired = new Date(form.expiresAt) < new Date();
  const status = getDisplayStatus(form.status, expired);

  return (
    <div className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/30 md:grid md:grid-cols-[minmax(0,1.5fr)_auto_auto_auto_auto_auto_36px]">
      {/* Title + mobile meta */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-medium text-foreground">{form.title}</h3>
        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 md:hidden">
          <span className="text-xs text-muted-foreground">{form.domainTitle || "General"}</span>
          <span className="text-xs text-muted-foreground">·</span>
          <StatusBadge status={status} />
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">{form.submissions} apps</span>
        </div>
      </div>

      {/* Desktop-only columns */}
      <span className="hidden truncate text-xs text-muted-foreground md:block">
        {form.domainTitle || "General"}
      </span>
      <span className="hidden md:block">
        <StatusBadge status={status} />
      </span>
      <p className="hidden text-sm font-medium text-foreground md:block">
        {form.hiredCount}/{form.openings} hired
      </p>
      <p className="hidden text-sm text-muted-foreground md:block">{form.submissions} apps</p>
      <p className="hidden text-sm text-muted-foreground md:block">{formatDate(form.createdAt)}</p>

      {/* Actions */}
      <div className="flex shrink-0 justify-end">
        <JobFormActionsMenu publicId={form.publicId} status={form.status} expired={expired} />
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: "Published" | "Draft" | "Expired" | "Archived" }) {
  const cls =
    status === "Published"
      ? "bg-[#4CAF82]/10 text-[#4CAF82]"
      : status === "Expired"
        ? "bg-destructive/10 text-destructive"
        : "bg-muted text-muted-foreground";

  return (
    <span className={`inline-flex w-fit rounded-full px-2 py-0.5 text-[11px] font-medium ${cls}`}>
      {status}
    </span>
  );
}

function getDisplayStatus(status: string, expired: boolean) {
  if (status === "ARCHIVED") return "Archived";
  if (expired) return "Expired";
  if (status === "PUBLISHED") return "Published";
  return "Draft";
}