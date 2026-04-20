import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"

export function FieldRenderer({ field }: any) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const common = register(field.id, {
    required: field.required,
    valueAsNumber: field.type === "number",
  })

  return (
    <div className="space-y-2">
      <Label className="text-[13px] font-medium text-foreground">
        {field.label}
        {field.required && <span className="text-primary"> *</span>}
      </Label>

      {/* TEXT / EMAIL / NUMBER / URL / DATE */}
      {["text", "email", "number", "url", "date"].includes(field.type) && (
        <Input
          type={field.type}
          placeholder={field.placeholder}
          min={field.min}
          max={field.max}
          step={field.step}
          disabled={field.disabled}
          readOnly={field.readOnly}
          {...common}
          className="cc-input"
        />
      )}

      {/* FILE */}
      {field.type === "file" && (
        <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed bg-secondary p-4 text-center text-sm text-muted-foreground transition hover:border-primary/50">
          <Upload className="mb-2 size-5" />
          Drag & drop or click to browse
          <Input
            type="file"
            accept={field.accept}
            disabled={field.disabled}
            {...register(field.id, { required: field.required })}
            className="sr-only"
          />
        </label>
      )}

      {/* TEXTAREA */}
      {field.type === "textarea" && (
        <Textarea
          placeholder={field.placeholder}
          disabled={field.disabled}
          readOnly={field.readOnly}
          {...common}
          className="min-h-30 rounded-[10px] bg-secondary text-sm focus-visible:border-primary"
        />
      )}

      {/* SELECT */}
      {field.type === "select" && (
        <select
          {...common}
          disabled={field.disabled}
          className="h-11 w-full rounded-[10px] border bg-secondary px-3 text-sm text-foreground outline-none focus:border-primary"
        >
          <option value="">
            {field.placeholder || "Select an option"}
          </option>
          {field.options?.map((opt: string) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}

      {/* RADIO */}
      {field.type === "radio" && (
        <div className="space-y-2">
          {field.options?.map((opt: string) => (
            <label key={opt} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                value={opt}
                disabled={field.disabled}
                {...common}
                className="accent-primary"
              />
              {opt}
            </label>
          ))}
        </div>
      )}

      {/* CHECKBOX (multi-select array) */}
      {field.type === "checkbox" && (
        <div className="space-y-2">
          {field.options?.map((opt: string) => (
            <label key={opt} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                value={opt}
                disabled={field.disabled}
                {...register(field.id)}
                className="accent-primary"
              />
              {opt}
            </label>
          ))}
        </div>
      )}

      {/* Validation error */}
      {errors[field.id] && (
        <p className="text-xs text-destructive">
          x {field.errorMessage || "This field is required"}
        </p>
      )}
    </div>
  )
}
