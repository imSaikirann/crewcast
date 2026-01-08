"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateRecruiterSchema } from "@/lib/validators/recruiter"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
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
    mutationFn: async (data: FormData) => {
      const response = await api.post("/api/recruiters/new-account", data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruiter-profile"] })
      onSuccess?.()
    },
  })

  const updateMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.put("/api/recruiters/profile", data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruiter-profile"] })
      onSuccess?.()
    },
  })

  const onSubmit = async (data: FormData) => {
    setError(null)
    try {
      if (existingProfile) {
        await updateMutation.mutateAsync(data)
      } else {
        await createMutation.mutateAsync(data)
      }
    } catch (err: any) {
      // Handle field-specific errors
      const fieldErrors = err.response?.data?.errors
      if (fieldErrors) {
        const errorMessages = Object.entries(fieldErrors)
          .map(([field, messages]) => `${field}: ${(messages as string[]).join(", ")}`)
          .join("\n")
        setError(errorMessages)
      } else {
        const errorMessage =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to save profile. Please try again."
        setError(errorMessage)
      }
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card border rounded-lg p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">
            {existingProfile ? "Edit Company Profile" : "Setup Profile for Hiring"}
          </h2>
          <p className="text-muted-foreground mt-1">
            {existingProfile
              ? "Update your company information"
              : "Create your company profile to start posting jobs"}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="companyName">
              Company Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="companyName"
              type="text"
              placeholder="Acme Inc."
              {...register("companyName")}
              className="h-11"
            />
            {errors.companyName && (
              <p className="text-sm text-destructive">{errors.companyName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyEmail">
              Company Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="companyEmail"
              type="email"
              placeholder="contact@acme.com"
              {...register("companyEmail")}
              className="h-11"
            />
            {errors.companyEmail && (
              <p className="text-sm text-destructive">{errors.companyEmail.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              placeholder="https://acme.com"
              {...register("website")}
              className="h-11"
            />
            {errors.website && (
              <p className="text-sm text-destructive">{errors.website.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedinLink">LinkedIn URL</Label>
            <Input
              id="linkedinLink"
              type="url"
              placeholder="https://linkedin.com/company/acme"
              {...register("linkedinLink")}
              className="h-11"
            />
            {errors.linkedinLink && (
              <p className="text-sm text-destructive">{errors.linkedinLink.message}</p>
            )}
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            {existingProfile && onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting || createMutation.isPending || updateMutation.isPending}
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              disabled={isSubmitting || createMutation.isPending || updateMutation.isPending}
              className={existingProfile && onCancel ? "flex-1" : "w-full"}
            >
              {isSubmitting || createMutation.isPending || updateMutation.isPending
                ? "Saving..."
                : existingProfile
                  ? "Update Profile"
                  : "Create Profile"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

