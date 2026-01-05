import { FieldRenderer } from "./FieldRenderer";
import { Button } from "@/components/ui/button";

export function PublicFormFields({ form, onNext }: any) {
  return (
    <form onSubmit={onNext} className="space-y-10">
      <div className="space-y-8">
        {form.fields.map((f: any) => (
          <FieldRenderer key={f.id} field={f} />
        ))}
      </div>

      <div className="pt-6 border-t">
        <Button size="lg" className="w-full py-6 text-base">
          Continue →
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-3">
          Takes less than 2 minutes
        </p>
      </div>
    </form>
  );
}
