const adminCaps = [
  { emoji: "🏢", label: "Domain management" },
  { emoji: "📋", label: "Default forms" },
  { emoji: "👥", label: "Recruiter activity" },
  { emoji: "📊", label: "Platform analytics" },
  { emoji: "🔍", label: "Application reports" },
  { emoji: "👁️", label: "View tracking" },
  { emoji: "📈", label: "Form quality scores" },
  { emoji: "🛡️", label: "Access control" },
];

export default function Reviews() {
  return (
    <section className="relative z-10 border-y border-[var(--landing-border)] bg-[var(--landing-bg)] px-5 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Admin section */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <p className="text-xs font-medium uppercase text-[var(--landing-subtle)]">
              // ADMIN_PLATFORM
            </p>
            <h2 className="text-3xl font-bold text-[var(--landing-text)] sm:text-4xl">
              Full platform control for admins.
            </h2>
            <p className="font-body text-lg leading-8 text-[var(--landing-muted)]">
              Platform admins manage every dimension of the hiring operation — domains, recruiter access, form quality, and aggregate reporting across all roles.
            </p>
          </div>

          <div className="rounded-sm border border-[var(--landing-border)] bg-[var(--landing-panel)] p-6">
            <p className="mb-4 text-xs font-medium uppercase text-[var(--landing-subtle)]">Admin capabilities</p>
            <div className="grid grid-cols-2 gap-2">
              {adminCaps.map((cap) => (
                <div
                  key={cap.label}
                  className="flex items-center gap-3 rounded-sm border border-[var(--landing-border)] bg-[var(--landing-bg)] px-3 py-2.5 transition-colors hover:border-[var(--landing-muted)]"
                >
                  <span className="text-base" role="img" aria-hidden="true">{cap.emoji}</span>
                  <span className="font-body text-xs text-[var(--landing-muted)]">{cap.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Before / After */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Before */}
          <div className="rounded-sm border border-[color-mix(in_srgb,var(--landing-danger)_30%,transparent)] bg-[var(--landing-panel)] p-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase text-[var(--landing-danger)]">❌ Without Crewcast</span>
            </div>
            <ul className="space-y-3">
              {[
                "Hundreds of applications with no technical context",
                "Manual GitHub checks for maybe 5% of candidates",
                "Resume keywords decide who gets reviewed",
                "Hours spent on interviews with unqualified devs",
              ].map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-[var(--landing-muted)]">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[color-mix(in_srgb,var(--landing-danger)_40%,transparent)]" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="rounded-sm border border-[var(--landing-border)] bg-[var(--landing-accent-soft)] p-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase text-[var(--landing-accent)]">✓ With Crewcast</span>
            </div>
            <ul className="space-y-3">
              {[
                "Every application has a GitHub score and breakdown",
                "Recruiter sees ranked table, not a pile of PDFs",
                "Score is based on real public work, not claimed skills",
                "Shortlist in minutes — review signal, not just resume",
              ].map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-[var(--landing-muted)]">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--landing-accent)] opacity-60" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quote bar */}
        <div className="rounded-sm border border-[var(--landing-border)] bg-[var(--landing-panel)] px-8 py-6">
          <div className="grid gap-6 lg:grid-cols-[auto_1fr_auto] lg:items-center">
            <span className="text-4xl text-[var(--landing-border)]">"</span>
            <div>
              <p className="text-lg font-semibold text-[var(--landing-text)]">
                Designed to save recruiter review time, not replace recruiter judgment.
              </p>
              <p className="font-body mt-2 text-sm text-[var(--landing-subtle)]">
                The score starts the conversation. You still review answers, check role fit, and decide who moves forward.
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[var(--landing-accent)]">5 min</p>
              <p className="font-body text-xs text-[var(--landing-subtle)]">avg review time</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
