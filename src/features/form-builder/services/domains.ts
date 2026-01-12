import axios from 'axios'
import { FormField, JobFormDetails } from '../types/types'

export const listDomainDefaultFrom = async (domainId:string) => {
    const response = await axios.get(`/api/domains/defaults/${domainId}`)
    return response.data

}



export async function createForm(details: JobFormDetails, fields: FormField[]) {
  // Filter out empty strings and set defaults for required enum fields
  const payload: any = {
    ...details,
    expiresAt: new Date(details.expiresAt),
    fields,
  }

  // Set default roleType if empty or invalid
  const validRoleTypes = ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"]
  if (!payload.roleType || !validRoleTypes.includes(payload.roleType)) {
    payload.roleType = "FULL_TIME"
  }

  // Set default experience if empty or invalid
  const validExperience = ["JUNIOR", "MID", "SENIOR", "LEAD"]
  if (!payload.experience || !validExperience.includes(payload.experience)) {
    payload.experience = "JUNIOR"
  }

  // Ensure specialization is always a string (required field in Prisma)
  if (payload.specialization === undefined || payload.specialization === null) {
    payload.specialization = ""
  }

  const { data } = await axios.post("/api/recruiters/create-form", payload)

  return data
}
