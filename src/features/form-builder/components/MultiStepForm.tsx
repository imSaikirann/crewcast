"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FormDetailsStep } from "./FormDetailsStep"
import { FormBuilderStep } from "./FormBuilderStep"
import { JobFormDetails } from "../types/types"
import { FormField, FieldType } from "../types/types"

export function MultiStepForm(props: {
  details: JobFormDetails
  updateDetails: (k: keyof JobFormDetails, v: any) => void
  fields: FormField[]
  selectedFieldType: FieldType
  setSelectedFieldType: (t: FieldType) => void
  addField: () => void
  updateField: (id: string, u: Partial<FormField>) => void
  removeField: (id: string) => void
  addOption: (id: string, v: string) => void
  removeOption: (id: string, i: number) => void
  onSave: () => Promise<void>
  isSaving: boolean
}) {
  const [step, setStep] = useState<1 | 2>(1)
  

  return (
    <div>
      {step === 1 && (
        <FormDetailsStep
          values={props.details}
          onNext={(data) => {
            Object.entries(data).forEach(([k, v]) =>
              props.updateDetails(k as any, v)
            )
            setStep(2)
          }}
        />
      )}

      {step === 2 && (
        <FormBuilderStep
          fields={props.fields}
          selectedFieldType={props.selectedFieldType}
          setSelectedFieldType={props.setSelectedFieldType}
          handleAddField={props.addField}
          handleUpdateField={props.updateField}
          handleRemoveField={props.removeField}
          handleAddOption={props.addOption}
          handleRemoveOption={props.removeOption}
        />
      )}

      <div className="flex justify-between mt-6">
        {step === 2 && (
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => setStep(1)}
            disabled={props.isSaving}
          >
            Back
          </Button>
        )}
        {step === 1 && (
          <Button className="cursor-pointer" type="submit" form="step1-form">
            Next
          </Button>
        )}
        {step === 2 && (
          <Button onClick={props.onSave} disabled={props.isSaving}>
            {props.isSaving ? "Saving form..." : "Save Form"}
          </Button>
        )}
      </div>
    </div>
  )
}
