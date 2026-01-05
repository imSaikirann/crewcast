import { useState } from "react";

export type Step = "form" | "review" | "done";

export function usePublicForm() {
  const [step, setStep] = useState<Step>("form");

  const submit = async (publicId: string, values: any) => {
    await fetch(`/api/public/forms/${publicId}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: values }),
    });

    setStep("done");
  };

  return { step, setStep, submit };
}
