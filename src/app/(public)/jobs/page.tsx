import JobsClient from "@/features/jobs/components/JobFilters";
import type { Job } from "@/features/jobs/types/job";
import { CrewcastWordmark } from "@/components/brand/CrewcastLogo";
import { cachedJson } from "@/lib/cache";
import { cacheKeys, cacheTtl } from "@/lib/cacheKeys";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const jobData = await cachedJson<Job[]>(
    { key: cacheKeys.jobs, ttl: cacheTtl.jobs },
    getPublicJobs
  );

  return (
    <main className="min-h-screen bg-background px-4 py-20 text-foreground transition-colors sm:px-10">
      <div className="mx-auto max-w-6xl space-y-7">
        <header className="flex items-center justify-between">
          <CrewcastWordmark markClassName="size-8 rounded-md" />
        </header>

        <section className="grid gap-6 border-b pb-7 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Public job board
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Open roles hiring through Crewcast
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
              Browse live hiring forms, review role details, and apply with your GitHub profile for software jobs.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 rounded-lg border bg-card p-4 shadow-xs">
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
    <div className="rounded-md bg-secondary/50 px-3 py-2">
      <p className="font-display text-2xl font-semibold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

async function getPublicJobs(): Promise<Job[]> {
  const today = startOfToday();

  const jobs = await prisma.recruiterForm.findMany({
    where: {
      isFlagged: false,
      status: "PUBLISHED",
      expiresAt: { gte: today },
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

  return jobs.map((job) => ({
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
}
