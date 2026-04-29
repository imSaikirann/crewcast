import { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FilePlus2 } from "lucide-react";

import { FieldRenderer } from "@/components/common/forms/FieldRenderer";
import { Button } from "@/components/ui/button";
import { FormPreviewProps } from "../types/types";

export const FormPreview = memo(
  ({ title, description, fields }: FormPreviewProps) => {
    const form = useForm();

    return (
      <FormProvider {...form}>
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="break-words font-display text-lg font-semibold leading-tight tracking-tight">
              {title}
            </h2>
            {description && (
              <p className="break-words text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            )}
          </div>

          {fields.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12 text-center">
              <div className="grid size-10 place-items-center rounded-full border border-border bg-secondary/40">
                <FilePlus2
                  className="size-4 text-muted-foreground"
                  strokeWidth={1.5}
                />
              </div>
              <p className="mt-3 text-sm font-medium">No fields yet</p>
              <p className="mt-1 max-w-[220px] text-xs text-muted-foreground">
                Add fields from the builder to see the live preview here.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-5">
                {fields.map((field) => (
                  <FieldRenderer key={field.id} field={field} />
                ))}
              </div>
              <Button
                className="h-11 w-full rounded-md text-sm font-semibold"
                disabled
              >
                Submit application
              </Button>
            </>
          )}
        </div>
      </FormProvider>
    );
  }
);

FormPreview.displayName = "FormPreview";