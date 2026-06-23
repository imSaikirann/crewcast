"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from "@/lib/api"
import { toast } from "@/lib/toast"
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
      toast.success("Profile created", {
        description: "We sent a verification link to your company email.",
      })
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
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to save profile. Please try again."
      )
    }
  }

  const pending = isSubmitting || createMutation.isPending || updateMutation.isPending

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {!existingProfile && (
        <p className="text-sm text-muted-foreground">
          Use a company email that matches your website. Personal inboxes like Gmail are not
          supported.
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <ProfileField label="Company name" error={errors.companyName?.message}>
          <Input placeholder="Acme Inc." {...register("companyName")} />
        </ProfileField>
        <ProfileField label="Company email" error={errors.companyEmail?.message}>
          <Input type="email" placeholder="contact@acme.com" {...register("companyEmail")} />
        </ProfileField>
        <ProfileField label="Website URL" error={errors.website?.message}>
          <Input type="url" placeholder="https://acme.com" {...register("website")} />
        </ProfileField>
        <ProfileField label="LinkedIn URL" error={errors.linkedinLink?.message}>
          <Input
            type="url"
            placeholder="https://linkedin.com/company/acme"
            {...register("linkedinLink")}
          />
        </ProfileField>
      </div>

      {error && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3 border-t pt-5">
        {existingProfile && onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel} disabled={pending}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={pending} className="ml-auto">
          {pending ? "Saving..." : existingProfile ? "Save changes" : "Create profile"}
        </Button>
      </div>
    </form>
  )
}

function ProfileField({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[13px] font-medium text-muted-foreground">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
