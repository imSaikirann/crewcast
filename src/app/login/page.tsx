"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

/* ── Ship mark — same as Navbar ── */
function ShipMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="44" height="44" rx="9" fill="#f0f0f0" />
      <polygon points="22,10 22,30 12,30" fill="#080808" />
      <rect x="12" y="33" width="20" height="5" rx="1.5" fill="#080808" />
    </svg>
  );
}

/* ── Google icon ── */
function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

/* ── Spinner ── */
function Spinner() {
  return (
    <svg
      width="16" height="16" viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ animation: "spin 0.7s linear infinite" }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <circle cx="12" cy="12" r="9" stroke="rgba(8,8,8,0.25)" strokeWidth="2.5" />
      <path d="M12 3a9 9 0 0 1 9 9" stroke="#080808" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl  = searchParams.get("callbackUrl") ?? "/dashboard";
  const error        = searchParams.get("error");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl });
  };

  return (
    <main
      className="relative flex min-h-screen items-center justify-center px-6 overflow-hidden"
      style={{ background: "var(--lc-bg)" }}
    >
      {/* Grid bg — matches hero */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <section className="relative z-10 w-full max-w-[360px]">

        {/* Logo */}
        <div className="mb-10 flex flex-col items-center gap-3">
          <ShipMark size={44} />
          <span
            className="text-[18px] font-bold tracking-[-0.03em]"
            style={{ fontFamily: "var(--lc-sans)", color: "var(--lc-text)" }}
          >
            Crewcast
          </span>
        </div>

        {/* Card */}
        <div
          className="rounded-[10px] border border-[var(--lc-border)] overflow-hidden"
          style={{ background: "var(--lc-bg-1)" }}
        >
          {/* Card header */}
          <div
            className="px-7 py-6 border-b border-[var(--lc-border)]"
            style={{ background: "var(--lc-bg-2)" }}
          >
            <h1
              className="text-[22px] font-bold tracking-[-0.03em] leading-none mb-1.5"
              style={{ fontFamily: "var(--lc-sans)", color: "var(--lc-text)" }}
            >
              Sign in
            </h1>
            <p className="text-[13px] leading-[1.6]" style={{ color: "var(--lc-text-2)" }}>
              Continue to your hiring dashboard.
            </p>
          </div>

          {/* Card body */}
          <div className="px-7 py-6 space-y-4">

            {/* Error state */}
            {error && (
              <div
                className="rounded-[6px] border px-3.5 py-3 text-[12px] leading-[1.6]"
                style={{
                  background:   "rgba(204,51,51,0.08)",
                  borderColor:  "rgba(204,51,51,0.2)",
                  color:        "var(--lc-danger)",
                }}
              >
                Sign-in failed. Clear your cookies and try again.
              </div>
            )}

            {/* Google button */}
            <button
              type="button"
              onClick={handleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 rounded-[6px] py-3 px-4 text-[13px] font-bold transition-all duration-150"
              style={{
                background:   loading ? "rgba(224,224,224,0.85)" : "var(--lc-accent)",
                color:        "var(--lc-accent-text)",
                border:       "none",
                cursor:       loading ? "not-allowed" : "pointer",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "var(--lc-accent-strong)"; }}
              onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = "var(--lc-accent)"; }}
            >
              {loading ? (
                <>
                  <Spinner />
                  Redirecting to Google…
                </>
              ) : (
                <>
                  <GoogleIcon />
                  Continue with Google
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: "var(--lc-border)" }} />
              <span className="font-mono text-[10px] uppercase tracking-[0.1em]" style={{ color: "var(--lc-text-3)" }}>
                free to start
              </span>
              <div className="flex-1 h-px" style={{ background: "var(--lc-border)" }} />
            </div>

            {/* Trust line */}
            <div className="flex items-start gap-2.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0"
                   stroke="currentColor" strokeWidth="2" style={{ color: "var(--lc-text-3)" }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <p className="text-[11px] leading-[1.6]" style={{ color: "var(--lc-text-3)" }}>
                We only read public GitHub data. No write access. No private repo access. Ever.
              </p>
            </div>

          </div>
        </div>

        {/* Back link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.08em] transition-colors duration-150"
            style={{ color: "var(--lc-text-3)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lc-text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--lc-text-3)")}
          >
            ← Back to home
          </Link>
        </div>

      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}