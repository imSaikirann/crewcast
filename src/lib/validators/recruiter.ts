import { z } from "zod"

const personalEmailDomains = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "icloud.com",
  "me.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "pm.me",
  "zoho.com",
  "yandex.com",
  "mail.com",
])

function getDomainFromEmail(email: string) {
  return email.toLowerCase().trim().split("@")[1] ?? ""
}

function getDomainFromUrl(value: string) {
  if (!value) return ""

  try {
    return new URL(value).hostname.toLowerCase().replace(/^www\./, "")
  } catch {
    return ""
  }
}

export const CreateRecruiterSchema = z.object({
  companyName: z
    .string()
    .min(2, "Company name too short")
    .max(100)
    .transform((v) => v.trim()),

  website: z
    .string()
    .url("Invalid website URL")
    .or(z.literal("")),

  companyEmail: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid company email"),

  linkedinLink: z
    .string()
    .url("Invalid LinkedIn URL")
    .or(z.literal("")),
}).superRefine((data, ctx) => {
  const emailDomain = getDomainFromEmail(data.companyEmail)
  const websiteDomain = getDomainFromUrl(data.website)

  if (personalEmailDomains.has(emailDomain)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["companyEmail"],
      message: "Use a company email address. Gmail, Outlook, Yahoo, and other personal inboxes are not supported.",
    })
  }

  if (websiteDomain && emailDomain !== websiteDomain && !emailDomain.endsWith(`.${websiteDomain}`)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["companyEmail"],
      message: `Use an email from ${websiteDomain} so we can verify the company.`,
    })
  }
})
