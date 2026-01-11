"use client"

import React, { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { HugeIcon } from "@/utils/hugeicons"
import { FieldType, FormField } from "../types/types"
import { FieldEditor } from "./FieldEditor"

interface FormBuilderStepProps {
  fields: FormField[]
  selectedFieldType: FieldType
  setSelectedFieldType: (type: FieldType) => void
  handleAddField: (index?: number) => void
  handleUpdateField: (id: string, updates: Partial<FormField>) => void
  handleRemoveField: (id: string) => void
  handleAddOption: (id: string, option: string) => void
  handleRemoveOption: (id: string, index: number) => void
}

export function FormBuilderStep({
  fields,
  selectedFieldType,
  setSelectedFieldType,
  handleAddField,
  handleUpdateField,
  handleRemoveField,
  handleAddOption,
  handleRemoveOption,
}: FormBuilderStepProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const fieldTypes = useMemo(
    () => [
      { value: "text", label: "Text Input" },
      { value: "email", label: "Email" },
      { value: "number", label: "Number" },
      { value: "textarea", label: "Textarea" },
      { value: "select", label: "Select Dropdown" },
      { value: "checkbox", label: "Checkbox" },
      { value: "date", label: "Date" },
      { value: "file", label: "File Upload" },
    ],
    []
  )

  const AddFieldInline = ({ index }: { index: number }) => {
    const isExpanded = expandedIndex === index

    const handleAdd = () => {
      handleAddField(index)
      setExpandedIndex(null)
    }

    return (
      <div className="py-2">
        {!isExpanded ? (
          <Button
            variant="ghost"
            onClick={() => setExpandedIndex(index)}
            className="w-full border-2 border-dashed hover:border-solid hover:bg-muted"
          >
            <HugeIcon name="add-circle" className="w-4 h-4 mr-2" />
            Add Field
          </Button>
        ) : (
          <Card className="border-2 border-primary">
            <CardContent className="pt-4 space-y-4">
              <div>
                <Label>Field Type</Label>
                <Select
                  value={selectedFieldType}
                  onValueChange={(value) => setSelectedFieldType(value as FieldType)}
                >
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fieldTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAdd} className="flex-1" variant="outline">
                  <HugeIcon name="add-circle" className="w-4 h-4 mr-2" />
                  Add Field
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setExpandedIndex(null)}
                  className="px-4"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Initial Add Field Section */}
      {fields.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Add Field</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Field Type</Label>
              <Select
                value={selectedFieldType}
                onValueChange={(value) => setSelectedFieldType(value as FieldType)}
              >
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fieldTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => handleAddField()} className="w-full" variant="outline">
              <HugeIcon name="add-circle" className="w-4 h-4 mr-2" />
              Add Field
            </Button>
          </CardContent>
        </Card>
      )}

      {fields.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Form Fields ({fields.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field, index) => (
              <React.Fragment key={field.id}>
                <AddFieldInline index={index} />
                <FieldEditor
                  field={field}
                  onUpdate={(updates) => handleUpdateField(field.id, updates)}
                  onRemove={() => handleRemoveField(field.id)}
                  onAddOption={(option) => handleAddOption(field.id, option)}
                  onRemoveOption={(optionIndex) => handleRemoveOption(field.id, optionIndex)}
                />
              </React.Fragment>
            ))}
            {/* Add Field at the end */}
            <AddFieldInline index={fields.length} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

