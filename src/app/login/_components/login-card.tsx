import Link from "next/link";

import { FormAlert } from "@/components/ui/form-alert";
import { CrewcastMark } from "@/components/brand/CrewcastLogo";
import { GoogleIcon } from "@/components/icons/google-icon";
import { GithubIcon } from "@/components/icons/github-icon";
import { ProviderButton } from "./provider-button";
import { EmailSignIn } from "./email-sign-in";
import { TrustLine } from "./trust-line";

export function LoginCard({
  pending,
  errorMessage,
  emailSent,
  onGoogleClick,
  onGithubClick,
  onEmailSubmit,
}: {
  pending: "google" | "github" | "email" | null;
  errorMessage: string | null;
  emailSent: string | null;
  onGoogleClick: () => void;
  onGithubClick: () => void;
  onEmailSubmit: (email: string) => void;
}) {
  const busy = pending !== null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <section className="w-full max-w-90">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <CrewcastMark />
        </div>

        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Sign in to Crewcast
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Continue to your hiring dashboard.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4">
            <FormAlert variant="error">{errorMessage}</FormAlert>
          </div>
        )}

        {emailSent ? (
          <FormAlert variant="success">
            Check your inbox â€” we sent a sign-in link to{" "}
            <span className="font-medium">{emailSent}</span>.
          </FormAlert>
        ) : (
          <div className="space-y-3">
            {/* OAuth providers */}
            <div className="space-y-2.5">
              <ProviderButton
                label="Continue with Google"
                icon={<GoogleIcon />}
                loading={pending === "google"}
                disabled={busy}
                onClick={onGoogleClick}
                testId="login-google-button"
              />
              <ProviderButton
                label="Continue with GitHub"
                icon={<GithubIcon />}
                loading={pending === "github"}
                disabled={busy}
                onClick={onGithubClick}
                testId="login-github-button"
              />
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 py-1">
              <div className="h-px flex-1 bg-border/60" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="h-px flex-1 bg-border/60" />
            </div>

            {/* Email */}
            <EmailSignIn loading={pending === "email"} onSubmit={onEmailSubmit} />
          </div>
        )}

        {/* Trust line */}
        <div className="mt-6">
          <TrustLine />
        </div>

        {/* Back link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}
