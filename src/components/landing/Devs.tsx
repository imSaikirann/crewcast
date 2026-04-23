const GitHubMark = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" className={`fill-current ${className}`} aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

const candidates = [
  {
    initials: "AK",
    name: "Aditya Kumar",
    role: "Frontend Engineer",
    score: 88,
    langs: "React, TypeScript, Next.js",
  },
  {
    initials: "PR",
    name: "Priya Rajan",
    role: "Backend Engineer",
    score: 81,
    langs: "Go, PostgreSQL, gRPC",
  },
  {
    initials: "MS",
    name: "Mihail Stoev",
    role: "Full-stack Engineer",
    score: 74,
    langs: "Node.js, Vue, Python",
  },
];

function scoreColor(score: number) {
  if (score >= 85) return "text-[var(--landing-accent)]";
  if (score >= 70) return "text-[var(--landing-warning)]";
  return "text-[var(--landing-danger)]";
}

export default function Devs() {
  return (
    <section className="relative z-10 bg-[var(--landing-bg-alt)] px-5 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left — copy */}
          <div className="space-y-6">
            <p className="text-xs font-medium uppercase text-[var(--landing-subtle)]">
              // CANDIDATE_EXPERIENCE
            </p>
            <h2 className="text-3xl font-bold text-[var(--landing-text)] sm:text-4xl">
              Clean forms for candidates. Scored signals for you.
            </h2>
            <p className="font-body text-lg leading-8 text-[var(--landing-muted)]">
              Candidates see a simple public job page and a clean application form. For software roles, they add their GitHub profile. Crewcast handles the scoring — they don't need to do anything extra.
            </p>

            <div className="space-y-3">
              {[
                "Browse public jobs at crewcast.io/jobs",
                "Apply with name, email, answers, and GitHub",
                "No account required — form submit is enough",
                "GitHub profile is the only extra step for devs",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-[var(--landing-muted)]">
                  <span className="mt-0.5 text-[var(--landing-accent)]">→</span>
                  {item}
                </div>
              ))}
            </div>

            {/* Fake form field preview */}
            <div className="rounded-sm border border-[var(--landing-border)] bg-[var(--landing-panel)] p-5 space-y-3">
              <p className="text-xs font-medium uppercase text-[var(--landing-subtle)]">Sample form field</p>
              <div className="space-y-1">
                <label className="text-xs text-[var(--landing-muted)] flex items-center gap-2">
                  <GitHubMark className="h-3 w-3 text-[var(--landing-text)]" />
                  GitHub profile URL
                  <span className="text-[var(--landing-danger)]">*required</span>
                </label>
                <div className="flex items-center gap-2 rounded-sm border border-[var(--landing-border)] bg-[var(--landing-bg)] px-3 py-2.5">
                  <span className="text-sm text-[var(--landing-subtle)]">github.com/</span>
                  <span className="text-sm text-[var(--landing-muted)]">your-username</span>
                  <span className="ml-auto h-4 w-0.5 bg-[var(--landing-accent)] opacity-80" />
                </div>
                <p className="font-body text-xs text-[var(--landing-subtle)]">Used to score public engineering signals for this role.</p>
              </div>
            </div>
          </div>

          {/* Right — candidate table preview */}
          <div className="rounded-sm border border-[var(--landing-border)] bg-[var(--landing-panel)] overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[1fr_60px_1fr] gap-4 bg-[var(--landing-bg)] px-5 py-3 border-b border-[var(--landing-border)]">
              <span className="text-[10px] font-medium uppercase text-[var(--landing-subtle)]">Candidate</span>
              <span className="text-[10px] font-medium uppercase text-[var(--landing-subtle)]">Score</span>
              <span className="text-[10px] font-medium uppercase text-[var(--landing-subtle)]">Languages</span>
            </div>

            {candidates.map((c, i) => (
              <div
                key={c.name}
                className={`grid grid-cols-[1fr_60px_1fr] gap-4 px-5 py-4 items-center transition-colors hover:bg-[var(--landing-panel-strong)] ${
                  i < candidates.length - 1 ? "border-b border-[var(--landing-border)]" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-[var(--landing-panel-strong)] border border-[var(--landing-border)]">
                    <GitHubMark className="h-4 w-4 text-[var(--landing-text)]" />
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-[var(--landing-text)]">{c.name}</p>
                    <p className="font-body text-xs text-[var(--landing-subtle)]">{c.role}</p>
                  </div>
                </div>
                <p className={`text-xl font-bold ${scoreColor(c.score)}`}>{c.score}</p>
                <p className="font-body text-xs text-[var(--landing-muted)]">{c.langs}</p>
              </div>
            ))}

            <div className="flex items-center justify-between border-t border-[var(--landing-border)] bg-[var(--landing-bg)] px-5 py-3">
              <span className="text-xs text-[var(--landing-subtle)]">Sorted by score · 3 of 24 shown</span>
              <span className="text-xs font-medium text-[var(--landing-accent)]">View all →</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
