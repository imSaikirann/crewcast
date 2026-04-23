"use client";

import { FileText, Trash2 } from "lucide-react";
import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/utils/uploadthing";
import type { ResumeUpload } from "@/features/public-form/types/resume";

type ResumeUploadFieldProps = {
  field: {
    id: string;
    label?: string;
    required?: boolean;
    disabled?: boolean;
  };
};

const MAX_RESUME_SIZE = 5 * 1024 * 1024;

export function ResumeUploadField({ field }: ResumeUploadFieldProps) {
  const { control, clearErrors } = useFormContext();
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const {
    field: { value, onChange },
  } = useController({
    name: field.id,
    control,
    rules: {
      required: field.required ? `${field.label || "Resume"} is required` : false,
      validate: validateResumeUpload,
    },
  });

  const resume = isResumeUpload(value) ? value : null;

  return (
    <div className="space-y-3">
      {resume ? (
        <div className="rounded-md border bg-background p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-background text-primary">
                <FileText className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {resume.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(resume.size)} PDF uploaded
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                onChange(undefined);
                setUploadError(null);
                setProgress(0);
              }}
            >
              <Trash2 className="size-4" />
              Remove / Re-upload
            </Button>
          </div>
        </div>
      ) : (
        <UploadDropzone
          endpoint="resumeUploader"
          disabled={field.disabled}
          onBeforeUploadBegin={(files) => {
            const file = files[0];
            const error = validateSelectedFile(file);

            if (error) {
              setUploadError(error);
              return [];
            }

            setUploadError(null);
            setProgress(0);
            return files.slice(0, 1);
          }}
          onUploadProgress={(value) => setProgress(value)}
          onClientUploadComplete={(files) => {
            const uploaded = files[0]?.serverData;

            if (!isResumeUpload(uploaded)) {
              setUploadError("Upload completed, but the resume metadata was invalid.");
              return;
            }

            onChange(uploaded);
            clearErrors(field.id);
            setUploadError(null);
            setProgress(100);
          }}
          onUploadError={(error) => {
            setUploadError(error.message || "Resume upload failed.");
            setProgress(0);
          }}
          appearance={{
            container:
              "min-h-36 rounded-md border border-dashed border-border bg-background p-4 transition hover:border-primary/50 hover:bg-secondary/30",
            uploadIcon: "text-primary",
            label: "text-sm font-medium text-foreground",
            allowedContent: "text-xs text-muted-foreground",
            button:
              "h-9 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90",
          }}
          content={{
            label({ isDragActive, isUploading, uploadProgress }) {
              if (isUploading) return `Uploading resume... ${Math.round(uploadProgress)}%`;
              if (isDragActive) return "Drop your PDF resume here";
              return "Upload Resume";
            },
            allowedContent() {
              return "Drag and drop a PDF, or click to browse. Max 5MB.";
            },
            button({ isUploading }) {
              return isUploading ? "Uploading..." : "Choose PDF";
            },
          }}
        />
      )}

      {progress > 0 && progress < 100 && (
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {uploadError && <p className="text-xs text-destructive">{uploadError}</p>}
    </div>
  );
}

function validateSelectedFile(file: File | undefined) {
  if (!file) return "Please select a PDF resume.";
  if (file.type !== "application/pdf") return "Only PDF resumes are allowed.";
  if (file.size > MAX_RESUME_SIZE) return "Resume must be 5MB or smaller.";
  return null;
}

function validateResumeUpload(value: unknown) {
  if (value === undefined || value === null || value === "") return true;
  if (!isResumeUpload(value)) return "Upload a valid PDF resume.";
  if (value.type !== "application/pdf") return "Only PDF resumes are allowed.";
  if (value.size > MAX_RESUME_SIZE) return "Resume must be 5MB or smaller.";
  return true;
}

function isResumeUpload(value: unknown): value is ResumeUpload {
  if (!value || typeof value !== "object") return false;

  const maybeResume = value as Partial<ResumeUpload>;

  return (
    typeof maybeResume.url === "string" &&
    typeof maybeResume.name === "string" &&
    typeof maybeResume.size === "number" &&
    typeof maybeResume.type === "string"
  );
}

function formatFileSize(size: number) {
  if (size < 1024 * 1024) return `${Math.round(size / 1024)}KB`;
  return `${(size / (1024 * 1024)).toFixed(1)}MB`;
}
