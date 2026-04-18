"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const GitHubMark = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" className={`fill-current ${className}`} aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

const signals = [
  { label: "GitHub identity", value: "Verified" },
  { label: "Primary languages", value: "TS, Go, Rust" },
  { label: "OSS signal", value: "Strong" },
  { label: "Role match", value: "Frontend 91%" },
];

export default function Hero() {
  return (
    <section className="relative z-10 px-5 pt-28 pb-16 sm:px-6 lg:pt-36">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&display=swap');
        .font-mono-hero { font-family: 'IBM Plex Mono', monospace; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .cursor-blink { animation: blink 1s step-end infinite; }
        .card-hover { transition: border-color 0.15s, transform 0.15s; }
        .card-hover:hover { border-color: var(--landing-muted); transform: translateY(-1px); }
      `}</style>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left col */}
        <div className="space-y-8 font-body">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-sm border border-[var(--landing-border)] bg-[var(--landing-panel)] px-3 py-2 text-sm text-[var(--landing-muted)]">
            <GitHubMark className="h-4 w-4 text-[var(--landing-text)]" />
            GitHub-required for software roles
          </div>

          {/* Headline */}
          <div className="space-y-3">
            <h1 className="font-mono-hero max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight text-[var(--landing-text)] sm:text-5xl lg:text-6xl">
              Build smarter<br />hiring forms.
            </h1>
            <p className="font-mono-hero text-4xl font-bold text-[var(--landing-accent)] sm:text-5xl lg:text-6xl">
              Score real code.<span className="cursor-blink">▋</span>
            </p>
          </div>

          <p className="max-w-xl text-lg leading-8 text-[var(--landing-muted)]">
            Crewcast adds a GitHub scoring layer to every software job form. Candidates apply with their public profile. You get signal, not just a CV.
          </p>

          {/* Check items */}
          <div className="space-y-3">
            {[
              "Collect GitHub profiles in every form",
              "Score public repos, activity, and languages",
              "Review ranked candidates with evidence",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-[var(--landing-muted)]">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--landing-accent)]" />
                {item}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Link
              href="/dashboard"
              className="font-mono-hero inline-flex items-center justify-center gap-2 rounded-sm bg-[var(--landing-accent)] px-6 py-3 text-sm font-bold text-[var(--landing-bg)] transition-colors hover:bg-[var(--landing-accent-strong)]"
            >
              Start hiring <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/jobs"
              className="font-mono-hero inline-flex items-center justify-center gap-2 rounded-sm border border-[var(--landing-border)] px-6 py-3 text-sm font-medium text-[var(--landing-text)] transition-colors hover:border-[var(--landing-muted)] hover:bg-[var(--landing-panel)]"
            >
              Browse open jobs
            </Link>
          </div>
        </div>

        {/* Right col — terminal card */}
        <div className="relative">
          <div className="rounded-sm border border-[var(--landing-border)] bg-[var(--landing-panel)] shadow-sm">
            {/* Terminal bar */}
            <div className="flex items-center gap-2 border-b border-[var(--landing-border)] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[var(--landing-danger)]" />
              <span className="h-3 w-3 rounded-full bg-[var(--landing-warning)]" />
              <span className="h-3 w-3 rounded-full bg-[var(--landing-success)]" />
              <span className="font-mono-hero ml-3 text-xs text-[var(--landing-subtle)]">
                crewcast — candidate-review
              </span>
            </div>

            <div className="p-5 space-y-4">
              {/* Candidate row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[var(--landing-panel-strong)] border border-[var(--landing-border)] font-mono-hero text-sm font-bold text-[var(--landing-accent)]">
                    SK
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-[var(--landing-text)]">Sai Kumar</p>
                    <p className="font-body text-xs text-[var(--landing-subtle)]">Applied · Full-stack Engineer</p>
                  </div>
                </div>
                <div className="rounded-sm bg-[var(--landing-accent)] px-4 py-2 text-center">
                  <p className="font-mono-hero text-[10px] font-bold uppercase tracking-widest text-[var(--landing-bg)] opacity-70">CrewScore</p>
                  <p className="font-mono-hero text-3xl font-bold leading-tight text-[var(--landing-bg)]">86</p>
                </div>
              </div>

              {/* Signal grid */}
              <div className="grid grid-cols-2 gap-2">
                {signals.map((s) => (
                  <div key={s.label} className="card-hover rounded-sm border border-[var(--landing-border)] bg-[var(--landing-bg)] p-3">
                    <p className="font-mono-hero text-[10px] uppercase tracking-widest text-[var(--landing-subtle)]">{s.label}</p>
                    <p className="font-mono-hero mt-1.5 text-sm font-semibold text-[var(--landing-text)]">{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-2 rounded-sm border border-[var(--landing-border)] bg-[var(--landing-bg)] px-4 py-3">
                <GitHubMark className="h-4 w-4 text-[var(--landing-muted)] shrink-0" />
                <span className="font-mono-hero text-xs text-[var(--landing-subtle)]">github.com/saikumar</span>
                <span className="ml-auto font-mono-hero text-xs text-[var(--landing-accent)]">12 active repos · 6mo streak</span>
              </div>

              {/* Bottom metrics */}
              <div className="grid grid-cols-3 gap-2 border-t border-[var(--landing-border)] pt-4">
                {[
                  { v: "12", l: "repos" },
                  { v: "6mo", l: "streak" },
                  { v: "91%", l: "role match" },
                ].map((m) => (
                  <div key={m.l} className="text-center">
                    <p className="font-mono-hero text-lg font-bold text-[var(--landing-accent)]">{m.v}</p>
                    <p className="font-body text-[10px] text-[var(--landing-subtle)]">{m.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
