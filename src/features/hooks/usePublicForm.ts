import { useState } from "react";
import { getPublicFormStorageKey } from "@/features/public-form/lib/storage";

export type PublicFormStep = "form" | "review" | "done";

export function usePublicForm() {
  const [step, setStep] = useState<PublicFormStep>("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    trackingUrl?: string;
    applicationId?: string;
  } | null>(null);

  const submit = async (publicId: string, values: Record<string, any>) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/forms/${publicId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }

      // Clear draft
      localStorage.removeItem(getPublicFormStorageKey(publicId));
      setResult({
        trackingUrl: data.trackingUrl,
        applicationId: data.id,
      });

      setStep("done");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    step,
    setStep,
    submit,
    loading,
    error,
    result,
  };
}
