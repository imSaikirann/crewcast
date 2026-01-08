import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function sendRecruiterVerificationEmail(email: string, token: string) {
  const link = `${process.env.NEXTAUTH_URL!}/dashboard/recruiter/verification?token=${token}`

  await resend.emails.send({
    from: "Crewcast <onboarding@resend.dev>",
    to: email,
    subject: "Verify your company to start hiring",
    html: `
      <p>You're one step away from hiring on Crewcast.</p>
      <p>Click the link below to verify your company email:</p>
      <a href="${link}">${link}</a>
      <p>This link expires in 24 hours.</p>
    `,
  })
}
