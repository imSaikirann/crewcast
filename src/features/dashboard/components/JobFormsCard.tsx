import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { JobForm } from "../types/dashboard.types";
import { JobFormRow } from "./JobFormRow";

export function JobFormsCard({ forms }: { forms: JobForm[] }) {
  return (
    <Card className="border-muted-foreground/15">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>Job Forms</CardTitle>
          <p className="text-sm text-muted-foreground">
            All job postings you have created
          </p>
        </div>
        <p className="rounded-md bg-muted px-3 py-1 text-sm font-medium">
          {forms.length} total
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {forms.length === 0 ? (
          <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
            No forms yet. Create your first job form from the sidebar.
          </div>
        ) : (
          forms.map((form) => <JobFormRow key={form.id} form={form} />)
        )}
      </CardContent>
    </Card>
  );
}
