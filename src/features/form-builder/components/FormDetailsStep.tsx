"use client";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppSelect } from "@/components/ui/app-select";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/ui/multi-select";
import { SKILL_OPTIONS } from "@/lib/constants/skills";
import { CURRENCY_OPTIONS, getCurrency } from "@/lib/constants/currencies";
import { JobFormDetails } from "../types/types";

const workModes = ["REMOTE", "HYBRID", "ONSITE"];
const roleTypes = ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"];
const experiences = ["JUNIOR", "MID", "SENIOR", "LEAD"];

const NUMBER_INPUT_RESET =
  "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

export function FormDetailsStep({
  values,
  onChange,
  onNext,
}: {
  values: JobFormDetails;
  onChange?: (v: JobFormDetails) => void;
  onNext: (v: JobFormDetails) => void;
}) {
  const [tags, setTags] = useState<string[]>(values.techStack || []);
  const form = useForm<JobFormDetails>({ defaultValues: values });
  const currentWorkMode = form.watch("workMode") || "REMOTE";
  const currentRoleType = form.watch("roleType") || "FULL_TIME";

  useEffect(() => {
    form.reset(values);
    setTags(values.techStack || []);
  }, [form, values]);

  const syncForm = (nextTags = tags) => {
    onChange?.({ ...form.getValues(), techStack: nextTags });
  };

  const setSkills = (nextTags: string[]) => {
    setTags(nextTags);
    syncForm(nextTags);
  };

  const currency = form.watch("currency") || "INR";
  const currencySymbol = getCurrency(currency)?.symbol ?? "";

  return (
    <FormProvider {...form}>
      <form
        id="step1-form"
        onSubmit={form.handleSubmit((data) => onNext({ ...data, techStack: tags }))}
        className="space-y-6"
      >
        {/* Role info */}
        <Section
          index="1"
          title="Role"
          description="Tell candidates what they'll be doing."
        >
          <Field label="Job title" required>
            <Input
              placeholder="e.g. Senior Product Designer"
              className="h-11"
              {...form.register("formTitle", {
                required: true,
                onChange: () => syncForm(),
              })}
            />
          </Field>

          <Field label="Description" required>
            <Textarea
              placeholder="Describe responsibilities, requirements, and what success looks like."
              className="min-h-35 text-sm leading-6"
              {...form.register("formDescription", {
                required: true,
                onChange: () => syncForm(),
              })}
            />
          </Field>
        </Section>

        {/* Location & Work */}
        <Section
          index="2"
          title="Location & work"
          description="Where and how this role operates."
        >
          <Field label="Location" required>
            <Input
              placeholder="e.g. Remote, Bengaluru, Berlin"
              className="h-11"
              {...form.register("location", {
                required: true,
                onChange: () => syncForm(),
              })}
            />
          </Field>

          <Field label="Work mode">
            <Segmented
              value={currentWorkMode}
              options={workModes}
              onChange={(value) => {
                form.setValue("workMode", value);
                syncForm();
              }}
            />
          </Field>

          <Field label="Role type">
            <Segmented
              value={currentRoleType}
              options={roleTypes}
              onChange={(value) => {
                form.setValue("roleType", value);
                syncForm();
              }}
            />
          </Field>

          <Field label="Experience level">
            <AppSelect
              label="Experience level"
              value={form.watch("experience") || "JUNIOR"}
              onValueChange={(value) => {
                form.setValue("experience", value);
                syncForm();
              }}
              options={experiences.map((item) => ({
                value: item,
                label: labelize(item),
              }))}
              size="lg"
            />
          </Field>
        </Section>

        {/* Compensation */}
        <Section
          index="3"
          title="Compensation"
          description="Optional. Salary visibility increases applications."
        >
          <div className="grid gap-4 sm:grid-cols-[1fr_1fr_minmax(0,200px)]">
            <Field label="Min salary">
              <MoneyInput
                symbol={currencySymbol}
                placeholder="0"
                {...form.register("salaryMin", {
                  valueAsNumber: true,
                  onChange: () => syncForm(),
                })}
              />
            </Field>
            <Field label="Max salary">
              <MoneyInput
                symbol={currencySymbol}
                placeholder="0"
                {...form.register("salaryMax", {
                  valueAsNumber: true,
                  onChange: () => syncForm(),
                })}
              />
            </Field>
            <Field label="Currency">
              <AppSelect
                label="Currency"
                value={currency}
                onValueChange={(value) => {
                  form.setValue("currency", value);
                  syncForm();
                }}
                options={CURRENCY_OPTIONS}
                size="lg"
                contentClassName="max-w-[320px]"
              />
            </Field>
          </div>
        </Section>

        {/* Hiring */}
        <Section
          index="4"
          title="Hiring"
          description="Track openings, required skills, and deadlines."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Openings" hint="Used for tracking — e.g. 0 / 3 hired.">
              <Input
                type="number"
                min={1}
                className={cn("h-11", NUMBER_INPUT_RESET)}
                placeholder="3"
                {...form.register("openings", {
                  valueAsNumber: true,
                  min: 1,
                  onChange: () => syncForm(),
                })}
              />
            </Field>

            <Field label="Application deadline" required>
              <Input
                type="date"
                className="h-11"
                {...form.register("expiresAt", {
                  required: true,
                  onChange: () => syncForm(),
                })}
              />
            </Field>
          </div>

          <Field
            label="Skills"
            hint="Pick from the catalogue or type to add your own."
          >
            <MultiSelect
              label="Skills"
              options={SKILL_OPTIONS}
              selected={tags}
              onChange={setSkills}
              allowCustom
              size="lg"
              placeholder="Add skills candidates should have"
              searchPlaceholder="Search skills…"
              emptyText="No matching skills — press Enter to add a custom one"
            />
          </Field>
        </Section>
      </form>
    </FormProvider>
  );
}

function Section({
  index,
  title,
  description,
  children,
}: {
  index: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-card">
      <header className="flex items-start gap-3 border-b border-border px-5 py-4 sm:px-6">
        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-foreground text-[11px] font-semibold tabular-nums text-background">
          {index}
        </span>
        <div className="min-w-0">
          <h2 className="font-display text-sm font-semibold tracking-tight">
            {title}
          </h2>
          {description && (
            <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </header>
      <div className="space-y-5 px-5 py-5 sm:px-6">{children}</div>
    </section>
  );
}

function Field({
  label,
  hint,
  required,
  className,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-[13px] font-medium text-foreground">
        {label}
        {required && <span className="ml-1 text-muted-foreground">*</span>}
      </Label>
      {children}
      {hint && <p className="text-xs leading-5 text-muted-foreground">{hint}</p>}
    </div>
  );
}

const MoneyInput = ({
  symbol,
  className,
  ...props
}: React.ComponentProps<typeof Input> & { symbol: string }) => {
  return (
    <div className="relative">
      {symbol && (
        <span className="pointer-events-none absolute inset-y-0 left-0 grid w-9 place-items-center text-sm text-muted-foreground">
          {symbol}
        </span>
      )}
      <Input
        type="number"
        inputMode="numeric"
        className={cn("h-11", symbol && "pl-9", NUMBER_INPUT_RESET, className)}
        {...props}
      />
    </div>
  );
};

function Segmented({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1 rounded-md border border-border bg-secondary/30 p-1">
      {options.map((option) => {
        const active = value === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "h-9 flex-1 rounded px-3 text-xs font-medium transition-colors",
              "min-w-21",
              active
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {labelize(option)}
          </button>
        );
      })}
    </div>
  );
}

function labelize(value: string) {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
