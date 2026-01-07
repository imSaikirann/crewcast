"use client";

import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { usePublicForm } from "@/features/hooks/usePublicForm";
import { getPublicFormStorageKey } from "../lib/storage";

import { PublicFormHeader } from "./PublicFormHeader";
import { PublicFormMeta } from "./PublicFormMeta";
import { PublicFormFields } from "./PublicFormFields";
import { PublicFormReview } from "./PublicFormReview";
import { PublicFormSuccess } from "./PublicFormSuccess";
import { PublicFormFooter } from "./PublicFormFooter";

export function PublicFormShell({ form }: { form: any }) {
  const { step, setStep, submit } = usePublicForm();
  const methods = useForm();
  const [hydrated, setHydrated] = useState(false);

  // 1. Restore
  useEffect(() => {
    const saved = localStorage.getItem(getPublicFormStorageKey(form.publicId));
    if (saved) {
      methods.reset(JSON.parse(saved));
    }
    setHydrated(true);
  }, [form.publicId]);

  // 2. Persist (only after restore)
  useEffect(() => {
    if (!hydrated) return;

    const sub = methods.watch((values) => {
      localStorage.setItem(
        getPublicFormStorageKey(form.publicId),
        JSON.stringify(values)
      );
    });

    return () => sub.unsubscribe();
  }, [hydrated, methods, form.publicId]);

  if(step === "done")
  {
    localStorage.removeItem(getPublicFormStorageKey(form.publicId));
  }

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-4 py-10 space-y-12">
          <PublicFormHeader recruiter={form.recruiter} />
          <PublicFormMeta form={form} />

          {step === "form" && (
            <PublicFormFields
              form={form}
              onNext={methods.handleSubmit(() => setStep("review"))}
            />
          )}

          {step === "review" && (
            <PublicFormReview
              form={form}
              answers={methods.getValues()}
              onBack={() => setStep("form")}
              onSubmit={() => submit(form.publicId, methods.getValues())}
            />
          )}

          {step === "done" && <PublicFormSuccess />}
        </div>

        <PublicFormFooter formPublicId={form.publicId} />
      </div>
    </FormProvider>
  );
}
