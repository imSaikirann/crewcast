"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from "@/lib/api"
import { CreateRecruiterSchema } from "@/lib/validators/recruiter"
import type { Recruiter } from "../types/recruiter"

type FormData = {
  companyName: string
  companyEmail: string
  website: string
  linkedinLink: string
}

interface ProfileSetupFormProps {
  existingProfile?: Recruiter | null
  onSuccess?: () => void
  onCancel?: () => void
}

export default function ProfileSetupForm({ existingProfile, onSuccess, onCancel }: ProfileSetupFormProps) {
  const [error, setError] = useState<string | null>(null)
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(CreateRecruiterSchema),
    defaultValues: existingProfile
      ? {
          companyName: existingProfile.companyName,
          companyEmail: existingProfile.companyEmail,
          website: existingProfile.website,
          linkedinLink: existingProfile.linkedinLink,
        }
      : undefined,
  })

  const createMutation = useMutation({
    mutationFn: async (data: FormData) => (await api.post("/api/recruiters/new-account", data)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruiter-profile"] })
      onSuccess?.()
    },
  })

  const updateMutation = useMutation({
    mutationFn: async (data: FormData) => (await api.put("/api/recruiters/profile", data)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruiter-profile"] })
      onSuccess?.()
    },
  })

  const onSubmit = async (data: FormData) => {
    setError(null)
    try {
      if (existingProfile) await updateMutation.mutateAsync(data)
      else await createMutation.mutateAsync(data)
    } catch (err: any) {
      setError(err.response?.data?.message || err.response?.data?.error || "Failed to save profile. Please try again.")
    }
  }

  const pending = isSubmitting || createMutation.isPending || updateMutation.isPending

  return (
    <div className="mx-auto max-w-[560px]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-xl border bg-card p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Company profile</p>
          <h1 className="mt-2 font-display text-xl font-semibold">
            {existingProfile ? "Edit profile" : "Create profile"}
          </h1>
        </div>

        <ProfileField label="Company name" error={errors.companyName?.message}>
          <Input className="cc-input" placeholder="Acme Inc." {...register("companyName")} />
        </ProfileField>
        <ProfileField label="Company email" error={errors.companyEmail?.message}>
          <Input className="cc-input" type="email" placeholder="contact@acme.com" {...register("companyEmail")} />
        </ProfileField>
        <ProfileField label="Website URL" error={errors.website?.message}>
          <Input className="cc-input" type="url" placeholder="https://acme.com" {...register("website")} />
        </ProfileField>
        <ProfileField label="LinkedIn URL" error={errors.linkedinLink?.message}>
          <Input className="cc-input" type="url" placeholder="https://linkedin.com/company/acme" {...register("linkedinLink")} />
        </ProfileField>

        {error && (
          <Alert variant="destructive">
            <AlertTitle>Profile not saved</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex gap-3 border-t pt-5">
          {existingProfile && onCancel && (
            <Button type="button" variant="ghost" onClick={onCancel} disabled={pending}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={pending} className="ml-auto bg-primary text-primary-foreground hover:bg-primary/90">
            {pending ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}

function ProfileField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-[13px] font-medium text-muted-foreground">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">x {error}</p>}
    </div>
  )
}
