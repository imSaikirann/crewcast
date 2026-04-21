"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ApplicationFilters from "@/features/submissions/components/ApplicationFilters";
import ApplicationTable from "@/features/submissions/components/ApplicationTable";
import ApplicationsStats from "@/features/submissions/components/ApplicationsStats";

export type Application = {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  status: string;
  scores: { totalScore: number; breakdown?: any }[];
  responses: Record<string, any>;
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
};

export default function ApplicationsView({
  data,
  form,
}: {
  data: Application[];
  form: FormSummary;
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [scoreBand, setScoreBand] = useState("");
  const [sort, setSort] = useState("score_desc");

  const scores = data
    .map((application) => getScore(application))
    .filter((score): score is number => typeof score === "number");
  const averageScore = scores.length
    ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
    : 0;
  const topScore = scores.length ? Math.max(...scores) : 0;
  const roleFilled = form.hiredCount >= form.openings;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    const next = data.filter((application) => {
      const score = getScore(application);
      const matchesSearch =
        !q ||
        [
          application.fullName,
          application.email,
          JSON.stringify(application.responses),
          JSON.stringify(application.scores?.[0]?.breakdown ?? {}),
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(q));

      const matchesStatus = status ? application.status === status : true;
      const matchesScore =
        !scoreBand ||
        (scoreBand === "strong" && typeof score === "number" && score >= 80) ||
        (scoreBand === "good" &&
          typeof score === "number" &&
          score >= 60 &&
          score < 80) ||
        (scoreBand === "low" && typeof score === "number" && score < 60) ||
        (scoreBand === "missing" && typeof score !== "number");

      return matchesSearch && matchesStatus && matchesScore;
    });

    return next.sort((a, b) => {
      if (sort === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sort === "oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sort === "name") {
        return a.fullName.localeCompare(b.fullName);
      }

      return (getScore(b) ?? -1) - (getScore(a) ?? -1);
    });
  }, [data, search, scoreBand, sort, status]);

  return (
    <div className="space-y-6">
      <section className="rounded-xl border bg-background p-5 shadow-sm">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto]">
          <div className="min-w-0 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{form.status.toLowerCase()}</Badge>
              <Badge className={roleFilled ? "bg-emerald-600 text-white" : ""} variant={roleFilled ? "default" : "outline"}>
                {form.hiredCount}/{form.openings} hired
              </Badge>
              <Badge variant="outline">{formatLabel(form.workMode)}</Badge>
              <Badge variant="outline">{formatLabel(form.experience)}</Badge>
              <Badge variant="outline">{formatLabel(form.roleType)}</Badge>
            </div>
            {roleFilled && (
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                This role is fully staffed. Remaining candidates are marked rejected with a clear closure message.
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{form.title}</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                {form.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.location && (
                <span className="rounded-md border bg-muted/40 px-2.5 py-1 text-xs">
                  {form.location}
                </span>
              )}
              {form.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border bg-muted/40 px-2.5 py-1 text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
            <Button asChild>
              <Link href={`/form/${form.publicId}`}>Open public form</Link>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigator.clipboard.writeText(`${window.location.origin}/form/${form.publicId}`)}
            >
              Copy link
            </Button>
          </div>
        </div>
      </section>

      <ApplicationsStats
        totalApplications={data.length}
        filteredApplications={filtered.length}
        views={form.viewCount}
        averageScore={averageScore}
        topScore={topScore}
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

      <ApplicationTable applications={filtered} publicId={form.publicId} openings={form.openings} hiredCount={form.hiredCount} />
    </div>
  );
}

function getScore(application: Application) {
  return application.scores?.[0]?.totalScore;
}

function formatLabel(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0) + part.slice(1).toLowerCase())
    .join(" ");
}
