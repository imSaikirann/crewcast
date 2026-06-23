"use client"

import { MultiStepForm } from "../components/MultiStepForm"
import { useFormBuilder } from "../hooks/useFormBuilder"

export default function Page() {
  const fb = useFormBuilder()

  return (
    <MultiStepForm
      details={fb.details}
      updateDetails={fb.updateDetails}
      fields={fb.fields}
      selectedFieldType={fb.selectedFieldType}
      setSelectedFieldType={fb.setSelectedFieldType}
      addField={fb.addField}
      updateField={fb.updateField}
      removeField={fb.removeField}
      reorderField={fb.reorderField}
      addOption={fb.addOption}
      removeOption={fb.removeOption}
      onSave={fb.save}
      isSaving={fb.isSaving}
      hasLocalDraft={fb.hasLocalDraft}
      resetDraft={fb.resetDraft}
    />
  )
}

