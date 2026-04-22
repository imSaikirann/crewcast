import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { cacheKeys } from "@/lib/cacheKeys";
import { prisma } from "@/lib/prisma";
import { cacheDel } from "@/lib/redis";

type FormStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ formId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { formId } = await context.params;
    const body = await request.json().catch(() => ({}));
    const nextStatus = body?.status as FormStatus | undefined;

    if (!nextStatus || !["DRAFT", "PUBLISHED", "ARCHIVED"].includes(nextStatus)) {
      return NextResponse.json({ message: "Invalid form status" }, { status: 400 });
    }

    const form = await prisma.recruiterForm.findUnique({
      where: { publicId: formId },
      select: {
        id: true,
        publicId: true,
        domainId: true,
        status: true,
        expiresAt: true,
        recruiter: {
          select: {
            id: true,
            userId: true,
            formLimit: true,
          },
        },
      },
    });

    if (!form) {
      return NextResponse.json({ message: "Form not found" }, { status: 404 });
    }

    if (form.recruiter.userId !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    if (nextStatus === "PUBLISHED") {
      if (form.expiresAt < new Date()) {
        return NextResponse.json(
          { message: "Expired forms cannot be published. Create a new form with a future expiry date." },
          { status: 400 }
        );
      }

      const activeFormsCount = await prisma.recruiterForm.count({
        where: {
          recruiterId: form.recruiter.id,
          status: "PUBLISHED",
          expiresAt: { gte: new Date() },
          id: { not: form.id },
        },
      });

      if (activeFormsCount >= form.recruiter.formLimit) {
        return NextResponse.json(
          { message: "Active form limit reached. Archive another published form first." },
          { status: 403 }
        );
      }
    }

    const updatedForm = await prisma.recruiterForm.update({
      where: { id: form.id },
      data: {
        status: nextStatus,
        publishedAt:
          nextStatus === "PUBLISHED" && form.status !== "PUBLISHED"
            ? new Date()
            : undefined,
      },
      select: {
        publicId: true,
        status: true,
      },
    });

    const activeFormCount = await prisma.recruiterForm.count({
      where: {
        recruiterId: form.recruiter.id,
        status: "PUBLISHED",
        expiresAt: { gte: new Date() },
      },
    });

    await prisma.recruiter.update({
      where: { id: form.recruiter.id },
      data: { activeFormCount },
    });

    await cacheDel(
      cacheKeys.job(form.publicId),
      cacheKeys.jobApplications(form.publicId),
      cacheKeys.recruiterJobs(form.recruiter.id),
      cacheKeys.domainForms(form.domainId),
      cacheKeys.jobs
    );

    return NextResponse.json({ message: "Form status updated", form: updatedForm });
  } catch (error) {
    console.error("Update form status error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ formId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { formId } = await context.params;
    const form = await prisma.recruiterForm.findUnique({
      where: { publicId: formId },
      select: {
        id: true,
        publicId: true,
        domainId: true,
        status: true,
        applications: {
          select: { id: true },
        },
        recruiter: {
          select: {
            id: true,
            userId: true,
            activeFormCount: true,
            totalFormsCount: true,
          },
        },
      },
    });

    if (!form) {
      return NextResponse.json({ message: "Form not found" }, { status: 404 });
    }

    if (form.recruiter.userId !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const applicationIds = form.applications.map((application) => application.id);
    await prisma.$transaction([
      prisma.applicationScore.deleteMany({
        where: { applicationId: { in: applicationIds } },
      }),
      prisma.application.deleteMany({
        where: { jobId: form.id },
      }),
      prisma.formView.deleteMany({
        where: { formId: form.id },
      }),
      prisma.jobReport.deleteMany({
        where: { formId: form.publicId },
      }),
      prisma.recruiterForm.delete({
        where: { id: form.id },
      }),
    ]);

    const monthStart = startOfMonth();
    const [totalFormsCount, activeFormCount] = await Promise.all([
      prisma.recruiterForm.count({
        where: {
          recruiterId: form.recruiter.id,
          createdAt: { gte: monthStart },
        },
      }),
      prisma.recruiterForm.count({
        where: {
          recruiterId: form.recruiter.id,
          status: "PUBLISHED",
          expiresAt: { gte: new Date() },
        },
      }),
    ]);

    await prisma.recruiter.update({
      where: { id: form.recruiter.id },
      data: {
        totalFormsCount,
        activeFormCount,
      },
    });

    await cacheDel(
      cacheKeys.job(form.publicId),
      cacheKeys.jobApplications(form.publicId),
      cacheKeys.recruiterJobs(form.recruiter.id),
      cacheKeys.domainForms(form.domainId),
      cacheKeys.jobs
    );

    return NextResponse.json({ message: "Form deleted" });
  } catch (error) {
    console.error("Delete form error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

function startOfMonth() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}
