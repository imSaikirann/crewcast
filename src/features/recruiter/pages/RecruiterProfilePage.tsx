"use client"

import { useRecruiterProfile } from "@/features/recruiter/hooks/useRecruiterProfile"
import ProfileHeader from "../components/ProfileHeader"
import ProfileCard from "../components/ProfileCard"
// import ProfileStats from "../components/ProfileStats"

import PlanUsageCard from "../components/PlanUsageCard"
import ProfileSetupForm from "../components/ProfileSetupForm"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function RecruiterProfilePage() {
  const { data: recruiter, isLoading, error } = useRecruiterProfile()
  const [isEditing, setIsEditing] = useState(false)
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading your company profile…
      </div>
    )
  }

  // Check if profile doesn't exist (404 error) or if editing
  const profileNotFound = error && 
    ((error as any)?.response?.status === 404 || 
     (error as any)?.status === 404)
  const showSetupForm = profileNotFound || isEditing

  if (showSetupForm) {
    return (
      <div className="min-h-screen bg-background py-10">
        <ProfileSetupForm
          existingProfile={isEditing ? recruiter : null}
          onSuccess={() => setIsEditing(false)}
          onCancel={isEditing ? () => setIsEditing(false) : undefined}
        />
      </div>
    )
  }

  if (error || !recruiter) {
    return (
      <div className="min-h-screen flex items-center justify-center text-destructive">
        Failed to load recruiter profile
      </div>
    )
  }

  const plan = {
    name: recruiter.plan,
    used: recruiter.activeFormCount,
    limit: recruiter.formLimit,
    totalUsed: recruiter.totalFormsCount,
    totalLimit: recruiter.totalFormsLimit,
  }

  const isBlocked =
    !recruiter.verified || recruiter.activeFormCount >= recruiter.formLimit

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b">
          <ProfileHeader recruiter={recruiter} />
          <Button
          size="default"
            onClick={() => setIsEditing(true)}
            className="text-xs cursor-pointer"
          >
            Edit Profile
          </Button>
        </div>

        {/* Alerts */}
        <div className="space-y-3">
          {!recruiter.verified && (
            <div className="border border-yellow-500/30 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 px-4 py-3 rounded-lg flex items-center gap-2">
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>We've sent a verification link to your email. Please verify to create job forms.</span>
            </div>
          )}

          {recruiter.verified && recruiter.activeFormCount >= recruiter.formLimit && (
            <div className="border border-red-500/30 bg-red-500/10 text-red-500 dark:text-red-400 px-4 py-3 rounded-lg flex items-center gap-2">
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>You've reached your active job limit. Upgrade your plan to post more jobs.</span>
            </div>
          )}

          {recruiter.verified && recruiter.activeFormCount < recruiter.formLimit && (
           <div className="
      flex items-start sm:items-center gap-3
      border border-emerald-500/30
      bg-emerald-500/10
      text-emerald-700 dark:text-emerald-400
      px-4 py-3 rounded-xl
    ">


      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
        <span className="font-medium">Profile verified</span>
        <span className="text-sm opacity-80">
          You can now create job forms.
        </span>
      </div>
    </div>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProfileCard recruiter={recruiter} />
          <PlanUsageCard plan={plan} />
        </div>
      </div>
    </div>
  )
}
