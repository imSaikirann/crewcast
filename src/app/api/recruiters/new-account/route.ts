import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

import { getServerSession } from "next-auth"
import { CreateRecruiterSchema } from "@/lib/validators/recruiter"
import { authOptions } from "../../auth/[...nextauth]/route"
import { createAndSendRecruiterVerification } from "@/lib/recruiterVerification"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id || !session.user.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const parsed = CreateRecruiterSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid input", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { companyName, website, linkedinLink,companyEmail } = parsed.data

    const recruiter = await prisma.$transaction(async (tx) => {
      const exists = await tx.recruiter.findUnique({
        where: { userId: session.user.id },
      })
      if (exists) throw new Error("RECRUITER_EXISTS")

      const rec = await tx.recruiter.create({
        data: {
          userId: session.user.id,
          companyName,
          companyEmail,
          website,
          linkedinLink,
          verified: false,
        },
      })

      return rec
    })

    await createAndSendRecruiterVerification(session.user.id, companyEmail)

    return NextResponse.json(
      { message: "Verification email sent", recruiter },
      { status: 201 }
    )
  } catch (err: any) {
    if (err.message === "RECRUITER_EXISTS") {
      return NextResponse.json(
        { message: "Recruiter profile already exists" },
        { status: 409 }
      )
    }
    console.log(err)

    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
