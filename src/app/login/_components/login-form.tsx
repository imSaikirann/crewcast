"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { authErrorMessage, notify } from "@/lib/notify";
import { LoginCard } from "./login-card";

type Pending = "google" | "github" | "email" | null;

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const errorCode = searchParams.get("error");
  const errorMsg = authErrorMessage(errorCode);

  const [pending, setPending] = useState<Pending>(null);
  const [emailSent, setEmailSent] = useState<string | null>(null);

  // Surface URL error as a toast on mount (in addition to inline alert)
  useEffect(() => {
    if (errorMsg) notify.error("Sign-in failed", errorMsg);
  }, [errorMsg]);

  const handleOAuth = async (provider: "google" | "github") => {
    try {
      setPending(provider);
      await signIn(provider, { callbackUrl });
    } catch {
      setPending(null);
      notify.error("Something went wrong", "Please try again in a moment.");
    }
  };

  const handleEmail = async (email: string) => {
    try {
      setPending("email");
      const res = await signIn("email", {
        email,
        callbackUrl,
        redirect: false,
      });

      if (res?.error) {
        notify.error("Sign-in failed", "We couldn't send your link. Try again.");
      } else {
        setEmailSent(email);
        notify.success("Link sent", `Check ${email} for your sign-in link.`);
      }
    } catch {
      notify.error("Something went wrong", "Please try again in a moment.");
    } finally {
      setPending(null);
    }
  };

  return (
    <LoginCard
      pending={pending}
      errorMessage={errorMsg}
      emailSent={emailSent}
      onGoogleClick={() => handleOAuth("google")}
      onGithubClick={() => handleOAuth("github")}
      onEmailSubmit={handleEmail}
    />
  );
}