import { Database, FileText, ListFilter } from "lucide-react";

const GitHubMark = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" className={`fill-current ${className}`} aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

const steps = [
  {
    num: "01",
    icon: FileText,
    title: "Choose a hiring domain",
    description: "Set up your company domain and configure default form fields for every role you post.",
  },
  {
    num: "02",
    icon: null,
    title: "Create a job form",
    description: "Build role-specific forms with tech stack, questions, and GitHub required for software roles.",
    isGithub: true,
  },
  {
    num: "03",
    icon: Database,
    title: "Share the public link",
    description: "Every form gets a public URL. Post it anywhere — no login required for candidates to apply.",
  },
  {
    num: "04",
    icon: ListFilter,
    title: "Review scores and metrics",
    description: "Applications land in a ranked table with GitHub scores, signal breakdowns, and recruiter analytics.",
  },
];

const capabilities = [
  { label: "Candidate forms", emoji: "📋" },
  { label: "GitHub scoring", emoji: "⭐" },
  { label: "Application tracking", emoji: "📊" },
  { label: "Admin analytics", emoji: "🔬" },
];

export default function StatsBento() {
  return (
    <section className="relative z-10 border-y border-[var(--landing-border)] bg-[var(--landing-bg)] px-5 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Section header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="font-mono-hero text-xs uppercase tracking-widest text-[var(--landing-subtle)]">
              // HOW_IT_WORKS
            </p>
            <h2 className="font-mono-hero max-w-xl text-3xl font-bold text-[var(--landing-text)] sm:text-4xl">
              From form publish to shortlist.
            </h2>
          </div>

          {/* Capability pills */}
          <div className="flex flex-wrap gap-2">
            {capabilities.map((c) => (
              <span
                key={c.label}
                className="inline-flex items-center gap-2 rounded-sm border border-[var(--landing-border)] bg-[var(--landing-panel)] px-3 py-2 font-body text-sm text-[var(--landing-muted)]"
              >
                <span>{c.emoji}</span>
                {c.label}
              </span>
            ))}
          </div>
        </div>

        {/* 4-step pipeline */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <article
                key={step.num}
                className="card-hover group relative rounded-sm border border-[var(--landing-border)] bg-[var(--landing-panel)] p-6 transition-all duration-150 hover:border-[var(--landing-muted)] hover:-translate-y-0.5"
              >
                {/* Connector line on desktop */}
                {i < steps.length - 1 && (
                  <div className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                    <div className="h-px w-4 bg-[var(--landing-border)]" />
                  </div>
                )}

                {/* Step number */}
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-mono-hero text-2xl font-bold text-[var(--landing-accent)]">{step.num}</span>
                  {step.isGithub ? (
                    <GitHubMark className="h-5 w-5 text-[var(--landing-subtle)]" />
                  ) : Icon ? (
                    <Icon className="h-5 w-5 text-[var(--landing-subtle)]" />
                  ) : null}
                </div>

                <h3 className="font-mono-hero text-sm font-semibold text-[var(--landing-text)]">{step.title}</h3>
                <p className="font-body mt-3 text-sm leading-6 text-[var(--landing-muted)]">{step.description}</p>
              </article>
            );
          })}
        </div>

        {/* Bottom stat bar */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { value: "0–100", label: "GitHub score range" },
            { value: "4", label: "main signal groups" },
            { value: "Public", label: "data only — no scraping" },
            { value: "Real-time", label: "score on submission" },
          ].map((m) => (
            <div key={m.label} className="rounded-sm border border-[var(--landing-border)] bg-[var(--landing-panel)] p-5">
              <p className="font-mono-hero text-2xl font-bold text-[var(--landing-text)]">{m.value}</p>
              <p className="font-body mt-1.5 text-xs text-[var(--landing-subtle)]">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}