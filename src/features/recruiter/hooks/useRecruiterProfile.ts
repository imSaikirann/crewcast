import { useQuery } from "@tanstack/react-query"
import { recruiterService } from "../services/recruiter.service"

export const useRecruiterProfile = () => {
  return useQuery({
    queryKey: ["recruiter-profile"],
    queryFn: recruiterService.getProfile,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  })
}
