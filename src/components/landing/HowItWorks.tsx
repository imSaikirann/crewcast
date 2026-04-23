const GitHubMark = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" className={`fill-current ${className}`} aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

const features = [
  {
    emoji: "🖥️",
    title: "Recruiter dashboard",
    description: "Manage all your jobs, view applications, track metrics, and review candidates from one place.",
  },
  {
    emoji: "🌐",
    title: "Public jobs page",
    description: "A clean browsable list of all open roles at your company — no login required for candidates.",
  },
  {
    emoji: "📝",
    title: "Candidate form flow",
    description: "Simple, fast application forms. Candidates fill in details and submit — done in under 5 minutes.",
    isGithub: false,
  },
  {
    emoji: null,
    title: "GitHub-required screening",
    description: "Software roles require a GitHub profile. Crewcast reads public signals and scores on submission.",
    isGithub: true,
  },
  {
    emoji: "🏢",
    title: "Admin domain management",
    description: "Admins control hiring domains, default forms, recruiter access, and platform-wide settings.",
  },
  {
    emoji: "📈",
    title: "Analytics and reporting",
    description: "Track views, applications, conversion rates, form quality, and recruiter activity over time.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative z-10 border-y border-[var(--landing-border)] bg-[var(--landing-bg)] px-5 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase text-[var(--landing-subtle)]">
              // PLATFORM_FEATURES
            </p>
            <h2 className="text-3xl font-bold text-[var(--landing-text)] sm:text-4xl">
              Everything a hiring team needs. Nothing else.
            </h2>
          </div>
          <p className="font-body text-lg text-[var(--landing-muted)] lg:text-right">
            Crewcast covers the full loop — from posting a role to reviewing a scored shortlist.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className={`rounded-sm border p-6 transition-all duration-150 hover:-translate-y-0.5 ${
                f.isGithub
                  ? "border-[var(--landing-border)] bg-[var(--landing-accent-soft)] hover:border-[var(--landing-muted)]"
                  : "border-[var(--landing-border)] bg-[var(--landing-panel)] hover:border-[var(--landing-muted)]"
              }`}
            >
              <div className="mb-4">
                {f.isGithub ? (
                  <div className="flex items-center gap-2">
                    <GitHubMark className="h-6 w-6 text-[var(--landing-text)]" />
                    <span className="text-[10px] font-medium uppercase text-[var(--landing-muted)]">Required</span>
                  </div>
                ) : (
                  <span className="text-2xl" role="img" aria-hidden="true">{f.emoji}</span>
                )}
              </div>
              <h3 className="text-sm font-semibold text-[var(--landing-text)]">
                {f.title}
              </h3>
              <p className="font-body mt-2 text-sm leading-6 text-[var(--landing-muted)]">{f.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
