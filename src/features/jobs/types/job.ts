export type Job = {
  id: string
  publicId: string
  title: string
  description: string
  techStack: string[]
  salaryMin: number | null
  salaryMax: number | null
  currency: string | null
  experience: "JUNIOR" | "MID" | "SENIOR" | "LEAD"
  location: string | null
  roleType: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP"
  workMode: "REMOTE" | "HYBRID" | "ONSITE"
  specialization: string
  expiresAt: string
  createdAt: string
  companyName: string | null
  companyVerified: boolean
  domainTitle: string | null
  applicationsCount: number
  viewCount: number
}
