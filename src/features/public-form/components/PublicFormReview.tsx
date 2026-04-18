import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function PublicFormReview({
  form,
  answers,
  onBack,
  onSubmit,
  loading,
  error,
}: any) {
  return (
    <div className="space-y-4">
      {form.fields.map((f: any) => (
        <div key={f.id} className="flex justify-between gap-6">
          <span>{f.label}</span>
          <span className="text-right text-muted-foreground">
            {formatAnswer(answers[f.id])}
          </span>
        </div>
      ))}

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Application not submitted</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-2">
        <Button variant="outline" onClick={onBack} disabled={loading}>
          Back
        </Button>

        <Button onClick={onSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
}

function formatAnswer(value: unknown) {
  if (Array.isArray(value)) return value.join(", ");
  if (value === undefined || value === null || value === "") return "-";
  return String(value);
}
