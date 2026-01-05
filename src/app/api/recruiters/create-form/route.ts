import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { cacheKeys } from "@/lib/cacheKeys";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id!;

    // if (!userId) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

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

    // Salary range validation
    if (salaryMin != null && salaryMax != null && salaryMin > salaryMax) {
      return NextResponse.json(
        { message: "salaryMin cannot be greater than salaryMax" },
        { status: 400 }
      );
    }

    const domain = await prisma.domains.findFirst({
      where: {
        id: domainId,
      },
    });

    if (!domain) {
      return NextResponse.json(
        { message: "Invalid or unauthorized domain" },
        { status: 403 }
      );
    }

  
    const isValid = fields.every((f: any) => f.id && f.type && f.label);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid form fields" },
        { status: 400 }
      );
    }

    const created = await prisma.recruiterForm.create({
      data: {
        recruiterId: userId,
        domainId,

        title: formTitle,
        description: formDescription,
        fields,
        expiresAt,
        roleType,
        experience: experience,
        workMode: workMode ,
        location ,
        specialization,
        techStack,
        salaryMin,
        salaryMax,
        currency,
        contractDurationMonths,
        status: "DRAFT",
        version: 1,
      },
    });

    return NextResponse.json(created, { status: 201 });
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
