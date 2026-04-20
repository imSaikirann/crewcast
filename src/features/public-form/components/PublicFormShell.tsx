"use client";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { usePublicForm } from "@/features/hooks/usePublicForm";
import { getPublicFormStorageKey } from "../lib/storage";

import { PublicFormFields } from "./PublicFormFields";
import { PublicFormMeta } from "./PublicFormMeta";
import { PublicFormReview } from "./PublicFormReview";
import { PublicFormSuccess } from "./PublicFormSuccess";

export function PublicFormShell({ form }: { form: any }) {
  const { step, setStep, submit, loading, error } = usePublicForm();
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
      <main className="min-h-screen bg-background px-4 py-8">
        <div className="mx-auto max-w-[600px] space-y-6">
          <header className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-display font-semibold text-foreground">Crewcast</span>
            <span>Powered by Crewcast</span>
          </header>

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
              loading={loading}
              error={error}
            />
          )}

          {step === "done" && <PublicFormSuccess />}
        </div>
      </main>
    </FormProvider>
  );
}
