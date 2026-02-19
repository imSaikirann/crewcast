"use client"

import { FormProvider, useForm } from "react-hook-form"
import { jobFields } from "../data/jobFields"
import { JobFormDetails } from "../types/types"
import { FieldRenderer } from "@/components/common/forms/FieldRenderer"

export function FormDetailsStep({
  values,
  onNext,
}: {
  values: JobFormDetails
  onNext: (v: JobFormDetails) => void
}) {
  const form = useForm<JobFormDetails>({ defaultValues: values })

  const submit = (data: any) => {
    onNext({
      ...data,
      techStack: data.techStack
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean),
    })
  }

  return (
    <FormProvider {...form}>
      <form id="step1-form" onSubmit={form.handleSubmit(submit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobFields.map(field => (
            <div
              key={field.id}
              className={
                field.type === "textarea" || field.id === "formTitle"
                  ? "md:col-span-2"
                  : ""
              }
            >
              <FieldRenderer field={field} />
            </div>
          ))}
        </div>
      </form>
    </FormProvider>
  )
}

