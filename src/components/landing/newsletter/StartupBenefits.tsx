import {
  BranchIcon,
  CheckIcon,
  CloseIcon,
  FilterIcon,
  GaugeIcon,
} from "./icons";

const startupBenefits = [
  {
    icon: FilterIcon,
    title: "Filter out applications that aren't worth it",
    body: "Stop reading 300 lookalike resumes. Crewcast scores every applicant on real signal and pushes low-fit submissions to the bottom automatically.",
  },
  {
    icon: GaugeIcon,
    title: "Proof of work over resume lines",
    body: "A polished resume says little about how someone builds. We rank candidates on what they actually shipped: commits, projects, and code quality.",
  },
  {
    icon: BranchIcon,
    title: "Open-source contributions count",
    body: "Public PRs, maintained repos, and stars earned are first-class signals. The engineers quietly doing great work finally get surfaced.",
  },
];

const compareRows = [
  "How you screen candidates",
  "What gets rewarded",
  "Open-source contributions",
  "Time to a shortlist",
  "Fit for a small team",
];

const oldWay = [
  "Manually skim hundreds of resumes",
  "Keywords and formatting",
  "Invisible in a PDF",
  "Days of spreadsheet triage",
  "Slow, noisy, easy to miss talent",
];

const crewcastWay = [
  "Auto-scored, ranked applications",
  "Real commits and shipped work",
  "Counted as primary signal",
  "A confident top 10 in an afternoon",
  "Fast, focused, built for startups",
];

export function StartupBenefits() {
  return (
    <section id="startups" className="w-full scroll-mt-20">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <div className="max-w-2xl">
          <p className="font-sora mb-4 text-sm font-medium tracking-wide text-muted-foreground">
            For startups
          </p>
          <h2 className="font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            Hire your first engineers without the noise.
          </h2>
          <p className="font-sora mt-4 text-lg leading-relaxed text-muted-foreground">
            Small teams can&apos;t afford a bad hire or a week lost to screening.
            Crewcast cuts both, so you spend time on the people who can actually
            do the work.
          </p>
        </div>

        {/* Benefit points */}
        <div className="mt-12 grid gap-x-12 gap-y-10 sm:mt-16 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3">
          {startupBenefits.map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <Icon size={24} className="text-foreground" />
              <h3 className="font-heading mt-5 text-lg font-semibold text-foreground">
                {title}
              </h3>
              <p className="font-sora mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison â€” stacked cards on mobile */}
        <div className="mt-16 space-y-3 sm:hidden">
          {compareRows.map((label, i) => (
            <div
              key={label}
              className="overflow-hidden rounded-lg border border-border"
            >
              <p className="font-heading border-b border-border px-4 py-3 text-sm font-semibold text-foreground">
                {label}
              </p>
              <div className="flex items-start gap-2.5 border-b border-border px-4 py-3.5">
                <CloseIcon size={16} className="mt-0.5 shrink-0 text-muted-foreground/50" />
                <div>
                  <p className="font-sora text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                    The old way
                  </p>
                  <p className="font-sora mt-0.5 text-[14px] leading-relaxed text-muted-foreground">
                    {oldWay[i]}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 bg-muted/60 px-4 py-3.5">
                <CheckIcon size={16} className="mt-0.5 shrink-0 text-foreground" />
                <div>
                  <p className="font-sora text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                    With Crewcast
                  </p>
                  <p className="font-sora mt-0.5 text-[14px] leading-relaxed text-foreground">
                    {crewcastWay[i]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison â€” table on larger screens */}
        <div className="mt-20 hidden overflow-hidden rounded-lg border border-border sm:block">
          <div className="grid grid-cols-[1.2fr_1fr_1fr]">
            {/* Header row */}
            <div className="border-b border-border px-5 py-5 sm:px-6" />
            <div className="border-b border-l border-border px-5 py-5 sm:px-6">
              <p className="font-heading text-sm font-semibold text-muted-foreground">
                The old way
              </p>
            </div>
            <div className="border-b border-l border-border bg-muted/60 px-5 py-5 sm:px-6">
              <p className="font-heading text-sm font-semibold text-foreground">
                With Crewcast
              </p>
            </div>

            {/* Rows */}
            {compareRows.map((label, i) => {
              const last = i === compareRows.length - 1;
              return (
                <div key={label} className="contents">
                  <div
                    className={`px-5 py-5 sm:px-6 ${last ? "" : "border-b border-border"}`}
                  >
                    <p className="font-sora text-[14px] font-medium text-foreground">
                      {label}
                    </p>
                  </div>
                  <div
                    className={`flex items-start gap-2.5 border-l border-border px-5 py-5 sm:px-6 ${last ? "" : "border-b"}`}
                  >
                    <CloseIcon size={17} className="mt-0.5 shrink-0 text-muted-foreground/50" />
                    <p className="font-sora text-[14px] leading-relaxed text-muted-foreground">
                      {oldWay[i]}
                    </p>
                  </div>
                  <div
                    className={`flex items-start gap-2.5 border-l border-border bg-muted/60 px-5 py-5 sm:px-6 ${last ? "" : "border-b"}`}
                  >
                    <CheckIcon size={17} className="mt-0.5 shrink-0 text-foreground" />
                    <p className="font-sora text-[14px] leading-relaxed text-foreground">
                      {crewcastWay[i]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


