import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AppPage from "@/components/app/AppPage";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { HugeIcon } from "@/utils/hugeicons";

import { EmptyState } from "@/components/dashboard/submissions/EmptyState";
import { MetricCard } from "@/components/dashboard/submissions/Metriccard";
import { SubmissionsTable } from "@/components/dashboard/submissions/Submissionstable";

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
  if (!session?.user?.id) redirect("/login");

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
                select: { totalScore: true, evaluatedAt: true },
                orderBy: { evaluatedAt: "desc" },
                take: 1,
              },
            },
            orderBy: { createdAt: "desc" },
            take: 25,
          },
          _count: { select: { applications: true } },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!recruiter) redirect("/dashboard/recruiter/profile");

  const submissions: RecentSubmission[] = recruiter.recruiterForms
    .flatMap((form) =>
      form.applications.map((app) => ({
        id: app.id,
        fullName: app.fullName,
        email: app.email,
        status: app.status,
        createdAt: app.createdAt.toISOString(),
        score: app.scores[0]?.totalScore,
        form: { title: form.title, publicId: form.publicId, roleType: form.roleType },
      }))
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 50);

  const totalForms = recruiter.recruiterForms.length;
  const totalSubmissions = recruiter.recruiterForms.reduce(
    (sum, f) => sum + f._count.applications,
    0
  );
  const activeForms = recruiter.recruiterForms.filter((f) => f.status === "PUBLISHED").length;
  const sevenDaysAgo = Date.now() - 1000 * 60 * 60 * 24 * 7;
  const newSubmissions = submissions.filter(
    (s) => new Date(s.createdAt).getTime() >= sevenDaysAgo
  ).length;
  const reviewedCount = submissions.filter((s) => s.status !== "APPLIED").length;

  return (
    <AppPage
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Submissions" },
      ]}
    >
      <div className="mx-auto max-w-6xl space-y-8">
        {/* â”€â”€ Page header â”€â”€ */}
        <div className="flex items-end justify-between border-b border-border pb-6 dark:border-border">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              {recruiter.companyName}
            </p>
            <h1 className="mt-1.5 text-xl font-semibold tracking-tight text-foreground">
              Submissions
            </h1>
          </div>
          <Button asChild size="sm" variant="outline" className="gap-1.5 rounded-lg text-xs">
            <Link href="/dashboard/domains">
              <HugeIcon name="add-circle" className="size-3.5" />
              New form
            </Link>
          </Button>
        </div>

        {/* â”€â”€ Metrics â”€â”€ */}
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          <MetricCard label="Forms" value={totalForms} helper={`${activeForms} published`} />
          <MetricCard label="Total" value={totalSubmissions} helper="All time" />
          <MetricCard label="This week" value={newSubmissions} helper="Last 7 days" />
          <MetricCard label="Reviewed" value={reviewedCount} helper="In recent list" />
        </div>

        {/* â”€â”€ Content â”€â”€ */}
        {totalForms === 0 ? (
          <EmptyState
            title="No forms yet"
            description="Create a form first. Candidate submissions will appear here after people apply."
          />
        ) : submissions.length === 0 ? (
          <EmptyState
            title="No submissions yet"
            description="Share your public form links. Candidate submissions will show up here automatically."
          />
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Showing {submissions.length} most recent applications
              </p>
            </div>
            <SubmissionsTable submissions={submissions} />
          </div>
        )}
      </div>
    </AppPage>
  );
}

