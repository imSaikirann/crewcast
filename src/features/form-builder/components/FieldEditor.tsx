"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { HugeIcon } from "@/utils/hugeicons"
import { FormField } from "../types/types"
import { isGitHubField } from "@/lib/formFields"

interface FieldEditorProps {
  field: FormField
  onUpdate: (updates: Partial<FormField>) => void
  onRemove: () => void
  onAddOption: (option: string) => void
  onRemoveOption: (index: number) => void
}

export function FieldEditor({
  field,
  onUpdate,
  onRemove,
  onAddOption,
  onRemoveOption,
}: FieldEditorProps) {
  const [newOption, setNewOption] = React.useState("")
  const locked = field.locked || isGitHubField(field)

  const handleAddOption = () => {
    if (newOption.trim()) {
      onAddOption(newOption.trim())
      setNewOption("")
    }
  }

  return (
    <div className="rounded-lg border bg-card p-4 shadow-xs sm:p-5">
      <div className="flex flex-row items-center justify-between gap-2 pb-4">
        <h3 className="min-w-0 flex-1 truncate text-base font-semibold sm:text-lg">{field.label || "Untitled Field"}</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          disabled={locked}
          className="h-8 w-8 text-destructive hover:text-destructive flex-shrink-0"
          title={locked ? "Required for software job scoring" : "Remove field"}
        >
          <HugeIcon name={locked ? "lock" : "delete"} className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Field Label *</Label>
          <Input
            value={field.label}
            onChange={(e) => onUpdate({ label: e.target.value })}
            placeholder="Enter field label"
            className="mt-1"
            readOnly={locked}
          />
        </div>

        <div>
          <Label>Placeholder</Label>
          <Input
            value={field.placeholder || ""}
            onChange={(e) => onUpdate({ placeholder: e.target.value })}
            placeholder="Enter placeholder text"
            className="mt-1"
            readOnly={locked}
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={`required-${field.id}`}
            checked={locked || field.required}
            onChange={(e) => onUpdate({ required: e.target.checked })}
            disabled={locked}
            className="h-4 w-4 rounded border-gray-300"
          />
          <Label htmlFor={`required-${field.id}`} className="cursor-pointer">
            Required field
          </Label>
          {locked && (
            <span className="text-xs text-muted-foreground">
              Locked for GitHub scoring
            </span>
          )}
        </div>

        {field.type === "select" && (
          <div className="space-y-2">
            <Label>Options</Label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="Add option"
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddOption()
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddOption}
                size="sm"
                className="sm:w-auto w-full"
              >
                Add
              </Button>
            </div>
            {field.options && field.options.length > 0 && (
              <div className="space-y-2 mt-2">
                {field.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-muted rounded-md"
                  >
                    <span className="text-sm">{option}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveOption(index)}
                      className="h-6 w-6 text-destructive"
                    >
                      <HugeIcon name="cancel" className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
