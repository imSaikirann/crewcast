type UnosendEmailPayload = {
  from: string
  to: string[]
  subject: string
  html: string
  text?: string
}

const UNOSEND_EMAIL_ENDPOINT = "https://api.unosend.co/v1/emails"

function getUnosendConfig() {
  const apiKey = process.env.UNOSEND_API_KEY
  const from = process.env.UNOSEND_FROM_EMAIL || process.env.EMAIL_FROM

  if (!apiKey) {
    throw new Error("UNOSEND_API_KEY is not set")
  }

  if (!from) {
    throw new Error("UNOSEND_FROM_EMAIL is not set")
  }

  return { apiKey, from }
}

async function sendUnosendEmail(payload: UnosendEmailPayload) {
  const { apiKey } = getUnosendConfig()

  const response = await fetch(UNOSEND_EMAIL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const details = await response.text().catch(() => "")
    throw new Error(`Unosend email failed: ${response.status} ${details}`)
  }

  return response.json().catch(() => null)
}

export async function sendRecruiterVerificationEmail(
  email: string,
  token: string
) {
  const { from } = getUnosendConfig()
  const baseUrl = process.env.NEXTAUTH_URL

  if (!baseUrl) {
    throw new Error("NEXTAUTH_URL is not set")
  }

  const link = `${baseUrl}/api/recruiters/new-account/verify?token=${token}`

  return sendUnosendEmail({
    from,
    to: [email],
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
}
