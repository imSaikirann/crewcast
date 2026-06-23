"use client";

import React from "react";
import { Lock, Trash2, Plus, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormField } from "../types/types";
import { isGitHubField } from "@/lib/formFields";

interface FieldEditorProps {
  field: FormField;
  onUpdate: (updates: Partial<FormField>) => void;
  onRemove: () => void;
  onAddOption: (option: string) => void;
  onRemoveOption: (index: number) => void;
}

export function FieldEditor({
  field,
  onUpdate,
  onRemove,
  onAddOption,
  onRemoveOption,
}: FieldEditorProps) {
  const [newOption, setNewOption] = React.useState("");
  const locked = field.locked || isGitHubField(field);

  const handleAddOption = () => {
    if (newOption.trim()) {
      onAddOption(newOption.trim());
      setNewOption("");
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
        <h3 className="min-w-0 flex-1 truncate text-sm font-semibold">
          {field.label || "Untitled field"}
        </h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          disabled={locked}
          title={locked ? "Locked for AI scoring" : "Remove field"}
          className="size-8 text-muted-foreground hover:text-destructive disabled:opacity-50"
        >
          {locked ? <Lock className="size-4" /> : <Trash2 className="size-4" />}
        </Button>
      </div>

      <div className="mt-4 space-y-4">
        <Field label="Field label" required>
          <Input
            value={field.label}
            onChange={(e) => onUpdate({ label: e.target.value })}
            placeholder="Enter field label"
            readOnly={locked}
            className="h-10"
          />
        </Field>

        <Field label="Placeholder">
          <Input
            value={field.placeholder || ""}
            onChange={(e) => onUpdate({ placeholder: e.target.value })}
            placeholder="Enter placeholder text"
            readOnly={locked}
            className="h-10"
          />
        </Field>

        <label
          htmlFor={`required-${field.id}`}
          className="flex items-center gap-2 text-sm"
        >
          <input
            type="checkbox"
            id={`required-${field.id}`}
            checked={locked || field.required}
            onChange={(e) => onUpdate({ required: e.target.checked })}
            disabled={locked}
            className="size-3.5 rounded border-border"
          />
          Required field
          {locked && (
            <span className="text-xs text-muted-foreground">
              Â· locked for scoring
            </span>
          )}
        </label>

        {field.type === "select" && (
          <div className="space-y-2">
            <Label className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Options
            </Label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="Add option"
                className="h-10 flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddOption();
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddOption}
                size="sm"
                className="h-10 gap-1"
              >
                <Plus className="size-3.5" />
                Add
              </Button>
            </div>
            {field.options && field.options.length > 0 && (
              <div className="space-y-1.5 pt-1">
                {field.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-md border border-border bg-background px-3 py-2"
                  >
                    <span className="text-sm">{option}</span>
                    <button
                      type="button"
                      onClick={() => onRemoveOption(index)}
                      className="text-muted-foreground hover:text-destructive"
                      aria-label="Remove option"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[13px] font-medium">
        {label}
        {required && <span className="ml-1 text-muted-foreground">*</span>}
      </Label>
      {children}
    </div>
  );
}
