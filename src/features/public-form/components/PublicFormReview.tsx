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
    <div className="space-y-8">
      <div className="rounded-lg border bg-card p-5 shadow-sm sm:p-6">
        <p className="text-sm text-muted-foreground">Final step</p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">
          Review your application
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Check your answers before sending them to the hiring team.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
        {form.fields.map((f: any) => (
          <div key={f.id} className="grid gap-2 border-b px-5 py-4 last:border-b-0 sm:grid-cols-[220px_1fr] sm:gap-8 sm:px-6">
            <span className="text-sm font-medium text-foreground">{f.label}</span>
            <span className="break-words text-sm text-muted-foreground sm:text-right">
              {formatAnswer(answers[f.id])}
            </span>
          </div>
        ))}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Application not submitted</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="rounded-lg border bg-card p-4 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-4">
        <Button variant="outline" onClick={onBack} disabled={loading} className="h-12 w-full rounded-md px-6 sm:w-auto">
          Back
        </Button>

        <Button onClick={onSubmit} disabled={loading} className="mt-3 h-12 w-full rounded-md px-6 sm:mt-0 sm:w-auto">
          {loading ? "Submitting..." : "Submit application"}
        </Button>
      </div>
    </div>
  );
}

function formatAnswer(value: unknown) {
  if (isResumeUpload(value)) return value.name;
  if (Array.isArray(value)) return value.join(", ");
  if (value === undefined || value === null || value === "") return "-";
  return String(value);
}

function isResumeUpload(value: unknown): value is { name: string } {
  return (
    !!value &&
    typeof value === "object" &&
    "name" in value &&
    typeof value.name === "string"
  );
}
