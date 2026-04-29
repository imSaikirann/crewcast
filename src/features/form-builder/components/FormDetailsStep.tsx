"use client";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { X, Plus } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { JobFormDetails } from "../types/types";

const workModes = ["REMOTE", "HYBRID", "ONSITE"];
const roleTypes = ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"];
const experiences = ["JUNIOR", "MID", "SENIOR", "LEAD"];

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
  const [tagInput, setTagInput] = useState("");
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

  const addTag = () => {
    const next = tagInput.trim();
    if (!next || tags.includes(next)) return;
    const nextTags = [...tags, next];
    setTags(nextTags);
    setTagInput("");
    syncForm(nextTags);
  };

  return (
    <FormProvider {...form}>
      <form
        id="step1-form"
        onSubmit={form.handleSubmit((data) => onNext({ ...data, techStack: tags }))}
        className="space-y-12"
      >
        {/* Role info */}
        <Section
          eyebrow="01"
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
              className="min-h-[140px] text-sm leading-6"
              {...form.register("formDescription", {
                required: true,
                onChange: () => syncForm(),
              })}
            />
          </Field>
        </Section>

        {/* Location & Work */}
        <Section
          eyebrow="02"
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
            <Select
              value={form.watch("experience") || "JUNIOR"}
              onValueChange={(value) => {
                form.setValue("experience", value);
                syncForm();
              }}
            >
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {experiences.map((item) => (
                  <SelectItem key={item} value={item}>
                    {labelize(item)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </Section>

        {/* Compensation */}
        <Section
          eyebrow="03"
          title="Compensation"
          description="Optional. Salary visibility increases applications."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Min salary">
              <Input
                type="number"
                className="h-11"
                {...form.register("salaryMin", {
                  valueAsNumber: true,
                  onChange: () => syncForm(),
                })}
              />
            </Field>
            <Field label="Max salary">
              <Input
                type="number"
                className="h-11"
                {...form.register("salaryMax", {
                  valueAsNumber: true,
                  onChange: () => syncForm(),
                })}
              />
            </Field>
            <Field label="Currency">
              <Select
                value={form.watch("currency") || "INR"}
                onValueChange={(value) => {
                  form.setValue("currency", value);
                  syncForm();
                }}
              >
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">INR</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
        </Section>

        {/* Hiring */}
        <Section
          eyebrow="04"
          title="Hiring"
          description="Track openings, tech, and deadlines."
        >
          <Field label="Openings" hint="Used for tracking — e.g. 0 / 3 hired.">
            <Input
              type="number"
              min={1}
              className="h-11 sm:max-w-[200px]"
              placeholder="3"
              {...form.register("openings", {
                valueAsNumber: true,
                min: 1,
                onChange: () => syncForm(),
              })}
            />
          </Field>

          <Field
            label="Tech stack"
            hint="Press Enter to add. These help candidates self-qualify."
          >
            <div className="flex flex-wrap items-center gap-1.5 rounded-md border border-border bg-background px-2 py-2 focus-within:border-foreground/30 focus-within:ring-1 focus-within:ring-foreground/10">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary/50 px-2 py-0.5 text-xs font-medium"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => {
                      const nextTags = tags.filter((t) => t !== tag);
                      setTags(nextTags);
                      syncForm(nextTags);
                    }}
                    className="text-muted-foreground hover:text-foreground"
                    aria-label={`Remove ${tag}`}
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder={tags.length === 0 ? "React, Figma, SQL…" : ""}
                className="h-7 min-w-[120px] flex-1 bg-transparent px-1 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </Field>

          <Field label="Application deadline" required>
            <Input
              type="date"
              className="h-11 sm:max-w-[240px]"
              {...form.register("expiresAt", {
                required: true,
                onChange: () => syncForm(),
              })}
            />
          </Field>
        </Section>
      </form>
    </FormProvider>
  );
}

function Section({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-6 border-t border-border pt-8 lg:grid-cols-[220px_1fr] lg:gap-10">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {eyebrow}
        </p>
        <h2 className="mt-2 font-display text-base font-semibold tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[13px] font-medium text-foreground">
        {label}
        {required && <span className="ml-1 text-muted-foreground">*</span>}
      </Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

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
    <div className="inline-flex flex-wrap gap-1 rounded-md border border-border bg-secondary/30 p-1">
      {options.map((option) => {
        const active = value === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`h-9 rounded px-3 text-xs font-medium transition ${
              active
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
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