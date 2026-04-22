import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CreateRecruiterSchema } from "@/lib/validators/recruiter";
import { createAndSendRecruiterVerification } from "@/lib/recruiterVerification";

export async function GET(
  req: NextRequest,
) {
  try {

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
   
    const profile = await prisma.recruiter.findUnique({
      where: { userId:session.user.id! },
      select: {
        id: true,
        userId:true,
        formLimit:true,
        companyEmail:true,
        companyName:true,
        website:true,
        linkedinLink:true,
        verified:true,
        plan:true,
        activeFormCount:true,
        totalFormsCount:true,
        totalFormsLimit:true,
        createdAt:true,
      },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const monthStart = startOfMonth();
    const [activeFormCount, totalFormsCount] = await Promise.all([
      prisma.recruiterForm.count({
        where: {
          recruiterId: profile.id,
          status: "PUBLISHED",
          expiresAt: { gte: new Date() },
        },
      }),
      prisma.recruiterForm.count({
        where: {
          recruiterId: profile.id,
          createdAt: { gte: monthStart },
        },
      }),
    ]);

    return NextResponse.json({
      ...profile,
      activeFormCount,
      totalFormsCount,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

function startOfMonth() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

export async function PUT(
  req: NextRequest,
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = CreateRecruiterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { companyName, website, linkedinLink, companyEmail } = parsed.data;

    const existingProfile = await prisma.recruiter.findUnique({
      where: { userId: session.user.id! },
    });

    if (!existingProfile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const emailChanged = existingProfile.companyEmail !== companyEmail;
    const verified = !emailChanged
      ? existingProfile.verified 
      : false;

    const updatedProfile = await prisma.recruiter.update({
      where: { userId: session.user.id! },
      data: {
        companyName,
        companyEmail,
        website,
        linkedinLink,
        verified,
      },
      select: {
        id: true,
        userId: true,
        formLimit: true,
        companyEmail: true,
        companyName: true,
        website: true,
        linkedinLink: true,
        verified: true,
        plan: true,
        activeFormCount: true,
        totalFormsCount: true,
        totalFormsLimit: true,
        createdAt: true,
      },
    });

    if (emailChanged) {
      await createAndSendRecruiterVerification(session.user.id!, companyEmail);
    }

    return NextResponse.json(updatedProfile);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const recruiter = await prisma.recruiter.findUnique({
      where: { userId: session.user.id },
      select: {
        id: true,
        recruiterForms: {
          select: {
            id: true,
            publicId: true,
            applications: {
              select: { id: true },
            },
          },
        },
      },
    });

    if (!recruiter) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const formIds = recruiter.recruiterForms.map((form) => form.id);
    const publicIds = recruiter.recruiterForms.map((form) => form.publicId);
    const applicationIds = recruiter.recruiterForms.flatMap((form) =>
      form.applications.map((application) => application.id)
    );

    await prisma.$transaction([
      prisma.applicationScore.deleteMany({
        where: { applicationId: { in: applicationIds } },
      }),
      prisma.application.deleteMany({
        where: { jobId: { in: formIds } },
      }),
      prisma.formView.deleteMany({
        where: { formId: { in: formIds } },
      }),
      prisma.jobReport.deleteMany({
        where: { formId: { in: publicIds } },
      }),
      prisma.recruiterForm.deleteMany({
        where: { recruiterId: recruiter.id },
      }),
      prisma.emailVerification.deleteMany({
        where: { userId: session.user.id },
      }),
      prisma.recruiter.delete({
        where: { userId: session.user.id },
      }),
    ]);

    return NextResponse.json({ message: "Recruiter profile deleted" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
