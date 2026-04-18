import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/date";
import type { JobForm } from "../types/dashboard.types";
import { JobFormActionsMenu } from "./JobFormActionsMenu";

export function JobFormRow({ form }: { form: JobForm }) {
  return (
    <div className="grid gap-4 rounded-lg border bg-background p-4 transition hover:bg-muted/30 lg:grid-cols-[1fr_auto]">
      <div className="min-w-0 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="truncate text-base font-semibold">{form.title}</h3>
          {form.isActive && (
            <Badge className="bg-emerald-600 text-white">Active</Badge>
          )}
          {!form.isActive && (
            <Badge variant="secondary">{form.status.toLowerCase()}</Badge>
          )}
        </div>

        <p className="max-w-2xl text-sm text-muted-foreground">
          {form.description}
        </p>

        <div className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-2 xl:grid-cols-5">
          <Metric label="Fields" value={form.fieldsCount} />
          <Metric label="Views" value={form.views} />
          <Metric label="Applications" value={form.submissions} />
          <Metric label="Created" value={formatDate(form.createdAt)} />
          <Metric label="Expires" value={formatDate(form.expiresAt)} />
        </div>
      </div>

      <div className="flex items-center justify-end">
        <JobFormActionsMenu publicId={form.publicId} />
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md bg-muted/60 px-3 py-2">
      <p className="font-medium text-foreground">{value}</p>
      <p>{label}</p>
    </div>
  );
}
