"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { MultiStepForm } from "../components/MultiStepForm"
import { useFormBuilder } from "../hooks/useFormBuilder"

export default function Form() {
  const searchParams = useSearchParams()
  const domainId = searchParams.get("domain")
  const [isSaving, setIsSaving] = useState(false)

  const builder = useFormBuilder()

  if (!domainId) {
    return <div className="p-10 text-red-500">Missing domain</div>
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      await builder.save()
    } catch (error) {
      console.error("Error saving form:", error)
      setIsSaving(false)
    }
  }

  return (
    <MultiStepForm
      formTitle={builder.formTitle}
      formDescription={builder.formDescription}
      expiresAt={builder.expiresAt}
      setFormTitle={builder.setFormTitle}
      setFormDescription={builder.setFormDescription}
      setExpiresAt={builder.setExpiresAt}
      fields={builder.fields}
      selectedFieldType={builder.selectedFieldType}
      setSelectedFieldType={builder.setSelectedFieldType}
      handleAddField={builder.addField}
      handleUpdateField={builder.updateField}
      handleRemoveField={builder.removeField}
      handleAddOption={builder.addOption}
      handleRemoveOption={builder.removeOption}
      onSave={handleSave}
      isSaving={isSaving}
    />
  )
}
