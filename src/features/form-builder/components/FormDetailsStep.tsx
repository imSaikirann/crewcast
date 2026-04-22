"use client"

import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { JobFormDetails } from "../types/types"

const workModes = ["REMOTE", "HYBRID", "ONSITE"]
const roleTypes = ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"]
const experiences = ["JUNIOR", "MID", "SENIOR", "LEAD"]

export function FormDetailsStep({
  values,
  onChange,
  onNext,
}: {
  values: JobFormDetails
  onChange?: (v: JobFormDetails) => void
  onNext: (v: JobFormDetails) => void
}) {
  const [tags, setTags] = useState<string[]>(values.techStack || [])
  const [tagInput, setTagInput] = useState("")
  const form = useForm<JobFormDetails>({ defaultValues: values })
  const currentWorkMode = form.watch("workMode") || "REMOTE"
  const currentRoleType = form.watch("roleType") || "FULL_TIME"

  useEffect(() => {
    form.reset(values)
    setTags(values.techStack || [])
  }, [form, values])

  const syncForm = (nextTags = tags) => {
    onChange?.({
      ...form.getValues(),
      techStack: nextTags,
    })
  }

  const addTag = () => {
    const next = tagInput.trim()
    if (!next || tags.includes(next)) return
    const nextTags = [...tags, next]
    setTags(nextTags)
    setTagInput("")
    syncForm(nextTags)
  }

  return (
    <FormProvider {...form}>
      <form
        id="step1-form"
        onSubmit={form.handleSubmit((data) => onNext({ ...data, techStack: tags }))}
        className="space-y-6 rounded-lg border bg-card p-5 shadow-xs"
      >
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-xl font-semibold">Job details</h1>
            <p className="mt-1 text-sm text-muted-foreground">Define the role before building the application.</p>
          </div>
          {values.domainId && (
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
              Domain selected
            </span>
          )}
        </header>

        <Section title="Role info">
          <Field label="Title">
            <Input className="cc-input" placeholder="Frontend Engineer" {...form.register("formTitle", { required: true, onChange: () => syncForm() })} />
          </Field>
          <Field label="Description">
            <Textarea className="min-h-[120px] rounded-[10px] bg-secondary text-sm focus-visible:border-primary" placeholder="Describe the role..." {...form.register("formDescription", { required: true, onChange: () => syncForm() })} />
          </Field>
        </Section>

        <Section title="Location & Work">
          <Field label="Location">
            <Input className="cc-input" placeholder="Remote, Bengaluru, Hyderabad..." {...form.register("location", { required: true, onChange: () => syncForm() })} />
          </Field>
          <Field label="Work mode">
            <Segmented value={currentWorkMode} options={workModes} onChange={(value) => {
              form.setValue("workMode", value)
              syncForm()
            }} />
          </Field>
          <Field label="Role type">
            <Segmented value={currentRoleType} options={roleTypes} onChange={(value) => {
              form.setValue("roleType", value)
              syncForm()
            }} />
          </Field>
          <Field label="Experience level">
            <Select value={form.watch("experience") || "JUNIOR"} onValueChange={(value) => {
              form.setValue("experience", value)
              syncForm()
            }}>
              <SelectTrigger className="cc-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {experiences.map((item) => <SelectItem key={item} value={item}>{labelize(item)}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
        </Section>

        <Section title="Compensation">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Min salary">
              <Input type="number" className="cc-input" {...form.register("salaryMin", { valueAsNumber: true, onChange: () => syncForm() })} />
            </Field>
            <Field label="Max salary">
              <Input type="number" className="cc-input" {...form.register("salaryMax", { valueAsNumber: true, onChange: () => syncForm() })} />
            </Field>
          </div>
          <Field label="Currency">
            <Select value={form.watch("currency") || "INR"} onValueChange={(value) => {
              form.setValue("currency", value)
              syncForm()
            }}>
              <SelectTrigger className="cc-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INR">INR</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </Section>

        <Section title="Tech & Deadline">
          <Field label="Openings for this role">
            <Input
              type="number"
              min={1}
              className="cc-input"
              placeholder="3"
              {...form.register("openings", {
                valueAsNumber: true,
                min: 1,
                onChange: () => syncForm(),
              })}
            />
            <p className="text-xs text-muted-foreground">
              Used to track hiring progress, for example 0/3 hired.
            </p>
          </Field>
          <Field label="Tech stack">
            <div className="rounded-[10px] border bg-secondary p-2 focus-within:border-primary">
              <div className="mb-2 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-accent px-2.5 py-1 text-xs text-accent-foreground">
                    {tag}
                    <button type="button" className="ml-2" onClick={() => {
                      const nextTags = tags.filter((item) => item !== tag)
                      setTags(nextTags)
                      syncForm(nextTags)
                    }}>x</button>
                  </span>
                ))}
              </div>
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addTag()
                  }
                }}
                placeholder="e.g. React, TypeScript, Node..."
                className="h-8 w-full bg-transparent px-1 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </Field>
          <Field label="Expiry date">
            <Input type="date" className="cc-input" {...form.register("expiresAt", { required: true, onChange: () => syncForm() })} />
          </Field>
        </Section>
      </form>
    </FormProvider>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 border-t pt-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{title}</p>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-[13px] font-medium text-muted-foreground">{label}</Label>
      {children}
    </div>
  )
}

function Segmented({ value, options, onChange }: { value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`h-10 rounded-[10px] border bg-secondary px-3 text-sm transition ${
            value === option ? "border-primary bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {labelize(option)}
        </button>
      ))}
    </div>
  )
}

function labelize(value: string) {
  return value.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
}
