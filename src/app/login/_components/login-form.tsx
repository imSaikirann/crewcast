"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { authErrorMessage, notify } from "@/lib/notify";
import { LoginCard } from "./login-card";

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const errorCode = searchParams.get("error");
  const errorMsg = authErrorMessage(errorCode);

  const [loading, setLoading] = useState(false);

  // Surface URL error as a toast on mount (in addition to inline alert)
  useEffect(() => {
    if (errorMsg) notify.error("Sign-in failed", errorMsg);
  }, [errorMsg]);

  const handleGoogle = async () => {
    try {
      setLoading(true);
      await signIn("google", { callbackUrl });
    } catch {
      setLoading(false);
      notify.error("Something went wrong", "Please try again in a moment.");
    }
  };

  return (
    <LoginCard
      loading={loading}
      errorMessage={errorMsg}
      onGoogleClick={handleGoogle}
    />
  );
}