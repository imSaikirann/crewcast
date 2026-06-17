"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw, Check, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FieldType, FormField, JobFormDetails } from "../types/types";
import { FormBuilderStep } from "./FormBuilderStep";
import { FormDetailsStep } from "./FormDetailsStep";

type Props = {
  details: JobFormDetails;
  updateDetails: (k: keyof JobFormDetails, v: any) => void;
  fields: FormField[];
  selectedFieldType: FieldType;
  setSelectedFieldType: (t: FieldType) => void;
  addField: (index?: number, typeOverride?: FieldType) => void;
  updateField: (id: string, u: Partial<FormField>) => void;
  removeField: (id: string) => void;
  reorderField: (fromId: string, toId: string) => void;
  addOption: (id: string, v: string) => void;
  removeOption: (id: string, i: number) => void;
  onSave: () => Promise<void>;
  isSaving: boolean;
  hasLocalDraft: boolean;
  resetDraft: () => void;
};

const STEPS = [
  { id: 1, label: "Job details", hint: "Role, location, comp" },
  { id: 2, label: "Application", hint: "Candidate fields" },
] as const;

export function MultiStepForm(props: Props) {
  const [step, setStep] = useState<1 | 2>(1);

  return (
    <div className="mx-auto w-full max-w-[920px] space-y-10 pb-28">
      {/* Header */}
      <header className="flex flex-col gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1.5">
          <h1 className="text-xl font-semibold tracking-tight">
            Create job form
          </h1>
          <p className="text-sm text-muted-foreground">
            Drafts auto-save in this browser while you build.
          </p>
        </div>

        {props.hasLocalDraft && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={props.resetDraft}
            disabled={props.isSaving}
            className="h-9 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            data-testid="clear-draft-btn"
          >
            <RotateCcw className="size-3.5" />
            Clear draft
          </Button>
        )}
      </header>

      {/* Stepper */}
      <Stepper current={step} onSelect={(s) => setStep(s)} />

      {/* Step content */}
      <div>
        {step === 1 && (
          <FormDetailsStep
            values={props.details}
            onChange={(data) => {
              Object.entries(data).forEach(([k, v]) =>
                props.updateDetails(k as any, v)
              );
            }}
            onNext={(data) => {
              Object.entries(data).forEach(([k, v]) =>
                props.updateDetails(k as any, v)
              );
              setStep(2);
            }}
          />
        )}

        {step === 2 && (
          <FormBuilderStep
            details={props.details}
            fields={props.fields}
            selectedFieldType={props.selectedFieldType}
            setSelectedFieldType={props.setSelectedFieldType}
            handleAddField={props.addField}
            handleUpdateField={props.updateField}
            handleRemoveField={props.removeField}
            handleReorderField={props.reorderField}
            handleAddOption={props.addOption}
            handleRemoveOption={props.removeOption}
          />
        )}
      </div>

      {/* Sticky footer */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-[920px] items-center justify-between gap-3 px-5 py-3 sm:px-6">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => (step === 1 ? history.back() : setStep(1))}
            disabled={props.isSaving}
            className="h-10 gap-1.5"
            data-testid="builder-back-btn"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>

          <p className="hidden text-xs text-muted-foreground sm:block">
            Step {step} of {STEPS.length}
          </p>

          {step === 1 ? (
            <Button
              type="submit"
              form="step1-form"
              size="sm"
              className="h-10 gap-1.5 px-5 text-sm font-semibold"
              data-testid="next-step-btn"
            >
              Next
              <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={props.onSave}
              disabled={props.isSaving}
              className="h-10 gap-1.5 px-5 text-sm font-semibold"
              data-testid="publish-form-btn"
            >
              {props.isSaving ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Publishing
                </>
              ) : (
                <>
                  <Check className="size-4" />
                  Publish form
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function Stepper({
  current,
  onSelect,
}: {
  current: 1 | 2;
  onSelect: (s: 1 | 2) => void;
}) {
  return (
    <ol className="flex items-center gap-3">
      {STEPS.map((s, i) => {
        const active = current === s.id;
        const done = current > s.id;

        return (
          <li key={s.id} className="flex flex-1 items-center gap-3">
            <button
              type="button"
              onClick={() => onSelect(s.id as 1 | 2)}
              className="group flex flex-1 items-center gap-3 text-left"
              data-testid={`step-${s.id}-btn`}
            >
              <span
                className={`grid size-7 shrink-0 place-items-center rounded-full border text-[11px] font-semibold transition ${
                  active
                    ? "border-foreground bg-foreground text-background"
                    : done
                    ? "border-foreground/40 bg-foreground/5 text-foreground"
                    : "border-border bg-background text-muted-foreground"
                }`}
              >
                {done ? <Check className="size-3.5" strokeWidth={2.5} /> : s.id}
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={`block truncate text-sm font-medium ${
                    active ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </span>
                <span className="block truncate text-xs text-muted-foreground">
                  {s.hint}
                </span>
              </span>
            </button>
            {i < STEPS.length - 1 && (
              <span className="hidden h-px flex-1 bg-border sm:block" />
            )}
          </li>
        );
      })}
    </ol>
  );
}