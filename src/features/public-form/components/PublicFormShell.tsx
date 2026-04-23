"use client";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { usePublicForm } from "@/features/hooks/usePublicForm";
import { getPublicFormStorageKey } from "../lib/storage";

import { PublicFormFields } from "./PublicFormFields";
import { PublicFormFooter } from "./PublicFormFooter";
import { PublicFormMeta } from "./PublicFormMeta";
import { PublicFormReview } from "./PublicFormReview";
import { PublicFormSuccess } from "./PublicFormSuccess";

export function PublicFormShell({ form }: { form: any }) {
  const { step, setStep, submit, loading, error, result } = usePublicForm();
  const methods = useForm();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(getPublicFormStorageKey(form.publicId));
    if (saved) methods.reset(JSON.parse(saved));
    setHydrated(true);
  }, [form.publicId, methods]);

  useEffect(() => {
    if (!hydrated) return;

    const sub = methods.watch((values) => {
      localStorage.setItem(getPublicFormStorageKey(form.publicId), JSON.stringify(values));
    });

    return () => sub.unsubscribe();
  }, [hydrated, methods, form.publicId]);

  if (step === "done") {
    localStorage.removeItem(getPublicFormStorageKey(form.publicId));
  }

  return (
    <FormProvider {...methods}>
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto flex min-h-screen w-full max-w-[880px] flex-col px-4 py-6 sm:px-6 lg:px-0">
          <div className="flex-1 py-8 sm:py-12">
            <PublicFormMeta form={form} />

            <div className="mt-8 sm:mt-10">
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
                  loading={loading}
                  error={error}
                />
              )}

              {step === "done" && <PublicFormSuccess trackingUrl={result?.trackingUrl} />}
            </div>
          </div>

          <PublicFormFooter formPublicId={form.publicId} />
        </div>
      </main>
    </FormProvider>
  );
}
