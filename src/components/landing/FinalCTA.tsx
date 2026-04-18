import Link from "next/link";
import { ArrowRight } from "lucide-react";

const GitHubMark = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" className={`fill-current ${className}`} aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

export default function FinalCTA() {
  return (
    <section className="relative z-10 bg-[var(--landing-bg)] px-5 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Main CTA block */}
        <div className="relative overflow-hidden rounded-sm border border-[var(--landing-border)] bg-[var(--landing-accent-soft)] px-8 py-14 sm:px-12 lg:px-16">
          {/* Corner decoration */}
          <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 opacity-10">
            <GitHubMark className="h-full w-full text-[var(--landing-text)]" />
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="space-y-5 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-sm border border-[var(--landing-border)] px-3 py-1.5">
                <GitHubMark className="h-3.5 w-3.5 text-[var(--landing-text)]" />
                <span className="font-mono-hero text-xs text-[var(--landing-text)]">GitHub-first hiring platform</span>
              </div>
              <h2 className="font-mono-hero text-4xl font-bold text-[var(--landing-text)] sm:text-5xl">
                Create your first<br />hiring form.
              </h2>
              <p className="font-body text-lg leading-8 text-[var(--landing-muted)]">
                Set up a domain, publish a job form, and let Crewcast score GitHub evidence as applications arrive. Takes less than 10 minutes to go live.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/dashboard"
                className="font-mono-hero inline-flex items-center justify-center gap-2 rounded-sm bg-[var(--landing-accent)] px-8 py-4 text-sm font-bold text-[var(--landing-bg)] transition-colors hover:bg-[var(--landing-accent-strong)]"
              >
                Start hiring <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/jobs"
                className="font-mono-hero inline-flex items-center justify-center gap-2 rounded-sm border border-[var(--landing-border)] px-8 py-4 text-sm font-medium text-[var(--landing-text)] transition-colors hover:border-[var(--landing-muted)] hover:bg-[var(--landing-panel)]"
              >
                View open jobs
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom footnote row */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-body text-sm text-[var(--landing-subtle)]">
            No credit card required to get started.
          </p>
          <div className="flex items-center gap-6 text-sm text-[var(--landing-subtle)]">
            {["Free to start", "GitHub data is public-only", "Candidates apply instantly"].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <span className="font-mono-hero text-[var(--landing-accent)]">✓</span>
                <span className="font-body">{t}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
