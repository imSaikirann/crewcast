"use client"

import { useMemo, useState } from "react"
import { GripVertical, Lock, Pencil, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HugeIcon } from "@/utils/hugeicons"
import { isGitHubField } from "@/lib/formFields"
import { FieldType, FormField, JobFormDetails } from "../types/types"
import { FormPreview } from "./FormPreview"

interface FormBuilderStepProps {
  details: JobFormDetails
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
  details,
  fields,
  selectedFieldType,
  setSelectedFieldType,
  handleAddField,
  handleUpdateField,
  handleRemoveField,
  handleAddOption,
  handleRemoveOption,
}: FormBuilderStepProps) {
  const [editingId, setEditingId] = useState<string | null>(fields[0]?.id ?? null)
  const [showTypes, setShowTypes] = useState(false)
  const [previewTab, setPreviewTab] = useState<"builder" | "preview">("builder")

  const fieldTypes = useMemo(
    () => [
      { value: "text", label: "Text" },
      { value: "email", label: "Email" },
      { value: "number", label: "Number" },
      { value: "textarea", label: "Textarea" },
      { value: "select", label: "Select" },
      { value: "checkbox", label: "Checkbox" },
      { value: "date", label: "Date" },
      { value: "file", label: "File" },
      { value: "url", label: "URL" },
    ],
    []
  )

  const addSelectedField = () => {
    handleAddField()
    setShowTypes(false)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 lg:hidden">
        <Button variant={previewTab === "builder" ? "default" : "outline"} onClick={() => setPreviewTab("builder")}>Builder</Button>
        <Button variant={previewTab === "preview" ? "default" : "outline"} onClick={() => setPreviewTab("preview")}>Preview</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,55fr)_minmax(360px,45fr)]">
        <section className={previewTab === "preview" ? "hidden lg:block" : "space-y-4"}>
          <header>
            <h2 className="font-display text-lg font-semibold">Candidate fields</h2>
            <p className="mt-1 text-[13px] text-muted-foreground">Define what applicants will fill out.</p>
          </header>

          <div className="space-y-2">
            {fields.map((field) => {
              const locked = field.locked || isGitHubField(field)
              const editing = editingId === field.id

              return (
                <div key={field.id} className="rounded-xl border bg-card">
                  <div className="flex items-center gap-3 px-3 py-2.5">
                    <GripVertical className="size-4 text-muted-foreground" />
                    <HugeIcon name={locked ? "lock" : "edit"} className="size-4 text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{field.label || "Untitled field"}</p>
                      <p className="text-xs text-muted-foreground">{field.type}</p>
                    </div>
                    {field.required && <Badge variant="secondary" className="rounded-full">Required</Badge>}
                    {locked && <Badge className="rounded-full bg-accent text-accent-foreground">AI scoring</Badge>}
                    <Button variant="ghost" size="icon-sm" onClick={() => setEditingId(editing ? null : field.id)}>
                      {locked ? <Lock className="size-4" /> : <Pencil className="size-4" />}
                    </Button>
                    <Button variant="ghost" size="icon-sm" disabled={locked} onClick={() => handleRemoveField(field.id)} className="hover:text-destructive">
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                  {editing && (
                    <InlineFieldEditor
                      field={field}
                      fieldTypes={fieldTypes}
                      onUpdate={(updates) => handleUpdateField(field.id, updates)}
                      onDone={() => setEditingId(null)}
                      onAddOption={(option) => handleAddOption(field.id, option)}
                      onRemoveOption={(index) => handleRemoveOption(field.id, index)}
                    />
                  )}
                </div>
              )
            })}
          </div>

          <div className="relative">
            <Button variant="outline" className="h-12 w-full border-dashed text-muted-foreground" onClick={() => setShowTypes((v) => !v)}>
              + Add field
            </Button>
            {showTypes && (
              <div className="absolute bottom-full z-20 mb-2 grid w-full grid-cols-2 gap-1 rounded-xl border bg-popover p-2 shadow-lg sm:grid-cols-3">
                {fieldTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => {
                      setSelectedFieldType(type.value as FieldType)
                      setTimeout(addSelectedField, 0)
                    }}
                    className={`rounded-lg px-3 py-2 text-left text-sm hover:bg-accent ${selectedFieldType === type.value ? "text-primary" : ""}`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        <aside className={previewTab === "builder" ? "hidden lg:block" : ""}>
          <div className="sticky top-20 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-xl border bg-card p-4">
            <p className="mb-3 text-[11px] uppercase tracking-widest text-muted-foreground">Preview only</p>
            <FormPreview
              title={details.formTitle || "Untitled job form"}
              description={details.formDescription}
              fields={fields}
            />
          </div>
        </aside>
      </div>
    </div>
  )
}

function InlineFieldEditor({
  field,
  fieldTypes,
  onUpdate,
  onDone,
  onAddOption,
  onRemoveOption,
}: {
  field: FormField
  fieldTypes: { value: string; label: string }[]
  onUpdate: (updates: Partial<FormField>) => void
  onDone: () => void
  onAddOption: (option: string) => void
  onRemoveOption: (index: number) => void
}) {
  const [option, setOption] = useState("")
  const locked = field.locked || isGitHubField(field)

  return (
    <div className="grid gap-3 border-t bg-secondary/40 p-3 sm:grid-cols-2">
      <MiniField label="Label">
        <Input className="cc-input" value={field.label} readOnly={locked} onChange={(e) => onUpdate({ label: e.target.value })} />
      </MiniField>
      <MiniField label="Type">
        <Select value={field.type} disabled={locked} onValueChange={(value) => onUpdate({ type: value as FieldType })}>
          <SelectTrigger className="cc-input">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fieldTypes.map((type) => <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </MiniField>
      <MiniField label="Placeholder">
        <Input className="cc-input" value={field.placeholder || ""} readOnly={locked} onChange={(e) => onUpdate({ placeholder: e.target.value })} />
      </MiniField>
      <label className="flex items-end gap-2 pb-2 text-sm text-muted-foreground">
        <input type="checkbox" checked={locked || field.required} disabled={locked} onChange={(e) => onUpdate({ required: e.target.checked })} />
        Required
      </label>

      {field.type === "select" && (
        <div className="space-y-2 sm:col-span-2">
          <Label className="text-xs text-muted-foreground">Options</Label>
          <div className="flex gap-2">
            <Input className="cc-input" value={option} onChange={(e) => setOption(e.target.value)} placeholder="Add option" />
            <Button type="button" variant="outline" onClick={() => {
              if (!option.trim()) return
              onAddOption(option.trim())
              setOption("")
            }}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {field.options?.map((item, index) => (
              <span key={item} className="rounded-full bg-accent px-2.5 py-1 text-xs text-accent-foreground">
                {item}
                <button className="ml-2" onClick={() => onRemoveOption(index)}>x</button>
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="sm:col-span-2">
        <Button type="button" size="sm" onClick={onDone}>Done</Button>
      </div>
    </div>
  )
}

function MiniField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  )
}
