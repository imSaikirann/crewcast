"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const error = searchParams.get("error");

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--landing-bg)] px-6 text-[var(--landing-text)]">
      <section className="w-full max-w-sm">
        <Link
          href="/"
          className="mb-8 inline-flex text-sm font-semibold text-[var(--landing-muted)] hover:text-[var(--landing-text)]"
        >
          crewcast
        </Link>

        <h1 className="text-3xl font-bold tracking-tight">Sign in</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--landing-muted)]">
          Use your Google account to continue to your dashboard.
        </p>

        {error && (
          <p className="mt-5 rounded-sm border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            Google sign-in failed. Clear localhost cookies and try again from this page.
          </p>
        )}

        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl })}
          className="mt-6 w-full rounded-sm bg-[var(--landing-accent)] px-4 py-3 text-sm font-bold text-[var(--landing-bg)] transition-colors hover:bg-[var(--landing-accent-strong)]"
        >
          Continue with Google
        </button>
      </section>
    </main>
  );
}
