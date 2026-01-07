import { CheckCircle } from "lucide-react";

export function PublicFormSuccess() {


  return (
    <div className="py-20 text-center space-y-4">
      <CheckCircle className="w-14 h-14 mx-auto text-green-600" />
      <h2 className="text-2xl font-semibold">Application submitted</h2>
      <p className="text-muted-foreground">
        Your response has been recorded.
      </p>
    </div>
  );
}
