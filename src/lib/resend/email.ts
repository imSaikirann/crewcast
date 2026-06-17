import { Resend } from "resend"

function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL || process.env.EMAIL_FROM

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set")
  }

  if (!from) {
    throw new Error("RESEND_FROM_EMAIL or EMAIL_FROM is not set")
  }

  return { apiKey, from }
}

export async function sendRecruiterVerificationEmail(
  email: string,
  token: string
) {
  const { apiKey, from } = getResendConfig()
  const baseUrl = process.env.NEXTAUTH_URL

  if (!baseUrl) {
    throw new Error("NEXTAUTH_URL is not set")
  }

  const resend = new Resend(apiKey)
  const link = `${baseUrl}/api/recruiters/new-account/verify?token=${token}`

  const { data, error } = await resend.emails.send({
    from,
    to: email,
    subject: "Verify your company email on Crewcast",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #111827;">
        <h1 style="font-size: 24px; margin-bottom: 12px;">Verify your company email</h1>
        <p style="font-size: 15px; line-height: 1.6;">Crewcast needs to confirm this company email before job forms can be created.</p>
        <p style="font-size: 15px; line-height: 1.6;">Use the button below to finish verification. The link expires in 24 hours.</p>
        <p style="margin: 28px 0;">
          <a href="${link}" style="background: #111827; color: #ffffff; padding: 12px 18px; border-radius: 6px; text-decoration: none; display: inline-block;">
            Verify company email
          </a>
        </p>
        <p style="font-size: 13px; line-height: 1.5; color: #6b7280;">If the button does not work, copy this link into your browser:<br />${link}</p>
      </div>
    `,
    text: `Verify your company email on Crewcast: ${link}`,
  })

  if (error) {
    throw new Error(`Resend email failed: ${error.message}`)
  }

  return data
}

export async function sendMagicLinkEmail(email: string, url: string) {
  const { apiKey, from } = getResendConfig()
  const resend = new Resend(apiKey)

  const { data, error } = await resend.emails.send({
    from,
    to: email,
    subject: "Your Crewcast sign-in link",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #111827;">
        <h1 style="font-size: 22px; margin-bottom: 12px;">Sign in to Crewcast</h1>
        <p style="font-size: 15px; line-height: 1.6;">Click the button below to securely sign in. This link expires in 24 hours and can only be used once.</p>
        <p style="margin: 28px 0;">
          <a href="${url}" style="background: #111827; color: #ffffff; padding: 12px 18px; border-radius: 6px; text-decoration: none; display: inline-block;">
            Sign in to Crewcast
          </a>
        </p>
        <p style="font-size: 13px; line-height: 1.5; color: #6b7280;">If the button does not work, copy this link into your browser:<br />${url}</p>
        <p style="font-size: 13px; line-height: 1.5; color: #6b7280;">If you did not request this email, you can safely ignore it.</p>
      </div>
    `,
    text: `Sign in to Crewcast: ${url}`,
  })

  if (error) {
    throw new Error(`Resend email failed: ${error.message}`)
  }

  return data
}
