import { useQuery } from "@tanstack/react-query"
import {domainService} from "../services/domain.service" 

export const useDomainsList = () => {
  return useQuery({
    queryKey: ["domains-list"],
    queryFn: domainService.listDomains,
    staleTime: 1000 * 60 * 5, 
    retry: 1,
  })
}
