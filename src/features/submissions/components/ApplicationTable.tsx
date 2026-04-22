"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/utils/date";
import type { Application } from "./ApplicationsView";

export default function ApplicationTable({
  applications,
  publicId,
  openings,
  hiredCount,
  compareIds,
  onToggleCompare,
}: {
  applications: Application[];
  publicId: string;
  openings: number;
  hiredCount: number;
  compareIds: string[];
  onToggleCompare: (applicationId: string) => void;
}) {
  const router = useRouter();
  const [openId, setOpenId] = useState<string | null>(applications[0]?.id ?? null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const roleFilled = hiredCount >= openings;

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
                <th className="px-5 py-3 text-left">GitHub score</th>
                <th className="px-5 py-3 text-left">GitHub</th>
                <th className="px-5 py-3 text-left">Applied</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((application) => {
                const isOpen = openId === application.id;
                const score = getScore(application);
                const github = getGitHubUsername(application);
                const selected = compareIds.includes(application.id);

                return (
                  <Fragment key={application.id}>
                    <tr
                      onClick={() => setOpenId(isOpen ? null : application.id)}
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
                      <td className="px-5 py-4">
                        <ScoreBadge score={score} />
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">
                        {github ? `@${github}` : "-"}
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
                        <Button variant="ghost" size="sm" type="button">
                          {isOpen ? "Hide" : "Review"}
                        </Button>
                      </td>
                    </tr>

                    {isOpen && (
                      <tr className="border-t bg-muted/20">
                        <td colSpan={7} className="px-5 py-5">
                          <ApplicationDetails application={application} />
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 p-4 lg:hidden">
          {applications.map((application) => {
            const isOpen = openId === application.id;
            const score = getScore(application);
            const selected = compareIds.includes(application.id);

            return (
              <div key={application.id} className="rounded-lg border p-4">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : application.id)}
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

                <Button
                  type="button"
                  variant={selected ? "default" : "outline"}
                  size="sm"
                  className="mt-3 w-full"
                  onClick={() => onToggleCompare(application.id)}
                >
                  {selected ? `Selected ${compareIds.indexOf(application.id) + 1}` : "Compare"}
                </Button>
                <div className="mt-3">
                  <StatusActions
                    application={application}
                    disabled={updatingId === application.id}
                    roleFilled={roleFilled}
                    onChange={(status) => updateStatus(application.id, status)}
                  />
                </div>

                {isOpen && (
                  <div className="mt-4 border-t pt-4">
                    <ApplicationDetails application={application} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ApplicationDetails({ application }: { application: Application }) {
  const latestScore = application.scores?.[0];
  const breakdown = latestScore?.breakdown;
  const github = getGitHubUsername(application);
  const signalRows = breakdown?.signals
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

  return (
    <div className="grid gap-5 xl:grid-cols-[360px_1fr]">
      <div className="space-y-3 rounded-lg border bg-background p-4">
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

        {signalRows.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {signalRows.map(([label, value]) => (
              <div key={label} className="rounded-md bg-muted/50 px-3 py-2">
                <p className="text-base font-semibold">{String(value)}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Languages
            </p>
            <div className="flex flex-wrap gap-2">
              {languages.map(([language, count]) => (
                <Badge key={language} variant="outline">
                  {language} {String(count)}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {skillsMatch && (
          <div className="rounded-md border bg-muted/25 p-3">
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Tech match
              </p>
              <Badge variant="secondary">
                {skillsMatch.percentage}% match
              </Badge>
            </div>
            {skillsMatch.matched?.length > 0 && (
              <div className="mb-2">
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
        )}

        {breakdown?.notes?.length > 0 && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-700">
            {breakdown.notes.join(" ")}
          </div>
        )}
      </div>

      <div className="rounded-lg border bg-background p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Candidate responses
        </p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {Object.entries(application.responses).map(([key, value]) => (
            <Detail
              key={key}
              label={key.replace(/_/g, " ")}
              value={formatValue(value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border bg-muted/25 px-3 py-2">
      <p className="text-xs capitalize text-muted-foreground">{label}</p>
      <p className="mt-1 break-words text-sm font-medium">{value}</p>
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

  return (
    <div className="flex flex-wrap items-center gap-2">
      <StatusBadge status={application.status} />
      {application.status !== "HIRED" && canHire && (
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={disabled}
          onClick={(event) => {
            event.stopPropagation();
            onChange("HIRED");
          }}
        >
          Mark hired
        </Button>
      )}
      {application.status !== "REJECTED" && (
        <Button
          type="button"
          size="sm"
          variant="ghost"
          disabled={disabled}
          onClick={(event) => {
            event.stopPropagation();
            onChange("REJECTED");
          }}
        >
          Reject
        </Button>
      )}
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

function formatValue(value: unknown) {
  if (Array.isArray(value)) return value.join(", ");
  if (value === undefined || value === null || value === "") return "-";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}
