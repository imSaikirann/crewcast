import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AppShell from "@/components/app/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROLES } from "@/lib/constants/roles";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (session.user.role !== ROLES.ADMIN) {
    return (
      <AppShell>
        <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>Admin access required</CardTitle>
                <CardDescription>
                  Your current account role is {session.user.role || "user"}.
                  Update this user to admin in MongoDB to manage CrewCast setup
                  data.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href="/dashboard">Back to dashboard</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </AppShell>
    );
  }

  const [
    userCount,
    recruiterCount,
    verifiedRecruiterCount,
    domainCount,
    activeDomainCount,
    formCount,
    publishedFormCount,
    flaggedFormCount,
    applicationCount,
    scoreAggregate,
    reportAggregate,
    viewCount,
    upgradeRequestCount,
    recentForms,
    githubRateLimit,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.recruiter.count(),
    prisma.recruiter.count({ where: { verified: true } }),
    prisma.domains.count(),
    prisma.domains.count({ where: { isActive: true } }),
    prisma.recruiterForm.count(),
    prisma.recruiterForm.count({ where: { status: "PUBLISHED" } }),
    prisma.recruiterForm.count({ where: { isFlagged: true } }),
    prisma.application.count(),
    prisma.applicationScore.aggregate({ _avg: { totalScore: true } }),
    prisma.recruiterForm.aggregate({ _sum: { reportCount: true } }),
    prisma.formView.count(),
    prisma.upgradeRequest.count({ where: { status: "PENDING" } }),
    prisma.recruiterForm.findMany({
      select: {
        publicId: true,
        title: true,
        status: true,
        viewCount: true,
        reportCount: true,
        createdAt: true,
        recruiter: {
          select: { companyName: true, verified: true },
        },
        _count: {
          select: { applications: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    getGitHubRateLimit(),
  ]);

  const averageScore = Math.round(scoreAggregate._avg.totalScore ?? 0);
  const reportCount = reportAggregate._sum.reportCount ?? 0;
  const conversionRate =
    viewCount > 0 ? Math.round((applicationCount / viewCount) * 100) : 0;
  const inactiveDomainCount = Math.max(domainCount - activeDomainCount, 0);

  return (
    <AppShell>
      <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex flex-col gap-1.5 border-b border-border/60 pb-5">
            <h1 className="text-xl font-semibold tracking-tight">Admin analytics</h1>
            <p className="max-w-3xl text-sm text-muted-foreground">
              Monitor recruiters, domains, forms, candidate flow, GitHub scoring,
              and report quality from one place.
            </p>
          </div>

          <div className="grid grid-cols-2 divide-x divide-y divide-border/60 overflow-hidden rounded-lg border border-border/60 sm:grid-cols-2 xl:grid-cols-4">
            <AdminMetric
              title="Recruiters"
              value={recruiterCount}
              helper={`${verifiedRecruiterCount} verified, ${userCount} users`}
            />
            <AdminMetric
              title="Applications"
              value={applicationCount}
              helper={`${conversionRate}% conversion from ${viewCount} views`}
            />
            <AdminMetric
              title="GitHub score"
              value={`${averageScore}/100`}
              helper="Average latest evaluation score"
            />
            <AdminMetric
              title="Quality alerts"
              value={flaggedFormCount + reportCount}
              helper={`${flaggedFormCount} flagged forms, ${reportCount} reports`}
            />
          </div>

          <div className="grid grid-cols-2 divide-x divide-y divide-border/60 overflow-hidden rounded-lg border border-border/60 sm:grid-cols-2 xl:grid-cols-4">
            <AdminMetric
              title="Total domains"
              value={domainCount}
              helper={`${activeDomainCount} active, ${inactiveDomainCount} hidden`}
            />
            <AdminMetric
              title="Forms"
              value={formCount}
              helper={`${publishedFormCount} published`}
            />
            <AdminMetric
              title="Upgrade requests"
              value={upgradeRequestCount}
              helper="Pending plan changes"
            />
            <AdminMetric
              title="Views"
              value={viewCount}
              helper="Public job page visits"
            />
          </div>

          <GitHubRateLimitCard rateLimit={githubRateLimit} />

          <section className="rounded-lg border border-border/60">
            <div className="flex flex-row items-start justify-between gap-4 border-b border-border/60 p-4">
              <div>
                <h2 className="text-sm font-semibold">Recent forms</h2>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Quick scan of recruiter activity and candidate traction.
                </p>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/admin/domains">Manage domains</Link>
              </Button>
            </div>
            <div>
              {recentForms.length === 0 ? (
                <div className="p-6 text-center text-sm text-muted-foreground">
                  No forms created yet.
                </div>
              ) : (
                recentForms.map((form) => (
                  <div
                    key={form.publicId}
                    className="grid gap-3 border-t border-border/50 p-4 first:border-t-0 md:grid-cols-[1fr_auto]"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium">{form.title}</p>
                        <Badge variant="secondary" className="font-normal capitalize">
                          {form.status.toLowerCase()}
                        </Badge>
                        {form.recruiter.verified && (
                          <Badge className="border-0 bg-emerald-500/10 font-normal text-emerald-600 dark:text-emerald-400">
                            verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {form.recruiter.companyName}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground md:justify-end">
                      <span>{form.viewCount} views</span>
                      <span>{form._count.applications} applications</span>
                      <span>{form.reportCount} reports</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
    </AppShell>
  );
}

type GitHubRateResource = {
  limit: number;
  used: number;
  remaining: number;
  reset: number;
};

type GitHubRateLimit =
  | {
      ok: true;
      resources: {
        core?: GitHubRateResource;
        graphql?: GitHubRateResource;
        search?: GitHubRateResource;
      };
    }
  | {
      ok: false;
      error: string;
    };

function GitHubRateLimitCard({ rateLimit }: { rateLimit: GitHubRateLimit }) {
  return (
    <section className="rounded-lg border border-border/60">
      <div className="border-b border-border/60 p-4">
        <h2 className="text-sm font-semibold">GitHub token usage</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Live API quota for the GitHub token used by candidate scoring.
        </p>
      </div>
      <div className="p-4">
        {!rateLimit.ok ? (
          <div className="rounded-lg border border-dashed border-border/60 p-4 text-sm text-muted-foreground">
            {rateLimit.error}
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-3">
            <GitHubRateMetric
              title="GraphQL"
              helper="Primary scoring pipeline"
              resource={rateLimit.resources.graphql}
            />
            <GitHubRateMetric
              title="REST core"
              helper="Profile, repos, languages"
              resource={rateLimit.resources.core}
            />
            <GitHubRateMetric
              title="REST search"
              helper="Pull request lookup"
              resource={rateLimit.resources.search}
            />
          </div>
        )}
      </div>
    </section>
  );
}

function GitHubRateMetric({
  title,
  helper,
  resource,
}: {
  title: string;
  helper: string;
  resource?: GitHubRateResource;
}) {
  if (!resource) {
    return (
      <div className="rounded-lg border border-border/60 p-4">
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-2 text-sm text-muted-foreground">No quota data returned.</p>
      </div>
    );
  }

  const percentUsed =
    resource.limit > 0 ? Math.round((resource.used / resource.limit) * 100) : 0;

  return (
    <div className="rounded-lg border border-border/60 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="mt-1 text-xs text-muted-foreground">{helper}</p>
        </div>
        <Badge variant={resource.remaining > 0 ? "secondary" : "destructive"} className="font-normal">
          {resource.remaining} left
        </Badge>
      </div>
      <p className="mt-4 text-2xl font-semibold tabular-nums">
        {resource.used.toLocaleString()}
        <span className="text-sm font-medium text-muted-foreground">
          {" "}
          / {resource.limit.toLocaleString()}
        </span>
      </p>
      <div className="mt-3 h-1.5 rounded-full bg-muted">
        <div
          className="h-1.5 rounded-full bg-primary"
          style={{ width: `${Math.min(percentUsed, 100)}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Resets {formatGitHubReset(resource.reset)}
      </p>
    </div>
  );
}

async function getGitHubRateLimit(): Promise<GitHubRateLimit> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return {
      ok: false,
      error: "GITHUB_TOKEN is not configured, so GitHub quota cannot be shown.",
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const response = await fetch("https://api.github.com/rate_limit", {
      cache: "no-store",
      signal: controller.signal,
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    if (!response.ok) {
      return {
        ok: false,
        error: `GitHub quota request failed with status ${response.status}.`,
      };
    }

    const payload = (await response.json()) as {
      resources?: GitHubRateLimit extends { ok: true; resources: infer R }
        ? R
        : never;
    };

    return {
      ok: true,
      resources: payload.resources ?? {},
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? `GitHub quota unavailable: ${error.message}`
          : "GitHub quota unavailable.",
    };
  } finally {
    clearTimeout(timeout);
  }
}

function formatGitHubReset(reset: number) {
  if (!reset) return "unknown";

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(reset * 1000));
}

function AdminMetric({
  title,
  value,
  helper,
}: {
  title: string;
  value: number | string;
  helper: string;
}) {
  return (
    <div className="px-4 py-4">
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {title}
      </p>
      <p className="mt-1.5 text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{helper}</p>
    </div>
  );
}
