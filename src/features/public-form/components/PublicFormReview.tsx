import { Button } from "@/components/ui/button";

export function PublicFormReview({ form, answers, setStep, submit }: any) {
  return (
    <div className="space-y-4">
      {form.fields.map((f: any) => (
        <div key={f.id} className="flex justify-between">
          <span>{f.label}</span>
          <span>{answers[f.id]}</span>
        </div>
      ))}

      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setStep("form")}>
          Back
        </Button>
        <Button onClick={submit}>Submit</Button>
      </div>
    </div>
  );
}
