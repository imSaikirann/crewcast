"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ChevronDown, ExternalLink, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDateTime } from "@/utils/date";
import {
  getInsightReport,
  type Application,
  type ApplicationField,
  type GitHubInsightReport,
} from "./ApplicationsView";

export default function ApplicationTable({
  applications,
  publicId,
  openings,
  hiredCount,
  fields,
  compareIds,
  onToggleCompare,
}: {
  applications: Application[];
  publicId: string;
  openings: number;
  hiredCount: number;
  fields: ApplicationField[];
  compareIds: string[];
  onToggleCompare: (applicationId: string) => void;
}) {
  const router = useRouter();
  const [reviewApplication, setReviewApplication] = useState<Application | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const roleFilled = hiredCount >= openings;
  const responseColumns = getTableResponseColumns(fields);

  const updateStatus = async (applicationId: string, status: string) => {
    setUpdatingId(applicationId);
    try {
      const response = await fetch(
        `/api/recruiters/forms/${publicId}/applications/${applicationId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Could not update candidate status.");
      }
      router.refresh();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Could not update candidate status.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (!applications.length) {
    return (
      <div className="rounded-xl border border-dashed bg-background p-10 text-center">
        <p className="font-medium">No applications match this view.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try clearing filters or sharing the public form link again.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <div className="overflow-hidden rounded-lg border bg-background shadow-sm">
        <div className="flex flex-col gap-3 border-b px-5 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-base font-semibold">Candidate review</h2>
            <p className="text-sm text-muted-foreground">
              Review applications, update status, or open a row for GitHub evidence.
            </p>
          </div>
          <Badge variant={compareIds.length === 3 ? "default" : "secondary"}>
            {compareIds.length}/3 selected
          </Badge>
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full text-sm">
            <thead className="bg-muted/70 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-3 text-left">Compare</th>
                <th className="px-5 py-3 text-left">Candidate</th>
                {responseColumns.map((field) => (
                  <th key={field.id} className="px-5 py-3 text-left">
                    {field.label}
                  </th>
                ))}
                <th className="px-5 py-3 text-left">GitHub score</th>
                <th className="px-5 py-3 text-left">GitHub</th>
                <th className="px-5 py-3 text-left">Applied</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((application) => {
                const score = getScore(application);
                const github = getGitHubUsername(application);
                const selected = compareIds.includes(application.id);

                return (
                  <tr
                    key={application.id}
                    onClick={() => setReviewApplication(application)}
                    className="cursor-pointer border-t transition hover:bg-muted/35"
                  >
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onToggleCompare(application.id);
                        }}
                        className={[
                          "grid size-8 place-items-center rounded-md border text-xs font-semibold transition",
                          selected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-muted/25 text-muted-foreground hover:text-foreground",
                        ].join(" ")}
                        aria-label={`Compare ${application.fullName}`}
                      >
                        {selected ? compareIds.indexOf(application.id) + 1 : "+"}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={application.fullName} />
                        <div className="min-w-0">
                          <p className="truncate font-medium">
                            {application.fullName}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {application.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    {responseColumns.map((field) => (
                      <td key={field.id} className="max-w-56 px-5 py-4 text-muted-foreground">
                        <span className="line-clamp-2 break-words">
                          {formatResponsePreview(application.responses[field.id])}
                        </span>
                      </td>
                    ))}
                    <td className="px-5 py-4">
                      <ScoreBadge score={score} />
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {github ? (
                        <a
                          href={`https://github.com/${github}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline"
                          onClick={(event) => event.stopPropagation()}
                        >
                          @{github}
                          <ExternalLink className="size-3" />
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {formatDateTime(application.createdAt)}
                    </td>
                    <td className="px-5 py-4">
                      <StatusActions
                        application={application}
                        disabled={updatingId === application.id}
                        roleFilled={roleFilled}
                        onChange={(status) => updateStatus(application.id, status)}
                      />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setReviewApplication(application);
                        }}
                      >
                        Review
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 p-4 lg:hidden">
          {applications.map((application) => {
            const score = getScore(application);
            const selected = compareIds.includes(application.id);

            return (
              <div key={application.id} className="rounded-lg border p-4">
                <button
                  type="button"
                  onClick={() => setReviewApplication(application)}
                  className="w-full text-left"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar name={application.fullName} />
                      <div className="min-w-0">
                        <p className="truncate font-medium">{application.fullName}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {application.email}
                        </p>
                      </div>
                    </div>
                    <ScoreBadge score={score} />
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground">
                    <span>{formatDateTime(application.createdAt)}</span>
                    <StatusBadge status={application.status} />
                  </div>
                </button>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <Button
                    type="button"
                    variant={selected ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                    onClick={() => onToggleCompare(application.id)}
                  >
                    {selected ? `Selected ${compareIds.indexOf(application.id) + 1}` : "Compare"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setReviewApplication(application)}
                  >
                    Review details
                  </Button>
                </div>
                <div className="mt-3">
                  <StatusActions
                    application={application}
                    disabled={updatingId === application.id}
                    roleFilled={roleFilled}
                    onChange={(status) => updateStatus(application.id, status)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Dialog
        open={Boolean(reviewApplication)}
        onOpenChange={(open) => {
          if (!open) setReviewApplication(null);
        }}
      >
        <DialogContent className="max-h-[90vh] max-w-6xl overflow-y-auto p-0">
          <DialogHeader className="border-b px-6 py-5">
            <DialogTitle>
              {reviewApplication?.fullName ?? "Candidate review"}
            </DialogTitle>
            <DialogDescription>
              GitHub intelligence, candidate answers, and review status in one place.
            </DialogDescription>
          </DialogHeader>
          <div className="p-6">
            {reviewApplication && (
              <ApplicationDetails application={reviewApplication} fields={fields} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

/*
 * ApplicationDetails renders inside the modal above. The old inline table
 * expansion was intentionally removed so the GitHub report has enough room.
 */

function ApplicationDetails({
  application,
  fields,
}: {
  application: Application;
  fields: ApplicationField[];
}) {
  const latestScore = application.scores?.[0];
  const breakdown = latestScore?.breakdown;
  const insight = getInsightReport(application);
  const github = getGitHubUsername(application);
  const signalRows: Array<[string, unknown]> = breakdown?.signals
    ? [
        ["Original repos", breakdown.signals.originalRepos],
        ["Recent repos", breakdown.signals.recentRepos],
        ["Stars", breakdown.signals.stars],
        ["Forks", breakdown.signals.forks],
      ]
    : [];
  const languages = breakdown?.languages
    ? Object.entries(breakdown.languages)
        .sort((a: any, b: any) => Number(b[1]) - Number(a[1]))
        .slice(0, 6)
    : [];
  const skillsMatch = breakdown?.skillsMatch;
  const warningMessages =
    insight?.warnings?.length
      ? insight.warnings
      : breakdown?.notes?.length
        ? breakdown.notes
        : [];

  return (
    <div className="space-y-5">
      {insight ? (
        <GitHubReportHero
          insight={insight}
          github={github}
          totalScore={latestScore?.totalScore}
        />
      ) : (
        <div className="rounded-lg border bg-background p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                GitHub evidence
              </p>
              <p className="mt-1 text-lg font-semibold">
                {github ? `@${github}` : "No username"}
              </p>
            </div>
            <ScoreBadge score={latestScore?.totalScore} />
          </div>
        </div>
      )}

      {insight ? (
        <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
          <div className="space-y-5">
            <ContributionModelPanel insight={insight} />
            <div className="grid gap-4 lg:grid-cols-2">
              <ProjectHighlights projects={insight.projects} />
              <CommitHighlights commits={insight.commits} />
            </div>
          </div>

          <div className="space-y-4">
            <ScoreBreakdownPanel insight={insight} />
            <CollaborationPanel insight={insight} />
            <LanguageEvidencePanel insight={insight} languages={languages} />
            {signalRows.length > 0 && <RepositorySnapshot rows={signalRows} />}
          </div>
        </div>
      ) : skillsMatch ? (
        <div className="rounded-lg border bg-background p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Tech match
            </p>
            <Badge variant="secondary">
              {skillsMatch.percentage}% match
            </Badge>
          </div>
          {skillsMatch.matched?.length > 0 && (
            <div className="mb-3">
              <p className="mb-1 text-xs text-muted-foreground">Matched</p>
              <div className="flex flex-wrap gap-1.5">
                {skillsMatch.matched.map((skill: string) => (
                  <Badge key={skill} className="bg-emerald-600 text-white">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {skillsMatch.missing?.length > 0 && (
            <div>
              <p className="mb-1 text-xs text-muted-foreground">Missing</p>
              <div className="flex flex-wrap gap-1.5">
                {skillsMatch.missing.map((skill: string) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}

      {warningMessages.length > 0 && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-700">
          {warningMessages.join(" ")}
        </div>
      )}

      <div className="rounded-lg border bg-background p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Candidate responses
        </p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {getResponseRows(application.responses, fields).map(({ key, label, value }) => (
            <Detail
              key={key}
              label={label}
              value={value}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function GitHubReportHero({
  insight,
  github,
  totalScore,
}: {
  insight: GitHubInsightReport;
  github: string | null;
  totalScore?: number;
}) {
  const metrics = insight.contributionMetrics;

  return (
    <section className="rounded-lg border bg-background p-5">
      <div className="grid gap-5 lg:grid-cols-[220px_1fr] lg:items-center">
        <div className="rounded-lg border bg-secondary/35 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            GitHub score
          </p>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-5xl font-semibold tracking-tight">
              {totalScore ?? insight.totalScore}
            </span>
            <span className="pb-2 text-sm font-medium text-muted-foreground">/100</span>
          </div>
          <ProgressBar value={totalScore ?? insight.totalScore} className="mt-4" />
          <div className="mt-3 flex flex-wrap gap-2">
            <ConfidenceBadge confidence={insight.confidence} />
            <StatusPill label="Activity" value={insight.activity.status} />
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{metrics?.category ?? "GitHub profile"}</Badge>
            {github && (
              <a
                href={`https://github.com/${github}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-sm text-primary underline-offset-4 hover:underline"
              >
                @{github}
                <ExternalLink className="size-3" />
              </a>
            )}
          </div>
          <p className="mt-3 text-lg font-semibold leading-7">
            {insight.summary}
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <MiniMetric label="Commits" value={formatCompact(metrics?.commitsAuthored ?? 0)} />
            <MiniMetric label="Followers" value={formatCompact(metrics?.followers ?? 0)} />
            <MiniMetric label="Stars + forks" value={formatCompact((metrics?.stars ?? 0) + (metrics?.forks ?? 0))} />
            <MiniMetric label="Languages" value={metrics?.languagesUsed ?? 0} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ScoreBreakdownPanel({ insight }: { insight: GitHubInsightReport }) {
  const rows = [
    ["Repository signal", insight.breakdown.repoScore],
    ["Languages", insight.breakdown.techMatchScore],
    ["Recent activity", insight.breakdown.activityScore],
    ["Collaboration", insight.breakdown.ossScore],
  ] as const;

  return (
    <div className="rounded-lg border bg-background p-4">
      <SectionTitle title="Score breakdown" />
      <div className="mt-3 space-y-3">
        {rows.map(([label, value]) => (
          <MetricBar key={label} label={label} value={value} />
        ))}
      </div>
    </div>
  );
}

function ContributionModelPanel({ insight }: { insight: GitHubInsightReport }) {
  const metrics = insight.contributionMetrics;

  if (!metrics) return null;

  return (
    <div className="rounded-lg border bg-background p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <SectionTitle title="Contribution model" />
          <p className="mt-1 text-sm text-muted-foreground">
            Public GitHub metrics normalized with the executive-summary scoring weights.
          </p>
        </div>
        <Badge variant="secondary">{metrics.category}</Badge>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SignalTile label="Commits authored" value={metrics.commitsAuthored} detail="Weight 15%" />
        <SignalTile label="PRs opened" value={metrics.pullRequestsOpened} detail="Weight 15%" />
        <SignalTile label="PRs merged" value={metrics.pullRequestsMerged} detail="Weight 10%" />
        <SignalTile label="Issues opened" value={metrics.issuesOpened} detail="Weight 10%" />
        <SignalTile label="Repos contributed" value={metrics.repositoriesContributedTo} detail="Weight 10%" />
        <SignalTile label="Followers" value={metrics.followers} detail="Weight 10%" />
        <SignalTile label="Stars + forks" value={metrics.stars + metrics.forks} detail={`${metrics.stars} stars / ${metrics.forks} forks`} />
        <SignalTile label="Recent activity" value={metrics.recentActivity ? "Active" : "Quiet"} detail="Last 30 days" />
      </div>
    </div>
  );
}

function CollaborationPanel({ insight }: { insight: GitHubInsightReport }) {
  const metrics = insight.contributionMetrics;

  return (
    <div className="rounded-lg border bg-background p-4">
      <SectionTitle title="Collaboration" />
      <div className="mt-3 grid grid-cols-2 gap-2">
        <MiniMetric label="Visible PRs" value={insight.oss.totalPRs} />
        <MiniMetric label="Merged PRs" value={insight.oss.mergedPRs} />
        <MiniMetric label="Issues closed" value={metrics?.issuesClosed ?? 0} />
        <MiniMetric label="Review comments" value={metrics?.reviewComments ?? 0} />
      </div>
      {insight.oss.topRepos.length > 0 && (
        <div className="mt-3 space-y-2">
          <p className="text-xs text-muted-foreground">Top external repositories</p>
          <div className="flex flex-wrap gap-1.5">
            {insight.oss.topRepos.map((repo) => (
              <Badge key={repo} variant="outline" className="max-w-full truncate">
                {repo}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LanguageEvidencePanel({
  insight,
  languages,
}: {
  insight: GitHubInsightReport;
  languages: [string, unknown][];
}) {
  const depthEntries = Object.entries(insight.techAnalysis.depth).slice(0, 6);

  return (
    <div className="rounded-lg border bg-background p-4">
      <div className="flex items-center justify-between gap-3">
        <SectionTitle title="Language evidence" />
        <Badge variant="secondary">{insight.breakdown.techMatchScore}/100</Badge>
      </div>
      {insight.techAnalysis.matched.length > 0 && (
        <div className="mt-3">
          <p className="mb-1 text-xs text-muted-foreground">Matched</p>
          <div className="flex flex-wrap gap-1.5">
            {insight.techAnalysis.matched.map((skill) => (
              <Badge key={skill} className="bg-emerald-600 text-white">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}
      {insight.techAnalysis.missing.length > 0 && (
        <div className="mt-3">
          <p className="mb-1 text-xs text-muted-foreground">Missing</p>
          <div className="flex flex-wrap gap-1.5">
            {insight.techAnalysis.missing.map((skill) => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}
      {depthEntries.length > 0 && (
        <div className="mt-3">
          <p className="mb-1 text-xs text-muted-foreground">Depth</p>
          <div className="flex flex-wrap gap-1.5">
            {depthEntries.map(([skill, depth]) => (
              <StatusPill key={skill} label={skill} value={depth} />
            ))}
          </div>
        </div>
      )}
      {languages.length > 0 && (
        <div className="mt-3">
          <p className="mb-1 text-xs text-muted-foreground">Top language bytes</p>
          <div className="flex flex-wrap gap-1.5">
            {languages.map(([language, count]) => (
              <Badge key={language} variant="outline">
                {language} {formatCompact(Number(count))}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function RepositorySnapshot({ rows }: { rows: Array<[string, unknown]> }) {
  return (
    <div className="rounded-lg border bg-background p-4">
      <SectionTitle title="Repository snapshot" />
      <div className="mt-3 grid grid-cols-2 gap-2">
        {rows.map(([label, value]) => (
          <MiniMetric key={label} label={label} value={String(value)} />
        ))}
      </div>
    </div>
  );
}

function ProjectHighlights({
  projects,
}: {
  projects: GitHubInsightReport["projects"];
}) {
  return (
    <div className="rounded-lg border bg-background p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Project highlights
      </p>
      {projects.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">
          No strong public project highlights found yet.
        </p>
      ) : (
        <div className="mt-3 space-y-3">
          {projects.map((project) => (
            <div key={project.name} className="rounded-md border bg-muted/25 p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{project.name}</p>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
                    {project.description}
                  </p>
                </div>
                <Badge variant="secondary">{project.commits} commits</Badge>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Updated {project.lastUpdated ? formatDateTime(project.lastUpdated) : "-"} / {project.contributors} contributors
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CommitHighlights({ commits }: { commits: string[] }) {
  return (
    <div className="rounded-lg border bg-background p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Meaningful commits
      </p>
      {commits.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">
          No meaningful recent commit messages found.
        </p>
      ) : (
        <ul className="mt-3 space-y-2">
          {commits.map((commit) => (
            <li key={commit} className="rounded-md border bg-muted/25 px-3 py-2 text-sm">
              {commit}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
      {title}
    </p>
  );
}

function SignalTile({
  label,
  value,
  detail,
}: {
  label: string;
  value: string | number;
  detail: string;
}) {
  return (
    <div className="rounded-md border bg-muted/25 px-3 py-3">
      <p className="text-xl font-semibold tracking-tight">
        {typeof value === "number" ? formatCompact(value) : value}
      </p>
      <p className="mt-1 text-xs font-medium text-foreground">{label}</p>
      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
    </div>
  );
}

function MetricBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-3 text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">{value}/100</span>
      </div>
      <ProgressBar value={value} />
    </div>
  );
}

function ProgressBar({
  value,
  className = "",
}: {
  value: number;
  className?: string;
}) {
  return (
    <div className={`h-2 overflow-hidden rounded-full bg-muted ${className}`}>
      <div
        className="h-full rounded-full bg-primary transition-all"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md bg-muted/50 px-3 py-2">
      <p className="text-base font-semibold">{String(value)}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function ConfidenceBadge({ confidence }: { confidence: GitHubInsightReport["confidence"] }) {
  const tone =
    confidence === "HIGH"
      ? "bg-emerald-600 text-white"
      : confidence === "MEDIUM"
        ? "bg-amber-500 text-white"
        : "bg-rose-600 text-white";

  return <Badge className={tone}>{confidence} confidence</Badge>;
}

function StatusPill({ label, value }: { label: string; value: string }) {
  return (
    <Badge variant="outline" className="gap-1">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </Badge>
  );
}

function Detail({ label, value }: { label: string; value: unknown }) {
  return (
    <div className="rounded-md border bg-muted/25 px-3 py-2">
      <p className="text-xs capitalize text-muted-foreground">{label}</p>
      <div className="mt-1 break-words text-sm font-medium">
        {formatValue(value)}
      </div>
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="grid size-10 shrink-0 place-items-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">
      {initials || "C"}
    </div>
  );
}

function ScoreBadge({ score }: { score?: number }) {
  if (typeof score !== "number") {
    return <Badge variant="secondary">No score</Badge>;
  }

  const tone =
    score >= 80
      ? "bg-emerald-600 text-white"
      : score >= 60
        ? "bg-amber-500 text-white"
        : "bg-rose-600 text-white";

  return <Badge className={tone}>{score}/100</Badge>;
}

function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "HIRED"
      ? "bg-emerald-600 text-white"
      : status === "REJECTED"
        ? "bg-rose-600 text-white"
        : "";

  return <Badge className={tone} variant={tone ? "default" : "secondary"}>{status.toLowerCase()}</Badge>;
}

function StatusActions({
  application,
  disabled,
  roleFilled,
  onChange,
}: {
  application: Application;
  disabled: boolean;
  roleFilled: boolean;
  onChange: (status: string) => void;
}) {
  const canHire = !roleFilled || application.status === "HIRED";
  const options = [
    { status: "APPLIED", label: "Applied", icon: null, disabled: false },
    { status: "SHORTLISTED", label: "Shortlist", icon: CheckCircle2, disabled: false },
    { status: "INTERVIEW", label: "Move to interview", icon: CheckCircle2, disabled: false },
    { status: "HIRED", label: "Mark hired", icon: CheckCircle2, disabled: !canHire },
    { status: "REJECTED", label: "Reject", icon: XCircle, disabled: false },
  ];

  return (
    <div className="flex items-center gap-2" onClick={(event) => event.stopPropagation()}>
      <StatusBadge status={application.status} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" size="sm" variant="outline" disabled={disabled}>
            Update
            <ChevronDown className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {options.map((option) => {
            const Icon = option.icon;
            const isCurrent = application.status === option.status;

            return (
              <DropdownMenuItem
                key={option.status}
                disabled={disabled || option.disabled || isCurrent}
                variant={option.status === "REJECTED" ? "destructive" : "default"}
                onSelect={() => onChange(option.status)}
              >
                {Icon ? <Icon className="size-4" /> : <span className="size-4" />}
                {option.label}
                {isCurrent && <span className="ml-auto text-xs text-muted-foreground">Current</span>}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function getScore(application: Application) {
  return application.scores?.[0]?.totalScore;
}

function getGitHubUsername(application: Application) {
  return (
    application.scores?.[0]?.breakdown?.profile?.username ||
    findGitHubResponse(application.responses)
  );
}

function findGitHubResponse(responses: Record<string, unknown>) {
  const entry = Object.entries(responses).find(([key]) =>
    key.toLowerCase().includes("github")
  );
  if (!entry) return null;
  const value = String(entry[1] ?? "").trim();
  const match = value.match(/github\.com\/([A-Za-z0-9-]+)/i);
  return (match?.[1] ?? value.replace(/^@/, "")) || null;
}

function getTableResponseColumns(fields: ApplicationField[]) {
  const hiddenIds = new Set(["full_name", "fullName", "name", "email"]);

  return fields
    .filter((field) => field.id && !hiddenIds.has(field.id))
    .slice(0, 4);
}

function getResponseRows(
  responses: Record<string, unknown>,
  fields: ApplicationField[]
) {
  const seen = new Set<string>();
  const rows = fields
    .filter((field) => field.id in responses)
    .map((field) => {
      seen.add(field.id);
      return {
        key: field.id,
        label: field.label || labelizeKey(field.id),
        value: responses[field.id],
      };
    });

  Object.entries(responses).forEach(([key, value]) => {
    if (seen.has(key)) return;
    rows.push({ key, label: labelizeKey(key), value });
  });

  return rows;
}

function formatResponsePreview(value: unknown) {
  if (isUploadedFile(value)) return value.name;
  if (typeof value === "string" && isUrlString(value)) return "Open link";
  if (Array.isArray(value)) return value.join(", ");
  if (value === undefined || value === null || value === "") return "-";
  if (typeof value === "object") return "Submitted";
  return String(value);
}

function formatCompact(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatValue(value: unknown): React.ReactNode {
  if (isUploadedFile(value)) {
    return <LinkValue href={value.url} label={value.name} />;
  }

  if (typeof value === "string" && isUrlString(value)) {
    return <LinkValue href={value} label={value} />;
  }

  if (Array.isArray(value)) return value.join(", ");
  if (value === undefined || value === null || value === "") return "-";
  if (typeof value === "object") return "Submitted";
  return String(value);
}

function LinkValue({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex max-w-full items-center gap-1 text-primary underline-offset-4 hover:underline"
    >
      <span className="truncate">{label}</span>
      <ExternalLink className="size-3.5 shrink-0" />
    </a>
  );
}

function isUrlString(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isUploadedFile(value: unknown): value is { url: string; name: string } {
  return (
    !!value &&
    typeof value === "object" &&
    "url" in value &&
    typeof value.url === "string" &&
    "name" in value &&
    typeof value.name === "string"
  );
}

function labelizeKey(key: string) {
  return key
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
