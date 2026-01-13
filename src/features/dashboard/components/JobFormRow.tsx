import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/date";
import type { JobForm } from "../types/dashboard.types";
import { JobFormActionsMenu } from "./JobFormActionsMenu";

export function JobFormRow({ form }: { form: JobForm }) {
  return (
    <div className="flex items-start justify-between rounded-lg border p-4 hover:bg-muted/40 transition">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{form.title}</h3>
          {form.isActive && (
            <Badge className="bg-emerald-600 text-white">Active</Badge>
          )}
        </div>

        <p className="text-sm text-muted-foreground max-w-2xl">
          {form.description}
        </p>

        <div className="flex gap-4 text-xs text-muted-foreground">
          <span>{form.fieldsCount} fields</span>
          <span>Created {formatDate(form.createdAt)}</span>
          <span>Expires {formatDate(form.expiresAt)}</span>
        </div>
      </div>

      <JobFormActionsMenu />
    </div>
  );
}
