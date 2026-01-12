import { useMutation, useQueryClient } from "@tanstack/react-query"

import { JobFormDetails,FormField } from "../types/types"

import { createForm } from "../services/domains"
import { toast } from "@/lib/toast"

export function useCreateForm() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      details,
      fields,
    }: {
      details: JobFormDetails
      fields: FormField[]
    }) => createForm(details, fields),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forms"] })
      toast.success("Form created successfully!", {
        description: "Your form has been saved and is ready to use.",
      })
    },

    onError: (error: any) => {
      toast.error("Failed to create form", {
        description: error?.response?.data?.message || error?.message || "Please try again later.",
      })
    },
  })
}
