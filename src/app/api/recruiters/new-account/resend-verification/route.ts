import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { createAndSendRecruiterVerification } from "@/lib/recruiterVerification"

export async function POST() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const recruiter = await prisma.recruiter.findUnique({
      where: { userId: session.user.id },
      select: {
        companyEmail: true,
        verified: true,
      },
    })

    if (!recruiter) {
      return NextResponse.json({ message: "Recruiter profile not found" }, { status: 404 })
    }

    if (recruiter.verified) {
      return NextResponse.json({ message: "Company email is already verified" }, { status: 409 })
    }

    await createAndSendRecruiterVerification(session.user.id, recruiter.companyEmail)

    return NextResponse.json({ message: "Verification email sent" })
  } catch (error) {
    console.error("Resend verification email error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
