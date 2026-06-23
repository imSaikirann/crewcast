"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { X, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FormPreview } from "./FormPreview";

interface FormPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  formTitle: string;
  formDescription: string;
  fields: any[];
}

export function FormPreviewModal({
  isOpen,
  onClose,
  formTitle,
  formDescription,
  fields,
}: FormPreviewModalProps) {
  const methods = useForm();

  if (!isOpen) return null;

  return (
    <FormProvider {...methods}>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-3 backdrop-blur-sm sm:p-6"
        onClick={onClose}
      >
        <div
          className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-border bg-card shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <header className="flex items-center justify-between border-b border-border px-5 py-3.5">
            <div className="flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-md border border-border bg-secondary/40">
                <Eye className="size-3.5 text-muted-foreground" strokeWidth={1.75} />
              </span>
              <h2 className="font-display text-sm font-semibold tracking-tight">
                Form preview
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="grid size-8 place-items-center rounded-md text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              data-testid="close-preview-modal-btn"
            >
              <X className="size-4" />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-5 sm:p-6">
            <FormPreview
              title={formTitle || "Untitled form"}
              description={formDescription}
              fields={fields}
            />
          </div>

          <footer className="border-t border-border bg-background/40 px-5 py-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="h-10 w-full rounded-md text-sm"
            >
              Close preview
            </Button>
          </footer>
        </div>
      </div>
    </FormProvider>
  );
}
