import { api } from "@/lib/api"
import { Recruiter } from "../types/recruiter"

export const recruiterService = {
  getProfile: async (): Promise<Recruiter> => {
    const { data } = await api.get("/api/recruiters/profile")
    return data
  },
  updateProfile: async (profileData: {
    companyName: string
    companyEmail: string
    website: string
    linkedinLink: string
  }): Promise<Recruiter> => {
    const { data } = await api.put("/api/recruiters/profile", profileData)
    return data
  },
}
