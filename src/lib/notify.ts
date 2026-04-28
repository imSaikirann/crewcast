import { toast } from "sonner";

export const notify = {
  success: (msg: string, description?: string) =>
    toast.success(msg, { description }),

  error: (msg: string, description?: string) =>
    toast.error(msg, { description }),

  info: (msg: string, description?: string) =>
    toast(msg, { description }),

  loading: (msg: string) => toast.loading(msg),

  dismiss: (id?: string | number) => toast.dismiss(id),
};

/** Map next-auth error codes to friendly messages */
export const authErrorMessage = (code?: string | null) => {
  if (!code) return null;
  const map: Record<string, string> = {
    OAuthSignin: "Couldn't start Google sign-in. Try again.",
    OAuthCallback: "Google returned an error. Try again.",
    OAuthAccountNotLinked:
      "This email is already registered with a different provider.",
    AccessDenied: "Access denied. Contact your admin.",
    Configuration: "Auth is misconfigured. Please contact support.",
    Default: "Sign-in failed. Clear your cookies and try again.",
  };
  return map[code] ?? map.Default;
};