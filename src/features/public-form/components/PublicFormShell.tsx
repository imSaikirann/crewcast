"use client";

import { usePublicForm } from "@/features/hooks/usePublicForm";
import { useForm, FormProvider } from "react-hook-form";

import { PublicFormHeader } from "./PublicFormHeader";
import { PublicFormMeta } from "./PublicFormMeta";
import { PublicFormFields } from "./PublicFormFields";
import { PublicFormReview } from "./PublicFormReview";
import { PublicFormSuccess } from "./PublicFormSuccess";
import { PublicFormFooter } from "./PublicFormFooter";

export function PublicFormShell({ form }: { form: any }) {
  const { step, setStep, submit } = usePublicForm();
  const methods = useForm();

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
              onBack={() => setStep("form")}
              onSubmit={() => submit(form.publicId, methods.getValues())}
            />
          )}

          {step === "done" && <PublicFormSuccess />}
        </div>

        <PublicFormFooter />
      </div>
    </FormProvider>
  );
}
