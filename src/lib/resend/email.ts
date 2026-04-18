import { Resend } from "resend";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }

  return new Resend(apiKey);
}

export async function sendRecruiterVerificationEmail(
  email: string,
  token: string
) {
  const resend = getResendClient();

  const baseUrl = process.env.NEXTAUTH_URL;

  if (!baseUrl) {
    throw new Error("NEXTAUTH_URL is not set");
  }

  const link = `${baseUrl}/dashboard/recruiter/verification?token=${token}`;

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
  });
}