"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/lib/api"
import { toast } from "@/lib/toast"
import { HugeIcon } from "@/utils/hugeicons"
import { useRecruiterProfile } from "@/features/recruiter/hooks/useRecruiterProfile"
import ProfileSetupForm from "../components/ProfileSetupForm"

export default function RecruiterProfilePage() {
  const { data: recruiter, isLoading, error } = useRecruiterProfile()
  const [isEditing, setIsEditing] = useState(false)
  const searchParams = useSearchParams()
  const onboardingMode = searchParams.get("onboarding")
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
    return <ProfileSkeleton />
  }

  const profileNotFound =
    error && ((error as any)?.response?.status === 404 || (error as any)?.status === 404)
  const showSetupForm = profileNotFound || isEditing

  if (showSetupForm) {
    return (
      <OnboardingPanel>
        <ProfileSetupForm
          existingProfile={isEditing ? recruiter : null}
          onSuccess={() => setIsEditing(false)}
          onCancel={isEditing ? () => setIsEditing(false) : undefined}
        />
      </OnboardingPanel>
    )
  }

  if (error || !recruiter) {
    return (
      <Alert variant="destructive" className="mx-auto max-w-3xl rounded-lg">
        <AlertTitle>Profile could not be loaded</AlertTitle>
        <AlertDescription>Refresh the page or sign in again to continue.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      {onboardingMode === "verify" && !recruiter.verified && (
        <Alert variant="warning" className="rounded-lg">
          <AlertTitle>Verify before entering the dashboard</AlertTitle>
          <AlertDescription>
            We sent a link to {recruiter.companyEmail}. The dashboard opens after company email verification.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Company profile
          </p>
          <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight">
            {recruiter.companyName}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage company identity and verification details.
          </p>
        </div>
        <Button onClick={() => setIsEditing(true)}>
          <HugeIcon name="edit" className="size-4" />
          Edit profile
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <Card className="rounded-lg border-muted-foreground/15 py-5 shadow-xs">
          <CardHeader>
            <CardTitle className="font-display text-base font-semibold">
              Company details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <Info label="Company email" value={recruiter.companyEmail} />
            <Info label="Plan" value={recruiter.plan} />
            <Info label="Website URL" value={recruiter.website || "Not set"} />
            <Info label="LinkedIn URL" value={recruiter.linkedinLink || "Not set"} />
          </CardContent>
        </Card>

        <Card className="rounded-lg border-muted-foreground/15 py-5 shadow-xs">
          <CardHeader>
            <CardTitle className="font-display text-base font-semibold">
              Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!recruiter.verified ? (
              <Alert variant="warning" className="rounded-lg">
                <AlertTitle>Company email not verified</AlertTitle>
                <AlertDescription>
                  Publishing is locked until you verify {recruiter.companyEmail}.
                </AlertDescription>
                <Button
                  variant="outline"
                  className="mt-4 bg-background"
                  onClick={() => resendVerification.mutate()}
                  disabled={resendVerification.isPending}
                >
                  <HugeIcon name={resendVerification.isPending ? "loading" : "mail"} className="size-4" />
                  {resendVerification.isPending ? "Sending..." : "Send verification email"}
                </Button>
              </Alert>
            ) : (
              <div className="flex items-start gap-3 rounded-lg border border-[#4CAF82]/30 bg-[#4CAF82]/10 p-4 text-sm text-[#2F7A58]">
                <HugeIcon name="verified-checkmark" className="mt-0.5 size-5" />
                <div>
                  <p className="font-medium">Email verified</p>
                  <p className="mt-1 opacity-90">{recruiter.companyEmail} can publish forms.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function OnboardingPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-[calc(100vh-180px)] place-items-center py-8">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Recruiter onboarding"
        className="w-full max-w-2xl rounded-2xl border bg-background p-3 shadow-xl"
      >
        <div className="rounded-xl border bg-card/70 p-4">
          <div className="mb-5 rounded-lg border bg-secondary/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Step 1 of 2
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">
              Create a recruiter profile
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Add your company identity and verify a company-domain email. You can open the dashboard after verification.
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-secondary px-3 py-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 truncate text-sm font-medium text-foreground">{value}</p>
    </div>
  )
}

function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="border-b pb-5">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-3 h-8 w-64" />
        <Skeleton className="mt-2 h-4 w-80 max-w-full" />
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <Skeleton className="h-64 rounded-lg" />
        <Skeleton className="h-64 rounded-lg" />
      </div>
    </div>
  )
}
