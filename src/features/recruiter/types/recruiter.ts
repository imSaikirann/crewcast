export type Recruiter = {
  id: string
  companyName: string
  companyEmail: string
  website: string
  linkedinLink: string
  verified: boolean

  plan: "STARTER" | "PRO" | "BUSINESS"

  formLimit: number
  activeFormCount: number
  totalFormsCount: number
  totalFormsLimit: number

  createdAt: string
}
