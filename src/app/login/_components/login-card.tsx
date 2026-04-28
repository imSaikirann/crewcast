import Link from "next/link";


import { FormAlert } from "@/components/ui/form-alert";

import { CrewcastMark } from "@/components/brand/CrewcastLogo";
import { GoogleButton } from "./google-button";
import { TrustLine } from "./trust-line";

export function LoginCard({
  loading,
  errorMessage,
  onGoogleClick,
}: {
  loading: boolean;
  errorMessage: string | null;
  onGoogleClick: () => void;
}) {
  return (
    <main className="bg-grid relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">


      {/* Soft radial vignette for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--foreground)/0.06),transparent_60%)]"
      />

      <section className="relative z-10 w-full max-w-[360px]">
        {/* Logo */}
        <div className="mb-10">
          <CrewcastMark />
        </div>

        {/* Card */}
        <div className="overflow-hidden rounded-[10px] border border-border bg-card shadow-sm">
          {/* Header */}
          <div className="border-b border-border bg-muted/40 px-7 py-6">
            <h1 className="mb-1.5 text-[22px] font-bold leading-none tracking-[-0.03em] text-foreground">
              Sign in
            </h1>
            <p className="text-[13px] leading-[1.6] text-muted-foreground">
              Continue to your hiring dashboard.
            </p>
          </div>

          {/* Body */}
          <div className="space-y-4 px-7 py-6">
            {errorMessage && (
              <FormAlert variant="error">{errorMessage}</FormAlert>
            )}

            <GoogleButton loading={loading} onClick={onGoogleClick} />

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                free to start
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <TrustLine />
          </div>
        </div>

        {/* Back link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}