"use client"

import { useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"

export default function RecruiterVerificationPage() {
  const params = useSearchParams()
  const router = useRouter()
  const token = params.get("token")

  useEffect(() => {
    if (!token) {
      router.replace("/dashboard?verified=false")
      return
    }

    // Forward token to backend
    fetch(`/api/recruiters/new-account/verify?token=${token}`)
      .then(() => {
        // Backend will redirect if successful
      })
      .catch(() => {
        router.replace("/dashboard?verified=false")
      })
  }, [token, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950 text-black dark:text-white">
      <div className="text-center space-y-4">
        <h1 className="text-xl font-semibold">Verifying your company…</h1>
        <p className="text-neutral-500">
          Please wait while we confirm your email.
        </p>
      </div>
    </div>
  )
}
