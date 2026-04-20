"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CheckCircle, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import { toast } from "@/lib/toast"
import { useRecruiterProfile } from "@/features/recruiter/hooks/useRecruiterProfile"
import ProfileSetupForm from "../components/ProfileSetupForm"

export default function RecruiterProfilePage() {
  const { data: recruiter, isLoading, error } = useRecruiterProfile()
  const [isEditing, setIsEditing] = useState(false)
  const queryClient = useQueryClient()
  const resendVerification = useMutation({
    mutationFn: async () => {
      const response = await api.post("/api/recruiters/new-account/resend-verification")
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruiter-profile"] })
      toast.success("Verification email sent", {
        description: "Check your company inbox for the new link.",
      })
    },
    onError: (err: any) => {
      toast.error("Could not send verification email", {
        description: err?.response?.data?.message || err?.message || "Please try again.",
      })
    },
  })

  if (isLoading) {
    return <div className="min-h-screen py-24 text-center text-muted-foreground">Loading your company profile...</div>
  }

  const profileNotFound =
    error && ((error as any)?.response?.status === 404 || (error as any)?.status === 404)
  const showSetupForm = profileNotFound || isEditing

  if (showSetupForm) {
    return (
      <div>
        <ProfileSetupForm
          existingProfile={isEditing ? recruiter : null}
          onSuccess={() => setIsEditing(false)}
          onCancel={isEditing ? () => setIsEditing(false) : undefined}
        />
      </div>
    )
  }

  if (error || !recruiter) {
    return <div className="min-h-screen py-24 text-center text-destructive">Failed to load recruiter profile</div>
  }

  return (
    <div>
      <div className="mx-auto max-w-[560px] space-y-8">
        <section className="rounded-xl border bg-card p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Company profile</p>
              <h1 className="mt-2 font-display text-xl font-semibold">{recruiter.companyName}</h1>
            </div>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setIsEditing(true)}>
              Save changes
            </Button>
          </div>
          <div className="space-y-3 text-sm">
            <Info label="Company email" value={recruiter.companyEmail} />
            <Info label="Website URL" value={recruiter.website || "Not set"} />
            <Info label="LinkedIn URL" value={recruiter.linkedinLink || "Not set"} />
          </div>
        </section>

        <section className="border-t pt-8">
          {!recruiter.verified ? (
            <div className="rounded-xl border border-primary/30 bg-accent p-4 text-accent-foreground">
              <p className="font-medium">Your company email is not verified.</p>
              <p className="mt-1 text-sm opacity-80">
                You cannot publish forms until verified.
              </p>
              <Button
                variant="outline"
                className="mt-4 border-primary/50 bg-background text-primary hover:bg-secondary"
                onClick={() => resendVerification.mutate()}
                disabled={resendVerification.isPending}
              >
                {resendVerification.isPending ? "Sending..." : "Send verification email"}
              </Button>
              <p className="mt-3 text-xs text-muted-foreground">Check your inbox at {recruiter.companyEmail}</p>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-sm text-[#4CAF82]">
              <CheckCircle className="size-5" />
              <span>{recruiter.companyEmail} is verified</span>
            </div>
          )}
        </section>

        <section className="border-t pt-6">
          <button className="inline-flex items-center gap-2 text-[13px] text-destructive">
            <Trash2 className="size-4" />
            Delete account
          </button>
        </section>
      </div>
    </div>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-secondary px-3 py-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 truncate text-foreground">{value}</p>
    </div>
  )
}
