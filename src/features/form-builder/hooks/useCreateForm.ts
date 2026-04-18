import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { JobFormDetails,FormField } from "../types/types"

import { createForm } from "../services/domains"
import { toast } from "@/lib/toast"

export function useCreateForm() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: ({
      details,
      fields,
    }: {
      details: JobFormDetails
      fields: FormField[]
    }) => createForm(details, fields),

    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["forms"] })
      toast.success("Form created successfully!", {
        description: "Redirecting back to your dashboard.",
      })
      await queryClient.invalidateQueries()
      router.push("/dashboard")
      router.refresh()
    },

    onError: (error: any) => {
      toast.error("Failed to create form", {
        description: error?.response?.data?.message || error?.message || "Please try again later.",
      })
    },
  })
}
