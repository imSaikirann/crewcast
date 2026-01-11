import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import axios from "axios"
import { FieldType, FormField } from "../types/types"
import { RoleType } from "@/generated/prisma/client";
import { nanoid } from "nanoid"

import { useDomainDefaultForm } from "./useDominDefaults"

export function useFormBuilder() {
  const router = useRouter()
  const params = useSearchParams()
  const domainId = params.get("domain")

  const { data: defaults } = useDomainDefaultForm(domainId)

  const [formTitle, setFormTitle] = useState("")
  const [formDescription, setFormDescription] = useState("")
  const [roleType, setRoleType] = useState<RoleType | null>(null)
  const [expiresAt, setExpiresAt] = useState("")
  const [fields, setFields] = useState<FormField[]>([])
  const [selectedFieldType, setSelectedFieldType] = useState<FieldType>("text")

  useEffect(() => {
    if (!defaults) return

    setFormTitle(defaults.formTitle || "")
    setFormDescription(defaults.formDescription || "")
    if (defaults.expiresAt) {
      setExpiresAt(new Date(defaults.expiresAt).toISOString().split("T")[0])
    }
    if (defaults.fields) setFields(defaults.fields)
  }, [defaults])

   const generateId = () => `field-${nanoid(10)}`


  const addField = (index?: number) => {
    const field: FormField = {
      id: generateId(),
      type: selectedFieldType,
      label: "",
      placeholder: "",
      required: false,
      ...(selectedFieldType === "select" ? { options: [] } : {}),
    }
    if (index !== undefined) {
      setFields(p => {
        const newFields = [...p]
        newFields.splice(index, 0, field)
        return newFields
      })
    } else {
      setFields(p => [...p, field])
    }
  }

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(p => p.map(f => (f.id === id ? { ...f, ...updates } : f)))
  }

  const removeField = (id: string) => {
    setFields(p => p.filter(f => f.id !== id))
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

  const save = async () => {
    if (!domainId) throw new Error("Missing domain")
    if (!formTitle.trim()) throw new Error("Title required")
    if (!expiresAt) throw new Error("Expiry required")
    if (!fields.length) throw new Error("No fields")

    await axios.post("/api/recruiters/create-form", {
      domainId,
      formTitle,
      formDescription,
      roleType,
      expiresAt: new Date(expiresAt),
      fields,
    })

    router.push("/dashboard")
  }

  return {
    formTitle,
    setFormTitle,
    formDescription,
    setFormDescription,
    roleType,
    setRoleType,
    expiresAt,
    setExpiresAt,
    fields,
    selectedFieldType,
    setSelectedFieldType,

    addField,
    updateField,
    removeField,
    addOption,
    removeOption,
    save,
  }
}
