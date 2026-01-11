"use client";
import { useQuery } from "@tanstack/react-query";
import { listDomainDefaultFrom } from "../services/domains";

export const useDomainDefaultForm = (domainId: string | null) => {
  return useQuery({
    queryKey: ["domain-default-form", domainId],
    enabled: !!domainId,
    queryFn: async () => {
      const data = await listDomainDefaultFrom(domainId!);
      return data ?? null; 
    },
    staleTime: 1000 * 60,
  });
};
