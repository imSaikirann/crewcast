import { Suspense } from "react"
import RecruiterVerificationClient from "./RecruiterVerificationClient"

export const dynamic = "force-dynamic"

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <RecruiterVerificationClient />
    </Suspense>
  )
}
