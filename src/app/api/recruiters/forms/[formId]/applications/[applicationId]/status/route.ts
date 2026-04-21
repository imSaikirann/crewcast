import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { cacheKeys } from "@/lib/cacheKeys";
import { prisma } from "@/lib/prisma";
import { cacheDel } from "@/lib/redis";

const APPLICATION_STATUSES = [
  "APPLIED",
  "SHORTLISTED",
  "INTERVIEW",
  "REJECTED",
  "HIRED",
] as const;

type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ formId: string; applicationId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { formId: publicId, applicationId } = await context.params;
    const body = await request.json();
    const status = body.status as ApplicationStatus;

    if (!APPLICATION_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid application status" }, { status: 400 });
    }

    const form = await prisma.recruiterForm.findUnique({
      where: { publicId },
      select: {
        id: true,
        openings: true,
        recruiter: {
          select: { userId: true },
        },
      },
    });

    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }
    const openings = form.openings ?? 1;

    if (form.recruiter.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const application = await prisma.application.findFirst({
      where: { id: applicationId, jobId: form.id },
      select: { id: true, status: true },
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    if (status === "HIRED") {
      const hiredCount = await prisma.application.count({
        where: {
          jobId: form.id,
          status: "HIRED",
          id: { not: applicationId },
        },
      });

      if (hiredCount >= openings) {
        return NextResponse.json(
          { error: `This role is already full (${openings}/${openings} hired).` },
          { status: 409 }
        );
      }
    }

    const updated = await prisma.application.update({
      where: { id: applicationId },
      data: { status },
      select: { id: true, status: true },
    });

    let hiredCount = await prisma.application.count({
      where: { jobId: form.id, status: "HIRED" },
    });

    let autoRejectedCount = 0;

    if (status === "HIRED" && hiredCount >= openings) {
      const rejected = await prisma.application.updateMany({
        where: {
          jobId: form.id,
          status: { notIn: ["HIRED", "REJECTED"] },
        },
        data: { status: "REJECTED" },
      });

      autoRejectedCount = rejected.count;
      hiredCount = openings;
    }

    await cacheDel(cacheKeys.jobApplications(publicId));

    return NextResponse.json({
      ok: true,
      application: updated,
      hiredCount,
      openings,
      roleFilled: hiredCount >= openings,
      autoRejectedCount,
      message:
        hiredCount >= openings
          ? "All openings for this role are filled. Remaining active candidates were marked rejected."
          : "Application status updated.",
    });
  } catch (error) {
    console.error("Update application status error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
