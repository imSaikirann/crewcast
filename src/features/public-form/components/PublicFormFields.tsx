
import { FieldRenderer } from "@/components/common/forms/FieldRenderer";
import { Button } from "@/components/ui/button";

export function PublicFormFields({ form, onNext }: any) {
  return (
    <form onSubmit={onNext} className="rounded-xl border bg-card p-5">
      <h2 className="font-display text-lg font-semibold">Your application</h2>
      <div className="mt-6 space-y-6">
        {form.fields.map((f: any) => (
          <FieldRenderer key={f.id} field={f} />
        ))}
      </div>

      <div className="mt-6 border-t pt-6">
        <Button size="lg" className="h-12 w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
          Submit Application
        </Button>
        <p className="mt-3 text-center text-[11px] text-muted-foreground">
          Your information is handled securely. <span className="text-primary">View privacy policy.</span>
        </p>
      </div>
    </form>
  );
}
