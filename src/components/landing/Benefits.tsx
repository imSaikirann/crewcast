const benefits = [
  {
    emoji: "📋",
    title: "Role-specific forms",
    description: "Build forms with tech stack, experience, salary, screening questions, and GitHub — all in one flow.",
  },
  {
    emoji: "🔗",
    title: "Public application links",
    description: "Every job gets a shareable public URL. Candidates apply directly — no account, no friction.",
  },
  {
    emoji: "📊",
    title: "Views and conversion tracking",
    description: "See how many people viewed a job, how many applied, and where drop-off happens.",
  },
  {
    emoji: "⭐",
    title: "GitHub signal scoring",
    description: "Crewcast scores public repos, languages, activity, account maturity, and OSS contributions.",
  },
  {
    emoji: "✂️",
    title: "Less manual screening",
    description: "Stop opening 200 resumes. Start with a ranked table that shows who has relevant public work.",
  },
  {
    emoji: "📁",
    title: "All applications in one place",
    description: "Candidates, scores, answers, GitHub links, and notes — all scoped to your role and domain.",
  },
];

export default function Benefits() {
  return (
    <section className="relative z-10 bg-[var(--landing-bg-alt)] px-5 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          {/* Left */}
          <div className="space-y-6">
            <p className="text-xs font-medium uppercase text-[var(--landing-subtle)]">
              // FOR_RECRUITERS
            </p>
            <h2 className="text-3xl font-bold text-[var(--landing-text)] sm:text-4xl">
              Hiring software engineers should include their software.
            </h2>
            <p className="font-body text-lg leading-8 text-[var(--landing-muted)]">
              Normal hiring funnels make recruiters read the same resume patterns again and again. Crewcast keeps the form simple for candidates but gives your team a technical signal layer from day one.
            </p>

            {/* Score breakdown mini */}
            <div className="rounded-sm border border-[var(--landing-border)] bg-[var(--landing-panel)] p-5 space-y-3">
              <p className="text-xs font-medium uppercase text-[var(--landing-subtle)]">Score breakdown</p>
              {[
                { label: "Repositories", pct: 78 },
                { label: "Languages", pct: 91 },
                { label: "Activity", pct: 65 },
                { label: "Profile maturity", pct: 84 },
              ].map((row) => (
                <div key={row.label} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="font-body text-xs text-[var(--landing-muted)]">{row.label}</span>
                    <span className="text-xs font-semibold text-[var(--landing-accent)]">{row.pct}</span>
                  </div>
                  <div className="h-1 w-full rounded-full bg-[var(--landing-border)]">
                    <div
                      className="h-1 rounded-full bg-[var(--landing-accent)]"
                      style={{ width: `${row.pct}%`, opacity: 0.7 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            {benefits.map((b) => (
              <article
                key={b.title}
                className="rounded-sm border border-[var(--landing-border)] bg-[var(--landing-panel)] p-5 transition-all duration-150 hover:border-[var(--landing-muted)] hover:-translate-y-0.5"
              >
                <span className="text-2xl" role="img" aria-hidden="true">{b.emoji}</span>
                <h3 className="mt-4 text-sm font-semibold text-[var(--landing-text)]">{b.title}</h3>
                <p className="font-body mt-2 text-sm leading-6 text-[var(--landing-muted)]">{b.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
