/**
 * Toast/Notification System
 * 
 * Global toast notification system using Sonner.
 * Import and use throughout the app for consistent notifications.
 * 
 * @example
 * ```ts
 * import { toast } from "@/lib/toast";
 * 
 * toast.success("Form saved successfully!");
 * toast.error("Something went wrong", { description: "Please try again" });
 * toast.promise(apiCall(), {
 *   loading: "Saving...",
 *   success: "Saved!",
 *   error: "Failed to save"
 * });
 * ```
 */

export { toast } from "./toast";
export type { ToastType, ToastOptions } from "./types";


