import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hashToken } from "@/lib/tokens"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get("token")

  if (!token) {
    return NextResponse.json({ message: "Missing token" }, { status: 400 })
  }

  const tokenHash = hashToken(token)

  const record = await prisma.emailVerification.findFirst({
    where: {
      tokenHash,
      used: false,
      expiresAt: { gt: new Date() },
    },
  })

  if (!record) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 400 }
    )
  }

  await prisma.$transaction(async (tx) => {
    await tx.recruiter.update({
      where: { userId: record.userId },
      data: { verified: true },
    })

    await tx.emailVerification.update({
      where: { id: record.id },
      data: { used: true },
    })
  })

  return NextResponse.redirect(
    new URL("/dashboard?verified=true", process.env.NEXTAUTH_URL!)
  )
}
