import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AppPage from "@/components/app/AppPage";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { formatDateTime } from "@/utils/date";
import { HugeIcon } from "@/utils/hugeicons";

type RecentSubmission = {
  id: string;
  fullName: string;
  email: string;
  status: string;
  createdAt: string;
  score?: number;
  form: {
    title: string;
    publicId: string;
    roleType: string;
  };
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const recruiter = await prisma.recruiter.findUnique({
    where: { userId: session.user.id },
    select: {
      id: true,
      companyName: true,
      recruiterForms: {
        select: {
          id: true,
          title: true,
          publicId: true,
          roleType: true,
          status: true,
          applications: {
            select: {
              id: true,
              fullName: true,
              email: true,
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
            orderBy: { createdAt: "desc" },
            take: 25,
          },
          _count: {
            select: { applications: true },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!recruiter) {
    redirect("/dashboard/recruiter/profile");
  }

  const submissions: RecentSubmission[] = recruiter.recruiterForms
    .flatMap((form) =>
      form.applications.map((application) => ({
        id: application.id,
        fullName: application.fullName,
        email: application.email,
        status: application.status,
        createdAt: application.createdAt.toISOString(),
        score: application.scores[0]?.totalScore,
        form: {
          title: form.title,
          publicId: form.publicId,
          roleType: form.roleType,
        },
      }))
    )
    .sort((left, right) => {
      return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
    })
    .slice(0, 50);

  const totalForms = recruiter.recruiterForms.length;
  const totalSubmissions = recruiter.recruiterForms.reduce(
    (sum, form) => sum + form._count.applications,
    0
  );
  const activeForms = recruiter.recruiterForms.filter(
    (form) => form.status === "PUBLISHED"
  ).length;
  const newSubmissions = submissions.filter((submission) => {
    const submittedAt = new Date(submission.createdAt).getTime();
    const sevenDaysAgo = Date.now() - 1000 * 60 * 60 * 24 * 7;
    return submittedAt >= sevenDaysAgo;
  }).length;

  return (
    <AppPage
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Submissions" },
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Submissions
            </p>
            <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight">
              Recent candidate submissions
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Applications received across {recruiter.companyName} job forms.
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/domains">
              <HugeIcon name="add-circle" className="size-4" />
              New form
            </Link>
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Metric label="Forms" value={totalForms} helper={`${activeForms} published`} />
          <Metric label="Submissions" value={totalSubmissions} helper="All time" />
          <Metric label="Recent" value={newSubmissions} helper="Last 7 days" />
          <Metric
            label="Reviewed"
            value={submissions.filter((submission) => submission.status !== "APPLIED").length}
            helper="In recent list"
          />
        </div>

        {totalForms === 0 ? (
          <Alert className="rounded-lg">
            <AlertTitle>No forms yet</AlertTitle>
            <AlertDescription>
              Create a form first. Candidate submissions will appear here after people apply.
            </AlertDescription>
          </Alert>
        ) : submissions.length === 0 ? (
          <Alert className="rounded-lg">
            <AlertTitle>No submissions yet</AlertTitle>
            <AlertDescription>
              Share your public form links. Recent candidate submissions will show up here automatically.
            </AlertDescription>
          </Alert>
        ) : (
          <Card className="rounded-lg border-muted-foreground/15 py-5 shadow-xs">
            <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="font-display text-base font-semibold">
                  Recent submissions
                </CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  Showing the latest {submissions.length} applications across your forms.
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {submissions.map((submission) => (
                <SubmissionRow key={submission.id} submission={submission} />
              ))}
            </CardContent>
          </Card>
        )}
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
  value: number;
  helper: string;
}) {
  return (
    <div className="rounded-lg border bg-card px-4 py-3 shadow-xs">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl font-semibold tracking-tight">
        {value.toLocaleString()}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{helper}</p>
    </div>
  );
}

function SubmissionRow({ submission }: { submission: RecentSubmission }) {
  return (
    <Link
      href={`/dashboard/submissions/${submission.form.publicId}`}
      className="grid gap-3 rounded-lg border bg-card px-4 py-3 text-sm transition hover:-translate-y-0.5 hover:bg-secondary/50 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_auto_auto_auto]"
    >
      <div className="min-w-0">
        <p className="truncate font-semibold text-foreground">{submission.fullName}</p>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">{submission.email}</p>
      </div>

      <div className="min-w-0">
        <p className="truncate font-medium text-foreground">{submission.form.title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {formatLabel(submission.form.roleType)}
        </p>
      </div>

      <StatusBadge status={submission.status} />
      <ScoreBadge score={submission.score} />
      <p className="whitespace-nowrap text-xs text-muted-foreground md:text-sm">
        {formatDateTime(submission.createdAt)}
      </p>
    </Link>
  );
}

function StatusBadge({ status }: { status: string }) {
  const className =
    status === "HIRED"
      ? "bg-[#4CAF82] text-white"
      : status === "REJECTED"
        ? "bg-destructive text-white"
        : "";

  return (
    <Badge variant={className ? "default" : "secondary"} className={className}>
      {formatLabel(status)}
    </Badge>
  );
}

function ScoreBadge({ score }: { score?: number }) {
  if (typeof score !== "number") {
    return <Badge variant="outline">No score</Badge>;
  }

  const className =
    score >= 80
      ? "bg-[#4CAF82] text-white"
      : score >= 60
        ? "bg-amber-500 text-white"
        : "bg-destructive text-white";

  return <Badge className={className}>{Math.round(score)}/100</Badge>;
}

function formatLabel(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0) + part.slice(1).toLowerCase())
    .join(" ");
}
