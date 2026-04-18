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
  ]);

  const averageScore = Math.round(scoreAggregate._avg.totalScore ?? 0);
  const reportCount = reportAggregate._sum.reportCount ?? 0;
  const conversionRate =
    viewCount > 0 ? Math.round((applicationCount / viewCount) * 100) : 0;
  const inactiveDomainCount = Math.max(domainCount - activeDomainCount, 0);

  return (
    <AppShell>
      <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-muted-foreground">
              Platform control room
            </p>
            <h1 className="text-3xl font-bold tracking-tight">
              Admin Analytics
            </h1>
            <p className="max-w-3xl text-muted-foreground">
              Monitor recruiters, domains, forms, candidate flow, GitHub scoring,
              and report quality from one place.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

          <Card className="border-muted-foreground/15">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <CardTitle>Recent forms</CardTitle>
                <CardDescription>
                  Quick scan of recruiter activity and candidate traction.
                </CardDescription>
              </div>
              <Button asChild variant="outline">
                <Link href="/admin/domains">Manage domains</Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentForms.length === 0 ? (
                <div className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
                  No forms created yet.
                </div>
              ) : (
                recentForms.map((form) => (
                  <div
                    key={form.publicId}
                    className="grid gap-3 rounded-lg border p-4 md:grid-cols-[1fr_auto]"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium">{form.title}</p>
                        <Badge variant="secondary">
                          {form.status.toLowerCase()}
                        </Badge>
                        {form.recruiter.verified && (
                          <Badge className="bg-emerald-600 text-white">
                            verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {form.recruiter.companyName}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span className="rounded-md bg-muted px-3 py-2">
                        {form.viewCount} views
                      </span>
                      <span className="rounded-md bg-muted px-3 py-2">
                        {form._count.applications} applications
                      </span>
                      <span className="rounded-md bg-muted px-3 py-2">
                        {form.reportCount} reports
                      </span>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </AppShell>
  );
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
    <Card className="border-muted-foreground/15">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-xs text-muted-foreground">{helper}</p>
      </CardContent>
    </Card>
  );
}
