import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { FieldType, FormField, JobFormDetails } from "../types/types"
import { nanoid } from "nanoid"
import { useDomainDefaultForm } from "./useDominDefaults"
import { useCreateForm } from "./useCreateForm"
import { toast } from "@/lib/toast"
import { isGitHubField, withRequiredGitHubField } from "@/lib/formFields"

type FormBuilderDraft = {
  details: JobFormDetails
  fields: FormField[]
}

const hasValue = (value: unknown) => {
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === "number") return value > 0
  return Boolean(String(value ?? "").trim())
}

const hasMeaningfulDraft = (draft: Partial<FormBuilderDraft>) => {
  const details = draft.details
  const fields = Array.isArray(draft.fields) ? draft.fields : []
  const hasCustomFields = fields.some((field) => !isGitHubField(field))

  if (hasCustomFields) return true
  if (!details) return false

  return Boolean(
    hasValue(details.formTitle) ||
      hasValue(details.formDescription) ||
      hasValue(details.expiresAt) ||
      hasValue(details.location) ||
      hasValue(details.specialization) ||
      hasValue(details.techStack)
  )
}

const normalizeFields = (fields: unknown): FormField[] => {
  if (!Array.isArray(fields)) return withRequiredGitHubField<FormField>([])

  return withRequiredGitHubField<FormField>(
    fields
      .filter((field): field is Partial<FormField> => Boolean(field && typeof field === "object"))
      .map((field) => ({
        id: String(field.id || `field-${nanoid(10)}`),
        type: (field.type || "text") as FieldType,
        label: String(field.label || ""),
        placeholder: field.placeholder ? String(field.placeholder) : "",
        required: Boolean(field.required),
        locked: Boolean(field.locked),
        ...(field.type === "select" ? { options: Array.isArray(field.options) ? field.options : [] } : {}),
      }))
  )
}

/* ---------------------------------------------
   Hook
---------------------------------------------- */
export function useFormBuilder() {
  const params = useSearchParams()
  const domainId = params.get("domain")
  const createFormMutation = useCreateForm()
  const { data: defaults } = useDomainDefaultForm(domainId)
  const draftKey = domainId ? `crewcast-form-draft:${domainId}` : null
  const [hydratedDraft, setHydratedDraft] = useState(false)
  const [hasLocalDraft, setHasLocalDraft] = useState(false)
  const [hasLocalCustomFields, setHasLocalCustomFields] = useState(false)
  const skipNextPersist = useRef(false)

  /* -------------------------
     Unified step-1 state
  -------------------------- */
  const initialDetails: JobFormDetails = {
    formTitle: "",
    formDescription: "",
    expiresAt: "",
    domainId: domainId ?? "",
    roleType: "FULL_TIME", // Default to FULL_TIME instead of empty string
    experience: "JUNIOR", // Default to JUNIOR instead of 0
    workMode: "",
    location: "",
    specialization: "",
    techStack: [],
    openings: 1,
    salaryMin: 0,
    salaryMax: 0,
    currency: "INR",
    contractDurationMonths: 0,
  }

  const [details, setDetails] = useState<JobFormDetails>(initialDetails)

  const updateDetails = <K extends keyof JobFormDetails>(
    key: K,
    value: JobFormDetails[K]
  ) => {
    setDetails(prev => (Object.is(prev[key], value) ? prev : { ...prev, [key]: value }))
  }

  /* -------------------------
     Step-2 fields
  -------------------------- */
  const [fields, setFields] = useState<FormField[]>(withRequiredGitHubField<FormField>([]))
  const [selectedFieldType, setSelectedFieldType] =
    useState<FieldType>("text")

  const generateId = () => `field-${nanoid(10)}`

  useEffect(() => {
    if (!draftKey) {
      setHydratedDraft(true)
      return
    }

    try {
      const raw = window.localStorage.getItem(draftKey)
      if (!raw) {
        setHydratedDraft(true)
        return
      }

      const draft = JSON.parse(raw) as Partial<FormBuilderDraft>
      if (draft.details) {
        setDetails({
          ...initialDetails,
          ...draft.details,
          domainId: domainId ?? draft.details.domainId ?? "",
        })
      }
      const draftHasCustomFields = Array.isArray(draft.fields)
        ? draft.fields.some((field) => !isGitHubField(field))
        : false

      if (Array.isArray(draft.fields)) {
        setFields(normalizeFields(draft.fields))
      }
      setHasLocalDraft(hasMeaningfulDraft(draft))
      setHasLocalCustomFields(draftHasCustomFields)
    } catch {
      window.localStorage.removeItem(draftKey)
    } finally {
      setHydratedDraft(true)
    }
  }, [draftKey, domainId])

  useEffect(() => {
    if (!draftKey || !hydratedDraft) return
    if (skipNextPersist.current) {
      skipNextPersist.current = false
      return
    }

    const timeout = window.setTimeout(() => {
      window.localStorage.setItem(
        draftKey,
        JSON.stringify({
          details,
          fields: withRequiredGitHubField(fields),
        } satisfies FormBuilderDraft)
      )
      setHasLocalDraft(true)
      setHasLocalCustomFields(fields.some((field) => !isGitHubField(field)))
    }, 250)

    return () => window.clearTimeout(timeout)
  }, [details, draftKey, fields, hydratedDraft])

  const clearDraft = () => {
    if (draftKey) window.localStorage.removeItem(draftKey)
    setHasLocalDraft(false)
    setHasLocalCustomFields(false)
  }

  const resetDraft = () => {
    skipNextPersist.current = true
    clearDraft()
    setDetails(initialDetails)
    setFields(withRequiredGitHubField<FormField>([]))
  }

  /* -------------------------
     Load defaults
  -------------------------- */
  useEffect(() => {
    if (!defaults || !hydratedDraft) return

    if (!hasLocalDraft) {
      setDetails(p => ({
        ...p,
        formTitle: defaults.formTitle || "",
        formDescription: defaults.formDescription || "",
        expiresAt: defaults.expiresAt
          ? new Date(defaults.expiresAt).toISOString().split("T")[0]
          : "",
      }))
    }

    if (defaults.fields && !hasLocalCustomFields) {
      setFields(normalizeFields(defaults.fields))
    }
  }, [defaults, hasLocalCustomFields, hasLocalDraft, hydratedDraft])

  /* -------------------------
     Field operations
  -------------------------- */
  const addField = (index?: number, typeOverride?: FieldType) => {
    const fieldType = typeOverride ?? selectedFieldType
    const field: FormField = {
      id: generateId(),
      type: fieldType,
      label: "",
      placeholder: "",
      required: false,
      ...(fieldType === "select" ? { options: [] } : {}),
    }

    setFields(p => {
      if (index === undefined) return [...p, field]
      const next = [...p]
      next.splice(index, 0, field)
      return next
    })
  }

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(p =>
      withRequiredGitHubField(
        p.map(f =>
          f.id === id
            ? {
                ...f,
                ...updates,
                ...(updates.type === "select" && !f.options ? { options: [] } : {}),
                ...(updates.type && updates.type !== "select" ? { options: undefined } : {}),
                ...(f.locked ? { required: true } : {}),
              }
            : f
        )
      )
    )
  }

  const removeField = (id: string) => {
    setFields(p => withRequiredGitHubField(p.filter(f => f.id !== id || f.locked)))
  }

  const reorderField = (fromId: string, toId: string) => {
    if (fromId === toId) return

    setFields(p => {
      const fromIndex = p.findIndex((field) => field.id === fromId)
      const toIndex = p.findIndex((field) => field.id === toId)

      if (fromIndex < 0 || toIndex < 0) return p

      const next = [...p]
      const [moved] = next.splice(fromIndex, 1)
      next.splice(toIndex, 0, moved)
      return withRequiredGitHubField(next)
    })
  }

  const addOption = (id: string, value: string) => {
    setFields(p =>
      p.map(f =>
        f.id === id && f.type === "select"
          ? { ...f, options: [...(f.options || []), value] }
          : f
      )
    )
  }

  const removeOption = (id: string, index: number) => {
    setFields(p =>
      p.map(f =>
        f.id === id && f.type === "select"
          ? { ...f, options: f.options?.filter((_, i) => i !== index) }
          : f
      )
    )
  }

  /* -------------------------
     Save
  -------------------------- */
  const save = async () => {
    if (!details.domainId) {
      toast.error("Domain is required", { description: "Please select a domain for this form." })
      return
    }
    if (!details.formTitle.trim()) {
      toast.error("Form title is required", { description: "Please enter a title for your form." })
      return
    }
    if (!details.expiresAt) {
      toast.error("Expiry date is required", { description: "Please select an expiry date for your form." })
      return
    }
    if (!fields.length) {
      toast.error("Form fields are required", { description: "Please add at least one field to your form." })
      return
    }

    try {
      await createFormMutation.mutateAsync({
        details,
        fields: withRequiredGitHubField(fields),
      })
      clearDraft()
    } catch (error) {
      // Error handling is done in useCreateForm hook
    }
  }

  /* -------------------------
     Public API
  -------------------------- */
  return {
    // Step-1
    details,
    updateDetails,

    // Step-2
    fields,
    selectedFieldType,
    setSelectedFieldType,

    addField,
    updateField,
    removeField,
    reorderField,
    addOption,
    removeOption,

    // Save
    save,
    isSaving: createFormMutation.isPending,
    hasLocalDraft,
    resetDraft,
  }
}
