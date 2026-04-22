import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AppPage from "@/components/app/AppPage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/utils/date";
import { HugeIcon } from "@/utils/hugeicons";

export default async function Page({
  params,
}: {
  params: Promise<{ publicId: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const { publicId } = await params;

  const recruiter = await prisma.recruiter.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  });

  if (!recruiter) {
    redirect("/dashboard/recruiter/profile");
  }

  const form = await prisma.recruiterForm.findFirst({
    where: { publicId, recruiterId: recruiter.id },
    select: {
      title: true,
      description: true,
      publicId: true,
      viewCount: true,
      status: true,
      createdAt: true,
      expiresAt: true,
      openings: true,
      techStack: true,
      workMode: true,
      experience: true,
      roleType: true,
      location: true,
      applications: {
        select: {
          id: true,
          status: true,
          createdAt: true,
          scores: {
            select: {
              totalScore: true,
              evaluatedAt: true,
            },
            orderBy: { evaluatedAt: "desc" },
            take: 1,
          },
        },
      },
    },
  });

  if (!form) {
    redirect("/dashboard");
  }

  const scores = form.applications
    .map((application) => application.scores[0]?.totalScore)
    .filter((score): score is number => typeof score === "number");
  const applicationsCount = form.applications.length;
  const hiredCount = form.applications.filter(
    (application) => application.status === "HIRED"
  ).length;
  const conversion =
    form.viewCount > 0 ? Math.round((applicationsCount / form.viewCount) * 100) : 0;
  const averageScore = scores.length
    ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
    : 0;
  const topScore = scores.length ? Math.max(...scores) : 0;
  const scoreBands = {
    strong: scores.filter((score) => score >= 80).length,
    good: scores.filter((score) => score >= 60 && score < 80).length,
    low: scores.filter((score) => score < 60).length,
    missing: applicationsCount - scores.length,
  };
  const statusCounts = form.applications.reduce<Record<string, number>>(
    (acc, application) => {
      acc[application.status] = (acc[application.status] ?? 0) + 1;
      return acc;
    },
    {}
  );

  return (
    <AppPage
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Submissions", href: "/dashboard/submissions" },
        { label: form.title, href: `/dashboard/submissions/${form.publicId}` },
        { label: "Analytics" },
      ]}
    >
      <div className="space-y-6">
        <section className="flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Form analytics
            </p>
            <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight">
              {form.title}
            </h1>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">
              Performance, candidate volume, and scoring signals for this form.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link href={`/dashboard/submissions/${form.publicId}`}>
                <HugeIcon name="user-add" className="size-4" />
                View submissions
              </Link>
            </Button>
            <Button asChild>
              <Link href={`/form/${form.publicId}`}>
                <HugeIcon name="arrow-up-right" className="size-4" />
                Public form
              </Link>
            </Button>
          </div>
        </section>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <Metric label="Views" value={form.viewCount} helper="Job page visits" />
          <Metric label="Applications" value={applicationsCount} helper="Total submitted" />
          <Metric label="Conversion" value={`${conversion}%`} helper="Apply rate" />
          <Metric label="Average score" value={`${averageScore}/100`} helper="GitHub signal" />
          <Metric label="Top score" value={`${topScore}/100`} helper="Best candidate" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <Card className="rounded-lg border-muted-foreground/15 py-5 shadow-xs">
            <CardHeader>
              <CardTitle className="font-display text-base font-semibold">
                Candidate pipeline
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {["APPLIED", "SHORTLISTED", "INTERVIEW", "HIRED", "REJECTED"].map((status) => (
                <div key={status} className="rounded-lg border bg-secondary/30 px-4 py-3">
                  <p className="font-display text-2xl font-semibold">
                    {(statusCounts[status] ?? 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">{formatLabel(status)}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-lg border-muted-foreground/15 py-5 shadow-xs">
            <CardHeader>
              <CardTitle className="font-display text-base font-semibold">
                Form details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <Info label="Status" value={formatLabel(form.status)} />
              <Info label="Role" value={formatLabel(form.roleType)} />
              <Info label="Experience" value={formatLabel(form.experience)} />
              <Info label="Work mode" value={formatLabel(form.workMode)} />
              <Info label="Openings" value={`${hiredCount}/${form.openings ?? 1} hired`} />
              <Info label="Expires" value={formatDate(form.expiresAt.toISOString())} />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="rounded-lg border-muted-foreground/15 py-5 shadow-xs">
            <CardHeader>
              <CardTitle className="font-display text-base font-semibold">
                Score distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ScoreRow label="Strong fit" value={scoreBands.strong} total={applicationsCount} />
              <ScoreRow label="Good fit" value={scoreBands.good} total={applicationsCount} />
              <ScoreRow label="Needs review" value={scoreBands.low} total={applicationsCount} />
              <ScoreRow label="No score" value={scoreBands.missing} total={applicationsCount} />
            </CardContent>
          </Card>

          <Card className="rounded-lg border-muted-foreground/15 py-5 shadow-xs">
            <CardHeader>
              <CardTitle className="font-display text-base font-semibold">
                Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-muted-foreground">{form.description}</p>
              <div className="flex flex-wrap gap-2">
                {form.location && <Badge variant="outline">{form.location}</Badge>}
                {form.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary" className="rounded-md">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppPage>
  );
}

function Metric({
  label,
  value,
  helper,
}: {
  label: string;
  value: number | string;
  helper: string;
}) {
  return (
    <div className="rounded-lg border bg-card px-4 py-3 shadow-xs">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl font-semibold tracking-tight">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{helper}</p>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b pb-2 last:border-b-0 last:pb-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function ScoreRow({
  label,
  value,
  total,
}: {
  label: string;
  value: number;
  total: number;
}) {
  const percent = total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span>{label}</span>
        <span className="text-muted-foreground">
          {value} / {total}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function formatLabel(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0) + part.slice(1).toLowerCase())
    .join(" ");
}
