/**
 * Toast types for different notification styles
 */
export type ToastType = "success" | "error" | "warning" | "info" | "loading";

/**
 * Toast options
 */
export interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

