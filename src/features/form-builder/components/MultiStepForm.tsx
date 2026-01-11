"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { HugeIcon } from "@/utils/hugeicons"
import { FormDetailsStep } from "./FormDetailsStep"
import { FormBuilderStep } from "./FormBuilderStep"
import { FormPreviewModal } from "./FormPreviewModal"
import { FormField, FieldType } from "../types/types"

interface MultiStepFormProps {
  // Step 1 - Form Details
  formTitle: string
  formDescription: string
  expiresAt: string
  setFormTitle: (title: string) => void
  setFormDescription: (description: string) => void
  setExpiresAt: (date: string) => void
  
  // Step 2 - Form Builder
  fields: FormField[]
  selectedFieldType: FieldType
  setSelectedFieldType: (type: FieldType) => void
  handleAddField: (index?: number) => void
  handleUpdateField: (id: string, updates: Partial<FormField>) => void
  handleRemoveField: (id: string) => void
  handleAddOption: (id: string, option: string) => void
  handleRemoveOption: (id: string, index: number) => void
  
  // Save
  onSave: () => void | Promise<void>
  isSaving?: boolean
}

export function MultiStepForm({
  formTitle,
  formDescription,
  expiresAt,
  setFormTitle,
  setFormDescription,
  setExpiresAt,
  fields,
  selectedFieldType,
  setSelectedFieldType,
  handleAddField,
  handleUpdateField,
  handleRemoveField,
  handleAddOption,
  handleRemoveOption,
  onSave,
  isSaving = false,
}: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const canProceedToStep2 = formTitle.trim() && formDescription.trim()

  const handleNext = () => {
    if (canProceedToStep2) {
      setCurrentStep(2)
    }
  }

  const handleBack = () => {
    setCurrentStep(1)
  }

  const handleSave = async () => {
    await onSave()
  }

  const canSave = formTitle.trim() && formDescription.trim() && fields.length > 0

  return (
    <div className="space-y-6">
      {/* Step Indicators */}
      <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-4 px-4">
        <div className="flex items-center">
          <div
            className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 ${
              currentStep >= 1
                ? "border-primary bg-primary text-primary-foreground"
                : "border-muted bg-muted text-muted-foreground"
            }`}
          >
            1
          </div>
          <span className="ml-2 text-xs sm:text-sm font-medium">Form Details</span>
        </div>
        <div className="h-0.5 w-8 sm:w-16 bg-border" />
        <div className="flex items-center">
          <div
            className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 ${
              currentStep >= 2
                ? "border-primary bg-primary text-primary-foreground"
                : "border-muted bg-muted text-muted-foreground"
            }`}
          >
            2
          </div>
          <span className="ml-2 text-xs sm:text-sm font-medium">Form Builder</span>
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {currentStep === 1 && (
          <div className="space-y-6">
            <FormDetailsStep
              formTitle={formTitle}
              formDescription={formDescription}
              expiresAt={expiresAt}
              setFormTitle={setFormTitle}
              setFormDescription={setFormDescription}
              setExpiresAt={setExpiresAt}
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <FormBuilderStep
              fields={fields}
              selectedFieldType={selectedFieldType}
              setSelectedFieldType={setSelectedFieldType}
              handleAddField={handleAddField}
              handleUpdateField={handleUpdateField}
              handleRemoveField={handleRemoveField}
              handleAddOption={handleAddOption}
              handleRemoveOption={handleRemoveOption}
            />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 max-w-4xl mx-auto pt-6 border-t px-4 sm:px-6">
        <div className="flex gap-2 flex-wrap">
          {currentStep === 2 && (
            <Button variant="outline" onClick={handleBack} className="flex-1 sm:flex-initial">
              Back
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => setIsPreviewOpen(true)}
            className="flex-1 sm:flex-initial"
          >
            <HugeIcon name="views" className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Preview</span>
            <span className="sm:hidden">Preview</span>
          </Button>
        </div>

        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          {currentStep === 1 && (
            <Button
              onClick={handleNext}
              disabled={!canProceedToStep2}
              className="w-full sm:w-auto"
            >
              Next
              <HugeIcon name="arrow-right" className="w-4 h-4 ml-2" />
            </Button>
          )}
          
          {currentStep === 2 && (
            <Button
              onClick={handleSave}
              disabled={!canSave || isSaving}
              className="w-full sm:w-auto"
            >
              {isSaving ? (
                <>
                  <HugeIcon name="loading" className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <HugeIcon name="save" className="w-4 h-4 mr-2" />
                  Save Form
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      <FormPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        formTitle={formTitle}
        formDescription={formDescription}
        fields={fields}
      />
    </div>
  )
}

