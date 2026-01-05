import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function FieldRenderer({ field }: any) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const common = register(field.id, { required: field.required });

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">
        {field.label}
        {field.required && <span className="text-destructive"> *</span>}
      </Label>

      {/* TEXT / EMAIL / NUMBER / URL */}
      {["text", "email", "number", "url"].includes(field.type) && (
        <Input
          type={field.type}
          placeholder={field.placeholder}
          {...common}
          className="h-12 text-base"
        />
      )}

      {/* TEXTAREA */}
      {field.type === "textarea" && (
        <Textarea
          placeholder={field.placeholder}
          {...common}
          className="min-h-30"
        />
      )}

      {/* SELECT */}
      {field.type === "select" && (
        <select
          {...common}
          className="w-full h-12 px-3 rounded-md border bg-background text-sm"
        >
          <option value="">Select an option</option>
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
                {...common}
                className="accent-primary"
              />
              {opt}
            </label>
          ))}
        </div>
      )}

      {/* CHECKBOX (multi-select) */}
      {field.type === "checkbox" && (
        <div className="space-y-2">
          {field.options?.map((opt: string) => (
            <label key={opt} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                value={opt}
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
        <p className="text-xs text-destructive">This field is required</p>
      )}
    </div>
  );
}
