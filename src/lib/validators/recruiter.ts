import { z } from "zod"

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
    .email("Invalid company email")
    .refine(
      (email) => email.endsWith("@gmail.com") &&
                 !email.endsWith("@yahoo.com") &&
                 !email.endsWith("@outlook.com"),
      "Use your company email, not Gmail or Outlook"
    ),

  linkedinLink: z
    .string()
    .url("Invalid LinkedIn URL")
    .or(z.literal("")),
})
