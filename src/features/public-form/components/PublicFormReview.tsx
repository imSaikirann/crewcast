import { Button } from "@/components/ui/button";
import { usePublicForm } from "@/features/hooks/usePublicForm";

export function PublicFormReview({ form, answers, onBack, onSubmit }: any) {
  const { loading, error } = usePublicForm(); 

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

      {error && (
        <p className="text-sm text-red-600 text-center">{error}</p>
      )}

      <div className="flex gap-2">
        <Button variant="outline" onClick={onBack} disabled={loading}>
          Back
        </Button>

        <Button onClick={onSubmit} disabled={loading}>
          {loading ? "Submitting…" : "Submit"}
        </Button>
      </div>
    </div>
  );
}
