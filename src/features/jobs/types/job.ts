export type Job = {
  id: string
  publicId: string
  title: string
  description: string
  techStack: string[]
  salaryMin: number
  salaryMax: number
  experience: "JUNIOR" | "MID" | "SENIOR"
  location: string
  roleType: "FULL_TIME" | "PART_TIME" | "CONTRACT"
  workMode: "REMOTE" | "HYBRID" | "ONSITE"
}
