import { prisma } from "@/lib/prisma"
import { sendRecruiterVerificationEmail } from "@/lib/resend/email"
import { generateToken, hashToken } from "@/lib/tokens"

const VERIFICATION_TTL_MS = 1000 * 60 * 60 * 24

export async function createAndSendRecruiterVerification(
  userId: string,
  email: string
) {
  const rawToken = generateToken()
  const tokenHash = hashToken(rawToken)

  await prisma.$transaction(async (tx) => {
    await tx.emailVerification.deleteMany({
      where: {
        userId,
        used: false,
      },
    })

    await tx.emailVerification.create({
      data: {
        userId,
        email,
        tokenHash,
        expiresAt: new Date(Date.now() + VERIFICATION_TTL_MS),
      },
    })
  })

  await sendRecruiterVerificationEmail(email, rawToken)
}
