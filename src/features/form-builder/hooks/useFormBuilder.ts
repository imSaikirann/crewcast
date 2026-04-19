import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import axios from "axios"
import { FieldType, FormField } from "../types/types"
import { RoleType } from "@prisma/client"
import { nanoid } from "nanoid"
import { useDomainDefaultForm } from "./useDominDefaults"
import { useCreateForm } from "./useCreateForm"
import { toast } from "@/lib/toast"
import { withRequiredGitHubField } from "@/lib/formFields"

/* ---------------------------------------------
   Step-1 business model
---------------------------------------------- */
export interface JobFormDetails {
  formTitle: string
  formDescription: string
  expiresAt: string
  domainId: string
  roleType: string
  experience: string
  workMode: string
  location: string
  specialization: string
  techStack: string[]
  salaryMin: number
  salaryMax: number
  currency: string
  contractDurationMonths: number
}

/* ---------------------------------------------
   Hook
---------------------------------------------- */
export function useFormBuilder() {
  const router = useRouter()
  const params = useSearchParams()
  const domainId = params.get("domain")
const createFormMutation = useCreateForm()
  const { data: defaults } = useDomainDefaultForm(domainId)

  /* -------------------------
     Unified step-1 state
  -------------------------- */
  const [details, setDetails] = useState<JobFormDetails>({
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
    salaryMin: 0,
    salaryMax: 0,
    currency: "INR",
    contractDurationMonths: 0,
  })

  const updateDetails = <K extends keyof JobFormDetails>(
    key: K,
    value: JobFormDetails[K]
  ) => {
    setDetails(prev => ({ ...prev, [key]: value }))
  }

  /* -------------------------
     Step-2 fields
  -------------------------- */
  const [fields, setFields] = useState<FormField[]>(withRequiredGitHubField<FormField>([]))
  const [selectedFieldType, setSelectedFieldType] =
    useState<FieldType>("text")

  const generateId = () => `field-${nanoid(10)}`

  /* -------------------------
     Load defaults
  -------------------------- */
  useEffect(() => {
    if (!defaults) return

    setDetails(p => ({
      ...p,
      formTitle: defaults.formTitle || "",
      formDescription: defaults.formDescription || "",
      expiresAt: defaults.expiresAt
        ? new Date(defaults.expiresAt).toISOString().split("T")[0]
        : "",
    }))

    if (defaults.fields) {
      setFields(withRequiredGitHubField<FormField>(defaults.fields))
    }
  }, [defaults])

  /* -------------------------
     Field operations
  -------------------------- */
  const addField = (index?: number) => {
    const field: FormField = {
      id: generateId(),
      type: selectedFieldType,
      label: "",
      placeholder: "",
      required: false,
      ...(selectedFieldType === "select" ? { options: [] } : {}),
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
            ? { ...f, ...updates, ...(f.locked ? { required: true } : {}) }
            : f
        )
      )
    )
  }

  const removeField = (id: string) => {
    setFields(p => withRequiredGitHubField(p.filter(f => f.id !== id || f.locked)))
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
    addOption,
    removeOption,

    // Save
    save,
    isSaving: createFormMutation.isPending,
  }
}
