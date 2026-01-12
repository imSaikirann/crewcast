import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

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
      <Label className="text-sm font-medium">
        {field.label}
        {field.required && <span className="text-destructive"> *</span>}
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
          className="h-12 text-base"
        />
      )}

      {/* FILE */}
      {field.type === "file" && (
        <Input
          type="file"
          accept={field.accept}
          disabled={field.disabled}
          {...register(field.id, { required: field.required })}
        />
      )}

      {/* TEXTAREA */}
      {field.type === "textarea" && (
        <Textarea
          placeholder={field.placeholder}
          disabled={field.disabled}
          readOnly={field.readOnly}
          {...common}
          className="min-h-30"
        />
      )}

      {/* SELECT */}
      {field.type === "select" && (
        <select
          {...common}
          disabled={field.disabled}
          className="w-full h-12 px-3 rounded-md border bg-background text-sm"
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
          {field.errorMessage || "This field is required"}
        </p>
      )}
    </div>
  )
}
