import { Controller, useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { AppSelect } from "@/components/ui/app-select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ResumeUploadField } from "@/features/public-form/components/ResumeUploadField"
import { cn } from "@/lib/utils"

export function FieldRenderer({
  field,
  index,
  variant = "default",
}: {
  field: any
  index?: number
  variant?: "default" | "public"
}) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext()

  const common = register(field.id, {
    required: field.required,
    valueAsNumber: field.type === "number",
  })
  const isPublic = variant === "public"
  const fieldError = errors[field.id]

  return (
    <div className={cn(isPublic ? "rounded-lg border bg-card p-5 shadow-sm sm:p-6" : "space-y-2")}>
      <div className={cn(isPublic ? "mb-4 flex items-start gap-3" : "")}>
        {isPublic && index && (
          <span className="grid size-7 shrink-0 place-items-center rounded-md bg-secondary text-xs font-semibold text-muted-foreground">
            {index}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <Label
            className={cn(
              "font-medium text-foreground",
              isPublic ? "text-lg leading-7 sm:text-xl" : "text-[13px]"
            )}
          >
            {field.label}
            {field.required && <span className="text-primary"> *</span>}
          </Label>
          {isPublic && field.description && (
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {field.description}
            </p>
          )}
        </div>
      </div>

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
          className={cn(
            isPublic
              ? "h-12 rounded-md bg-background text-base shadow-none focus-visible:border-primary focus-visible:ring-primary/15"
              : "cc-input"
          )}
        />
      )}

      {/* FILE */}
      {field.type === "file" && (
        <ResumeUploadField field={field} />
      )}

      {/* TEXTAREA */}
      {field.type === "textarea" && (
        <Textarea
          placeholder={field.placeholder}
          disabled={field.disabled}
          readOnly={field.readOnly}
          {...common}
          className={cn(
            "min-h-30 text-sm focus-visible:border-primary",
            isPublic
              ? "min-h-32 rounded-md bg-background text-base shadow-none focus-visible:ring-primary/15"
              : "rounded-[10px] bg-secondary"
          )}
        />
      )}

      {/* SELECT */}
      {field.type === "select" && (
        <Controller
          name={field.id}
          control={control}
          rules={{ required: field.required }}
          render={({ field: controlledField }) => (
            <AppSelect
              label={field.label}
              value={controlledField.value || ""}
              onValueChange={controlledField.onChange}
              disabled={field.disabled}
              placeholder={field.placeholder || "Select an option"}
              size="lg"
              options={[
                {
                  value: "",
                  label: field.placeholder || "Select an option",
                  disabled: Boolean(field.required),
                },
                ...(field.options || []).map((option: string) => ({
                  value: option,
                  label: option,
                })),
              ]}
              triggerClassName={cn(isPublic && "h-12 text-base")}
            />
          )}
        />
      )}

      {/* RADIO */}
      {field.type === "radio" && (
        <div className={cn("space-y-2", isPublic && "mt-4")}>
          {field.options?.map((opt: string) => (
            <label
              key={opt}
              className={cn(
                "flex items-center gap-2 text-sm",
                isPublic && "min-h-12 rounded-md border bg-background px-3 transition hover:border-primary/40 hover:bg-secondary/40"
              )}
            >
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
        <div className={cn("space-y-2", isPublic && "mt-4")}>
          {field.options?.map((opt: string) => (
            <label
              key={opt}
              className={cn(
                "flex items-center gap-2 text-sm",
                isPublic && "min-h-12 rounded-md border bg-background px-3 transition hover:border-primary/40 hover:bg-secondary/40"
              )}
            >
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
      {fieldError && (
        <p className={cn("text-xs text-destructive", isPublic && "mt-3")}>
          {field.errorMessage || "This field is required"}
        </p>
      )}
    </div>
  )
}


