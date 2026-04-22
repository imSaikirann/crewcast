"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { HugeIcon } from "@/utils/hugeicons"
import { FieldType, FormField, JobFormDetails } from "../types/types"
import { FormBuilderStep } from "./FormBuilderStep"
import { FormDetailsStep } from "./FormDetailsStep"

export function MultiStepForm(props: {
  details: JobFormDetails
  updateDetails: (k: keyof JobFormDetails, v: any) => void
  fields: FormField[]
  selectedFieldType: FieldType
  setSelectedFieldType: (t: FieldType) => void
  addField: (index?: number, typeOverride?: FieldType) => void
  updateField: (id: string, u: Partial<FormField>) => void
  removeField: (id: string) => void
  reorderField: (fromId: string, toId: string) => void
  addOption: (id: string, v: string) => void
  removeOption: (id: string, i: number) => void
  onSave: () => Promise<void>
  isSaving: boolean
  hasLocalDraft: boolean
  resetDraft: () => void
}) {
  const [step, setStep] = useState<1 | 2>(1)

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Form builder
          </p>
          <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight">
            Create job form
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Drafts save automatically in this browser while you build.
          </p>
        </div>
        {props.hasLocalDraft && (
          <Button type="button" variant="outline" onClick={props.resetDraft} disabled={props.isSaving}>
            Clear saved draft
          </Button>
        )}
      </header>

      <div className="mx-auto flex max-w-[760px] items-end gap-3">
        <StepButton active={step === 1} onClick={() => setStep(1)}>
          1 / Job details
        </StepButton>
        <div className="mb-2 h-px flex-1 bg-border" />
        <StepButton active={step === 2} onClick={() => setStep(2)}>
          2 / Candidate fields
        </StepButton>
      </div>

      <div className={step === 1 ? "mx-auto max-w-[760px]" : ""}>
        {step === 1 && (
          <FormDetailsStep
            values={props.details}
            onChange={(data) => {
              Object.entries(data).forEach(([k, v]) => props.updateDetails(k as any, v))
            }}
            onNext={(data) => {
              Object.entries(data).forEach(([k, v]) => props.updateDetails(k as any, v))
              setStep(2)
            }}
          />
        )}

        {step === 2 && (
          <FormBuilderStep
            details={props.details}
            fields={props.fields}
            selectedFieldType={props.selectedFieldType}
            setSelectedFieldType={props.setSelectedFieldType}
            handleAddField={props.addField}
            handleUpdateField={props.updateField}
            handleRemoveField={props.removeField}
            handleReorderField={props.reorderField}
            handleAddOption={props.addOption}
            handleRemoveOption={props.removeOption}
          />
        )}
      </div>

      <div className="sticky bottom-0 -mx-4 flex items-center justify-between gap-3 border-t bg-background/95 px-4 py-3 backdrop-blur md:static md:mx-0 md:bg-transparent md:px-0">
        <Button variant="ghost" onClick={() => step === 1 ? history.back() : setStep(1)} disabled={props.isSaving}>
          <HugeIcon name="arrow-right" className="size-4 rotate-180" />
          Back
        </Button>

        {step === 1 ? (
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90" type="submit" form="step1-form">
            Next: Candidate fields
            <HugeIcon name="arrow-right" className="size-4" />
          </Button>
        ) : (
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={props.onSave} disabled={props.isSaving}>
            <HugeIcon name={props.isSaving ? "loading" : "save"} className="size-4" />
            Publish form
          </Button>
        )}
      </div>
    </div>
  )
}

function StepButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border-b-2 pb-2 text-sm font-medium transition ${
        active ? "border-primary text-primary" : "border-muted text-muted-foreground"
      }`}
    >
      {children}
    </button>
  )
}
