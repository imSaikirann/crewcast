import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { cacheKeys } from "@/lib/cacheKeys";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const body = await req.json();
    const {
      formTitle,
      formDescription,
      fields,
      domainId,
      expiresAt,
      roleType,
      experience,
      workMode,
      location,
      specialization,
      techStack,
      salaryMin,
      salaryMax,
      currency,
      contractDurationMonths,
    } = body;

    if (!formTitle || !formDescription || !Array.isArray(fields) || !domainId) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    if (salaryMin != null && salaryMax != null && salaryMin > salaryMax) {
      return NextResponse.json(
        { message: "salaryMin cannot be greater than salaryMax" },
        { status: 400 }
      );
    }

    const recruiter = await prisma.recruiter.findUnique({
      where: { userId },
    });

    if (!recruiter) {
      return NextResponse.json({ message: "Recruiter not found" }, { status: 403 });
    }

 
    if (recruiter.totalFormsCount >= recruiter.totalFormsLimit) {
      return NextResponse.json(
        { message: "Form creation limit reached. Upgrade required." },
        { status: 403 }
      );
    }

    const domain = await prisma.domains.findUnique({
      where: { id: domainId },
    });

    if (!domain) {
      return NextResponse.json({ message: "Invalid domain" }, { status: 400 });
    }

    const isValid = fields.every((f: any) => f.id && f.type && f.label);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid form fields" },
        { status: 400 }
      );
    }

    await prisma.$transaction([
      prisma.recruiterForm.create({
        data: {
          recruiterId: userId,   
          domainId,
          title: formTitle,
          description: formDescription,
          fields,
          expiresAt,
          roleType,
          experience,
          workMode,
          location,
          specialization,
          techStack,
          salaryMin,
          salaryMax,
          currency,
          contractDurationMonths,
          status: "DRAFT",
          version: 1,
        },
      }),
      prisma.recruiter.update({
        where: { id: recruiter.id },
        data: {
          totalFormsCount: { increment: 1 },
        },
      }),
    ]);

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("Create job error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


export async function GET() {
  try {
    const data = await prisma.recruiterForm.findMany({
      select: {
        id: true,
        title: true,
        status: true,
        createdAt: true,
        publishedAt: true,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
