import { FieldRenderer } from "@/components/common/forms/FieldRenderer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Save } from "lucide-react";

export function PublicFormFields({ form, onNext }: any) {
  const fields = Array.isArray(form.fields) ? form.fields : [];

  return (
    <form onSubmit={onNext} className="space-y-10">
      {/* Section header */}
      <div className="flex items-end justify-between gap-6 border-b border-border pb-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Application
          </p>
          <h2 className="mt-1 font-display text-xl font-semibold tracking-tight">
            {fields.length} question{fields.length === 1 ? "" : "s"}
          </h2>
        </div>
        <p className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
          <Save className="size-3.5" />
          Auto-saved
        </p>
      </div>

      {/* Fields */}
      <div className="space-y-10">
        {fields.map((f: any, index: number) => (
          <FieldRenderer
            key={f.id}
            field={f}
            index={index + 1}
            variant="public"
          />
        ))}
      </div>

      {/* CTA */}
      <div className="flex flex-col-reverse items-stretch gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          Press <kbd className="rounded border border-border bg-secondary/50 px-1.5 py-0.5 text-[10px] font-medium">Enter</kbd> or click continue.
        </p>
        <Button
          size="lg"
          className="group h-12 rounded-md px-6 text-sm font-semibold"
          data-testid="public-form-continue-btn"
        >
          Continue
          <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </div>
    </form>
  );
}