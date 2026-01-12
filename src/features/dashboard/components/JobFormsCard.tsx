import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { JobForm } from "../types/dashboard.types";
import { JobFormRow } from "./JobFormRow";

export function JobFormsCard({ forms }: { forms: JobForm[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Forms</CardTitle>
        <p className="text-sm text-muted-foreground">
          All job postings you’ve created
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {forms.map((form) => (
          <JobFormRow key={form.id} form={form} />
        ))}
      </CardContent>
    </Card>
  );
}
