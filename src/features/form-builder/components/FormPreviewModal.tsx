"use client"

import React from "react"
import { useForm, FormProvider } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HugeIcon } from "@/utils/hugeicons"
import { FormPreview } from "./FormPreview"

interface FormPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  formTitle: string
  formDescription: string
  fields: any[]
}

export function FormPreviewModal({
  isOpen,
  onClose,
  formTitle,
  formDescription,
  fields,
}: FormPreviewModalProps) {
  const methods = useForm()

  if (!isOpen) return null

  return (
    <FormProvider {...methods}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4" onClick={onClose}>
        <Card 
          className="w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col" 
          onClick={(e) => e.stopPropagation()}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 gap-2">
            <CardTitle className="text-lg sm:text-xl">Form Preview</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 shrink-0"
            >
              <HugeIcon name="cancel" className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="overflow-y-auto flex-1 p-4 sm:p-6">
            <FormPreview
              title={formTitle || "Untitled Form"}
              description={formDescription}
              fields={fields}
            />
          </CardContent>
          <div className="p-4 sm:p-6 border-t">
            <Button onClick={onClose} className="w-full">
              Close Preview
            </Button>
          </div>
        </Card>
      </div>
    </FormProvider>
  )
}

