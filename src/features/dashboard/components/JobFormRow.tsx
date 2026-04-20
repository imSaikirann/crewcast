import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/date";
import type { JobForm } from "../types/dashboard.types";
import { JobFormActionsMenu } from "./JobFormActionsMenu";

export function JobFormRow({ form }: { form: JobForm }) {
  const expired = new Date(form.expiresAt) < new Date();
  const status = form.isActive ? "Active" : expired ? "Expired" : "Draft";

  return (
    <div className="grid items-center gap-3 rounded-xl border bg-card px-4 py-3 text-sm transition duration-120 hover:-translate-y-0.5 hover:bg-secondary/60 md:grid-cols-[minmax(0,1.5fr)_auto_auto_auto_auto_36px]">
      <div className="min-w-0">
        <h3 className="truncate font-semibold text-foreground">{form.title}</h3>
        <p className="mt-0.5 truncate text-xs text-muted-foreground md:hidden">
          {form.domainTitle || "General"} · {form.submissions} applications · {formatDate(form.createdAt)}
        </p>
      </div>
      <Badge className="w-fit rounded-full border-0 bg-accent px-2.5 py-1 text-[11px] text-accent-foreground hover:bg-accent">
        {form.domainTitle || "General"}
      </Badge>
      <StatusBadge status={status} />
      <p className="hidden text-muted-foreground md:block">{form.submissions} apps</p>
      <p className="hidden text-muted-foreground md:block">{formatDate(form.createdAt)}</p>
      <div className="flex justify-end">
        <JobFormActionsMenu publicId={form.publicId} />
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: "Active" | "Draft" | "Expired" }) {
  const className =
    status === "Active"
      ? "bg-[#4CAF82]/10 text-[#4CAF82]"
      : status === "Expired"
        ? "bg-destructive/10 text-destructive"
        : "bg-muted text-muted-foreground";

  return (
    <span className={`w-fit rounded-full px-2.5 py-1 text-[11px] font-medium ${className}`}>
      {status}
    </span>
  );
}
