import { Button } from "@/components/ui/button";

export function PublicFormReview({ form, answers = {}, onBack, onSubmit }: any) {
  return (
    <div className="space-y-4">
      {form.fields.map((f: any) => (
        <div key={f.id} className="flex justify-between">
          <span>{f.label}</span>
          <span className="text-muted-foreground">
            {answers[f.id] ?? "—"}
          </span>
        </div>
      ))}

      <div className="flex gap-2">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onSubmit}>Submit</Button>
      </div>
    </div>
  );
}
