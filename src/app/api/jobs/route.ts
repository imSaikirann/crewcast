import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cacheGet, cacheSet } from "@/lib/redis";
import { cacheKeys } from "@/lib/cacheKeys";

export async function GET() {
  try {
    const cached = await cacheGet<string>(cacheKeys.jobs);
    if (cached) {
      return NextResponse.json(JSON.parse(cached));
    }

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
        techStack: true,
        description: true,
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

    const payload = jobs.map((job) => ({
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
      expiresAt: job.expiresAt,
      createdAt: job.createdAt,
      companyName: job.recruiter.companyName,
      companyVerified: job.recruiter.verified,
      domainTitle: job.domain.title,
      applicationsCount: job._count.applications,
      viewCount: job.viewCount,
    }));

    await cacheSet(cacheKeys.jobs, JSON.stringify(payload), 30);

    return NextResponse.json(payload);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
