import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { plan } = await req.json()

  if (!plan) {
    return NextResponse.json({ message: "Plan required" }, { status: 400 })
  }

  const recruiter = await prisma.recruiter.findUnique({
    where: { userId: session.user.id },
  })

  if (!recruiter) {
    return NextResponse.json({ message: "Recruiter not found" }, { status: 404 })
  }

  await prisma.upgradeRequest.create({
    data: {
      userId: session.user.id,
      email: session.user.email,
      company: recruiter.companyName,
      plan,
    },
  })

  return NextResponse.json({ message: "Upgrade request sent" })
}
