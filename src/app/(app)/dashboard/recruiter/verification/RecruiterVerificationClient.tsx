"use client"

import { useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"

export default function RecruiterVerificationClient() {
  const params = useSearchParams()
  const router = useRouter()
  const token = params.get("token")

  useEffect(() => {
    if (!token) {
      router.replace("/dashboard?verified=false")
      return
    }

    fetch(`/api/recruiters/new-account/verify?token=${token}`)
      .then(() => {
        // backend handles redirect
      })
      .catch(() => {
        router.replace("/dashboard?verified=false")
      })
  }, [token, router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-4">
        <h1 className="text-xl font-semibold">
          Verifying your company…
        </h1>
        <p className="text-muted-foreground">
          Please wait while we confirm your email.
        </p>
      </div>
    </div>
  )
}
