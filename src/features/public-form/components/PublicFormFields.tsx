
import { FieldRenderer } from "@/components/common/forms/FieldRenderer";
import { Button } from "@/components/ui/button";

export function PublicFormFields({ form, onNext }: any) {
  const fields = Array.isArray(form.fields) ? form.fields : [];

  return (
    <form onSubmit={onNext}>
      <div className="mb-4 flex items-center justify-between gap-4 px-1">
        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Application
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {fields.length} question{fields.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {fields.map((f: any, index: number) => (
          <FieldRenderer
            key={f.id}
            field={f}
            index={index + 1}
            variant="public"
          />
        ))}
      </div>

      <div className="mt-5 rounded-lg border bg-card p-4 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-4">
        <p className="mb-3 text-sm text-muted-foreground sm:mb-0">
          Your answers are saved in this browser until you submit.
        </p>
        <Button size="lg" className="h-12 w-full rounded-md px-6 text-base font-semibold sm:w-auto">
          Review application
        </Button>
      </div>
    </form>
  );
}
