import { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FieldRenderer } from "@/components/common/forms/FieldRenderer";
import { HugeIcon } from "@/utils/hugeicons";
import { Button } from "@/components/ui/button";
import { FormPreviewProps } from "../types/types";

export const FormPreview = memo(({ title, description, fields }: FormPreviewProps) => {
  const form = useForm()

  return (
    <FormProvider {...form}>
      <div className="space-y-6">
        <div>
          <h2 className="break-words text-xl font-semibold sm:text-2xl">{title}</h2>
          {description && (
            <p className="mt-2 break-words text-sm text-muted-foreground">{description}</p>
          )}
        </div>

        <div className="space-y-4">
          {fields.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <HugeIcon name="edit" className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No fields added yet. Add fields to see preview.</p>
            </div>
          ) : (
            fields.map((field) => (
              <FieldRenderer key={field.id} field={field} />
            ))
          )}
        </div>

        {fields.length > 0 && (
          <Button className="w-full" disabled>
            Submit Form
          </Button>
        )}
      </div>
    </FormProvider>
  );
});

FormPreview.displayName = "FormPreview";
