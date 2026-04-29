import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, AlertCircle, Paperclip } from "lucide-react";

export function PublicFormReview({
  form,
  answers,
  onBack,
  onSubmit,
  loading,
  error,
}: any) {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-border pb-3">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Final step
        </p>
        <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Review your application
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Double-check your answers before sending.
        </p>
      </div>

      {/* Answers */}
      <dl className="divide-y divide-border">
        {form.fields.map((f: any) => (
          <div
            key={f.id}
            className="grid gap-1 py-4 sm:grid-cols-[200px_1fr] sm:gap-8"
          >
            <dt className="text-sm font-medium text-foreground">{f.label}</dt>
            <dd className="break-words text-sm text-muted-foreground">
              {formatAnswer(answers[f.id])}
            </dd>
          </div>
        ))}
      </dl>

      {/* Error */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Application not submitted</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* CTAs */}
      <div className="flex flex-col-reverse items-stretch gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          disabled={loading}
          className="h-12 rounded-md px-4 text-sm font-medium text-muted-foreground hover:text-foreground"
          data-testid="review-back-btn"
        >
          <ArrowLeft className="mr-1.5 size-4" />
          Back to edit
        </Button>

        <Button
          onClick={onSubmit}
          disabled={loading}
          className="h-12 rounded-md px-6 text-sm font-semibold"
          data-testid="review-submit-btn"
        >
          {loading ? (
            "Submitting…"
          ) : (
            <>
              Submit application
              <Send className="ml-1.5 size-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

function formatAnswer(value: unknown) {
  if (isResumeUpload(value)) {
    return (
      <span className="inline-flex items-center gap-1.5">
        <Paperclip className="size-3.5" />
        {value.name}
      </span>
    );
  }
  if (Array.isArray(value)) return value.join(", ");
  if (value === undefined || value === null || value === "") return "—";
  return String(value);
}

function isResumeUpload(value: unknown): value is { name: string } {
  return (
    !!value &&
    typeof value === "object" &&
    "name" in value &&
    typeof (value as any).name === "string"
  );
}