"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

export function EmailSignIn({
  loading,
  onSubmit,
}: {
  loading: boolean;
  onSubmit: (email: string) => void;
}) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) return;
    onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5">
      <Input
        type="email"
        name="email"
        autoComplete="email"
        required
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        className="h-10"
        data-testid="login-email-input"
      />
      <Button
        type="submit"
        disabled={loading || !email.trim()}
        className="h-10 w-full gap-2 rounded-md text-sm font-medium"
        data-testid="login-email-button"
      >
        {loading ? <Spinner /> : <Mail className="size-4" />}
        Continue with email
      </Button>
    </form>
  );
}
