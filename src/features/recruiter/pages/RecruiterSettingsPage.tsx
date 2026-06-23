"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/lib/api"
import { toast } from "@/lib/toast"
import { HugeIcon } from "@/utils/hugeicons"
import { useRecruiterProfile } from "@/features/recruiter/hooks/useRecruiterProfile"

export default function RecruiterSettingsPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data: recruiter, isLoading, error } = useRecruiterProfile()

  const deleteProfile = useMutation({
    mutationFn: async () => (await api.delete("/api/recruiters/profile")).data,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["recruiter-profile"] })
      toast.success("Recruiter profile deleted", {
        description: "You can create a new company profile whenever you need one.",
      })
      router.push("/dashboard/recruiter/profile")
    },
    onError: (err: any) => {
      toast.error("Could not delete profile", {
        description: err?.response?.data?.message || err?.response?.data?.error || "Please try again.",
      })
    },
  })

  const onDelete = () => {
    const confirmed = window.confirm(
      "Delete this recruiter profile and all of its job forms, applications, and reports? This cannot be undone."
    )

    if (confirmed) {
      deleteProfile.mutate()
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="border-b pb-5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-3 h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-80 max-w-full" />
        </div>
        <Skeleton className="h-56 rounded-lg" />
      </div>
    )
  }

  if (error || !recruiter) {
    return (
      <Alert variant="destructive" className="rounded-lg">
        <AlertTitle>Settings unavailable</AlertTitle>
        <AlertDescription>Create a recruiter profile before managing settings.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Settings
        </p>
        <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight">
          Workspace settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          The only account-level action here is deleting the recruiter workspace.
        </p>
      </div>

      <Card className="max-w-3xl rounded-lg border-muted-foreground/15 py-5 shadow-xs">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-display text-base font-semibold">
            <HugeIcon name="credit-card" className="size-5 text-primary" />
            Plan limits
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <UsageMeter
              label="Active published forms"
              value={recruiter.activeFormCount}
              limit={recruiter.formLimit}
            />
            <UsageMeter
              label="Monthly form creation"
              value={recruiter.totalFormsCount}
              limit={recruiter.totalFormsLimit}
            />
          </div>
          <Button disabled variant="outline">
            <HugeIcon name="credit-card" className="size-4" />
            Upgrade plan
          </Button>
        </CardContent>
      </Card>

      <Card className="max-w-3xl rounded-lg border-destructive/30 py-5 shadow-xs">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-display text-base font-semibold text-destructive">
            <HugeIcon name="delete" className="size-5" />
            Delete recruiter profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive" className="rounded-lg">
            <AlertTitle>Permanent action</AlertTitle>
            <AlertDescription>
              This deletes {recruiter.companyName}, its job forms, applications, form views, and reports.
            </AlertDescription>
          </Alert>

          <Button
            variant="destructive"
            onClick={onDelete}
            disabled={deleteProfile.isPending}
          >
            <HugeIcon name={deleteProfile.isPending ? "loading" : "delete"} className="size-4" />
            {deleteProfile.isPending ? "Deleting..." : "Delete profile"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function UsageMeter({
  label,
  value,
  limit,
}: {
  label: string
  value: number
  limit: number
}) {
  const percent = limit > 0 ? Math.min(100, Math.round((value / limit) * 100)) : 0

  return (
    <div className="rounded-lg border bg-background p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
          {value}/{limit}
        </span>
      </div>
      <div className="mt-3 h-2 rounded-full bg-muted">
        <div className="h-2 rounded-full bg-primary" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

