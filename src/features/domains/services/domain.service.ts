import { api } from "@/lib/api"
import { Domain } from "../types/domain"


export const domainService = {
  listDomains: async (): Promise<Domain[]> => {
    const { data } = await api.get("/api/domains/")
    return data
  },
 
}
