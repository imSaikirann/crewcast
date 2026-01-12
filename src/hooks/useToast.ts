/**
 * React hook for toast notifications
 * 
 * Provides easy access to toast functions in React components
 * 
 * @example
 * ```tsx
 * const { toast } = useToast();
 * 
 * const handleSave = async () => {
 *   toast.success("Saved successfully!");
 * };
 * ```
 */

import { toast as toastUtil } from "@/lib/toast";

export function useToast() {
  return {
    toast: toastUtil,
  };
}

