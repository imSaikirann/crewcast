import JobsClient from "@/features/jobs/components/JobFilters";
import type { Job } from "@/features/jobs/types/job";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const jobs = await prisma.recruiterForm.findMany({
    where: {
      isFlagged: false,
      status: { not: "ARCHIVED" },
      expiresAt: { gt: new Date() },
    },
    select: {
      id: true,
      publicId: true,
      title: true,
      description: true,
      techStack: true,
      salaryMax: true,
      salaryMin: true,
      currency: true,
      experience: true,
      location: true,
      roleType: true,
      workMode: true,
      specialization: true,
      expiresAt: true,
      createdAt: true,
      viewCount: true,
      recruiter: {
        select: {
          companyName: true,
          verified: true,
        },
      },
      domain: {
        select: {
          title: true,
        },
      },
      _count: {
        select: {
          applications: true,
        },
      },
    },
    orderBy: [{ createdAt: "desc" }],
  });

  const jobData: Job[] = jobs.map((job) => ({
    id: job.id,
    publicId: job.publicId,
    title: job.title,
    description: job.description,
    techStack: job.techStack,
    salaryMin: job.salaryMin,
    salaryMax: job.salaryMax,
    currency: job.currency,
    experience: job.experience,
    location: job.location,
    roleType: job.roleType,
    workMode: job.workMode,
    specialization: job.specialization,
    expiresAt: job.expiresAt.toISOString(),
    createdAt: job.createdAt.toISOString(),
    companyName: job.recruiter.companyName,
    companyVerified: job.recruiter.verified,
    domainTitle: job.domain.title,
    applicationsCount: job._count.applications,
    viewCount: job.viewCount,
  }));

  return (
    <main className="min-h-screen bg-[#f8faf7] px-4 py-24 text-slate-950 transition-colors dark:bg-neutral-950 dark:text-white sm:px-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">
              Public job board
            </p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
              Open roles hiring through Crewcast
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground">
              Browse live hiring forms, review the role details, and apply with
              your GitHub profile for software jobs.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 rounded-lg border bg-background p-4 shadow-sm">
            <BoardStat label="Open jobs" value={jobData.length} />
            <BoardStat
              label="Remote"
              value={jobData.filter((job) => job.workMode === "REMOTE").length}
            />
            <BoardStat
              label="Companies"
              value={
                new Set(jobData.map((job) => job.companyName).filter(Boolean))
                  .size
              }
            />
          </div>
        </section>

        <JobsClient jobs={jobData} />
      </div>
    </main>
  );
}

function BoardStat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
