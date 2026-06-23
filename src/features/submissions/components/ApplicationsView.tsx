"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ApplicationTable from "@/features/submissions/components/ApplicationTable";
import ApplicationFilters from "@/features/submissions/components/ApplicationFilters";
import { HugeIcon } from "@/utils/hugeicons";

export type Application = {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  status: string;
  scores: { totalScore: number; breakdown?: any }[];
  responses: Record<string, any>;
};

export type GitHubInsightReport = {
  totalScore: number;
  confidence: "LOW" | "MEDIUM" | "HIGH";
  summary: string;
  breakdown: {
    repoScore: number;
    techMatchScore: number;
    activityScore: number;
    ossScore: number;
  };
  techAnalysis: {
    matched: string[];
    missing: string[];
    depth: Record<string, "HIGH" | "MEDIUM" | "LOW">;
  };
  oss: {
    totalPRs: number;
    mergedPRs: number;
    topRepos: string[];
  };
  projects: Array<{
    name: string;
    description: string;
    tech: string[];
    lastUpdated: string;
    commits: number;
    contributors: number;
  }>;
  commits: string[];
  activity: {
    lastActive: string;
    status: "HIGH" | "MEDIUM" | "LOW";
  };
  ownership: {
    ownedRepos: number;
    contributedRepos: number;
  };
  contributionMetrics?: {
    commitsAuthored: number;
    pullRequestsOpened: number;
    pullRequestsMerged: number;
    issuesOpened: number;
    issuesClosed: number;
    reviewComments: number;
    issueComments: number;
    repositoriesContributedTo: number;
    followers: number;
    stars: number;
    forks: number;
    languagesUsed: number;
    recentActivity: number;
    category: string;
  };
  warnings: string[];
};

export type ApplicationField = {
  id: string;
  label: string;
  type?: string;
};

type FormSummary = {
  title: string;
  description: string;
  publicId: string;
  viewCount: number;
  status: string;
  expiresAt: string;
  openings: number;
  hiredCount: number;
  techStack: string[];
  workMode: string;
  experience: string;
  roleType: string;
  location: string | null;
  fields: ApplicationField[];
};

export default function ApplicationsView({
  data,
  form,
}: {
  data: Application[];
  form: FormSummary;
}) {
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [scoreBand, setScoreBand] = useState("");
  const [sort, setSort] = useState("newest");

  const applications = useMemo(() => {
    const term = search.trim().toLowerCase();

    const filtered = data.filter((application) => {
      if (status && application.status !== status) return false;

      const score = getScore(application);
      if (scoreBand === "strong" && !(typeof score === "number" && score >= 80)) return false;
      if (scoreBand === "good" && !(typeof score === "number" && score >= 60 && score < 80)) return false;
      if (scoreBand === "low" && !(typeof score === "number" && score < 60)) return false;
      if (scoreBand === "missing" && typeof score === "number") return false;

      if (term) {
        const haystack = [
          application.fullName,
          application.email,
          getInsightReport(application)?.summary ?? "",
          ...Object.values(application.responses ?? {}).map((value) => String(value ?? "")),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(term)) return false;
      }

      return true;
    });

    return filtered.sort((left, right) => {
      if (sort === "name") return left.fullName.localeCompare(right.fullName);
      if (sort === "oldest")
        return new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime();
      if (sort === "score_desc") return (getScore(right) ?? -1) - (getScore(left) ?? -1);
      return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
    });
  }, [data, search, status, scoreBand, sort]);
  const compareApplications = useMemo(
    () =>
      compareIds
        .map((id) => applications.find((application) => application.id === id))
        .filter((application): application is Application => Boolean(application)),
    [compareIds, applications]
  );

  const toggleCompare = (applicationId: string) => {
    setCompareIds((current) => {
      if (current.includes(applicationId)) {
        return current.filter((id) => id !== applicationId);
      }

      return [...current.slice(-2), applicationId];
    });
  };

  return (
    <div className="space-y-6">
      <section className="border-b border-border/60 pb-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Candidate review</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {form.title} Â· {data.length} submissions
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="rounded-md font-normal">
              {form.hiredCount}/{form.openings} hired
            </Badge>
            <Button asChild variant="outline" size="sm">
              <Link href={`/dashboard/submissions/${form.publicId}/analytics`}>
                <HugeIcon name="analytics-up" className="size-4" />
                Form analytics
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <ComparisonPanel
        applications={compareApplications}
        selectedCount={compareIds.length}
        onClear={() => setCompareIds([])}
      />

      <ApplicationFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        scoreBand={scoreBand}
        setScoreBand={setScoreBand}
        sort={sort}
        setSort={setSort}
      />

      <ApplicationTable
        applications={applications}
        publicId={form.publicId}
        openings={form.openings}
        hiredCount={form.hiredCount}
        fields={form.fields}
        compareIds={compareIds}
        onToggleCompare={toggleCompare}
      />
    </div>
  );
}

function getScore(application: Application) {
  return application.scores?.[0]?.totalScore;
}

export function getInsightReport(application: Application) {
  return application.scores?.[0]?.breakdown?.insightReport as
    | GitHubInsightReport
    | undefined;
}

function ComparisonPanel({
  applications,
  selectedCount,
  onClear,
}: {
  applications: Application[];
  selectedCount: number;
  onClear: () => void;
}) {
  const winner = getComparisonWinner(applications);

  return (
    <section className="rounded-lg border border-border/60">
      <div className="flex flex-col gap-2 border-b border-border/60 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold">Compare candidates</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Select up to three candidates from the table.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={selectedCount > 0 ? "default" : "secondary"} className="font-normal">
            {selectedCount}/3 selected
          </Badge>
          {selectedCount > 0 && (
            <Button variant="outline" size="sm" onClick={onClear}>
              Clear
            </Button>
          )}
        </div>
      </div>
      <div className="p-4">
        {applications.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border/60 p-5 text-sm text-muted-foreground">
            Pick candidates with the compare button to see score, GitHub signal, and tech match side by side.
          </div>
        ) : (
          <div className="space-y-4">
            {winner && (
              <div className="rounded-lg border border-border/60 bg-muted/30 px-4 py-3 text-sm">
                Stronger fit by score: <span className="font-semibold">{winner.fullName}</span>
              </div>
            )}
            <div className="grid gap-3 lg:grid-cols-3">
              {applications.map((application) => (
                <CompareCard
                  key={application.id}
                  application={application}
                  highlighted={winner?.id === application.id}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function CompareCard({
  application,
  highlighted,
}: {
  application: Application;
  highlighted: boolean;
}) {
  const score = getScore(application);
  const breakdown = application.scores?.[0]?.breakdown;
  const insight = getInsightReport(application);
  const skillsMatch = breakdown?.skillsMatch;

  return (
    <div className={`rounded-lg border border-border/60 p-4 ${highlighted ? "bg-primary/5" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-semibold">{application.fullName}</p>
          <p className="truncate text-xs text-muted-foreground">{application.email}</p>
        </div>
        <ScoreBadge score={score} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <CompareMetric
          label="Languages"
          value={
            insight
              ? `${insight.breakdown.techMatchScore}/100`
              : skillsMatch
                ? `${skillsMatch.percentage}%`
                : "-"
          }
        />
        <CompareMetric label="Activity" value={insight?.activity.status ?? "-"} />
        <CompareMetric label="Confidence" value={insight?.confidence ?? "-"} />
        <CompareMetric
          label="OSS PRs"
          value={insight?.oss.totalPRs ?? breakdown?.signals?.originalRepos ?? "-"}
        />
      </div>
      {insight?.summary && (
        <p className="mt-3 line-clamp-3 text-xs leading-5 text-muted-foreground">
          {insight.summary}
        </p>
      )}
    </div>
  );
}

function CompareMetric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md border border-border/60 px-3 py-2">
      <p className="font-semibold">{String(value)}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function ScoreBadge({ score }: { score?: number }) {
  if (typeof score !== "number") {
    return <Badge variant="secondary">No score</Badge>;
  }

  const tone =
    score >= 80
      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      : score >= 60
        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
        : "bg-rose-500/10 text-rose-600 dark:text-rose-400";

  return <Badge className={`border-0 font-medium ${tone}`}>{score}/100</Badge>;
}

function getComparisonWinner(applications: Application[]) {
  if (applications.length < 2) return null;

  const sorted = [...applications].sort(
    (left, right) => (getScore(right) ?? -1) - (getScore(left) ?? -1)
  );
  const topScore = getScore(sorted[0]) ?? -1;
  const secondScore = getScore(sorted[1]) ?? -1;

  if (topScore === secondScore) return null;
  return sorted[0];
}

