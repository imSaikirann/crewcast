"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ApplicationTable from "@/features/submissions/components/ApplicationTable";
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

  const applications = useMemo(
    () =>
      [...data].sort(
        (left, right) =>
          new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
      ),
    [data]
  );
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
      <section className="border-b pb-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Submissions
            </p>
            <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight">
              Candidate review
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {form.title} / {applications.length} submissions
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="rounded-md">
              {form.hiredCount}/{form.openings} hired
            </Badge>
            <Button asChild variant="outline">
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
    <Card className="rounded-lg border-muted-foreground/15 py-5 shadow-xs">
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="font-display text-base font-semibold">
            Compare candidates
          </CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Select up to three candidates from the table.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={selectedCount > 0 ? "default" : "secondary"}>
            {selectedCount}/3 selected
          </Badge>
          {selectedCount > 0 && (
            <Button variant="outline" size="sm" onClick={onClear}>
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {applications.length === 0 ? (
          <div className="rounded-lg border border-dashed bg-secondary/30 p-5 text-sm text-muted-foreground">
            Pick candidates with the compare button to see score, GitHub signal, and tech match side by side.
          </div>
        ) : (
          <div className="space-y-4">
            {winner && (
              <div className="rounded-lg border bg-secondary/40 px-4 py-3 text-sm">
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
      </CardContent>
    </Card>
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
    <div className={`rounded-lg border p-4 ${highlighted ? "bg-primary/5" : "bg-card"}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-semibold">{application.fullName}</p>
          <p className="truncate text-xs text-muted-foreground">{application.email}</p>
        </div>
        <ScoreBadge score={score} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <CompareMetric
          label="Tech match"
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
    <div className="rounded-md bg-secondary px-3 py-2">
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
      ? "bg-emerald-600 text-white"
      : score >= 60
        ? "bg-amber-500 text-white"
        : "bg-rose-600 text-white";

  return <Badge className={tone}>{score}/100</Badge>;
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
