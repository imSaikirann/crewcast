import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { cacheDel } from "@/lib/redis";
import { cacheKeys } from "@/lib/cacheKeys";
import { withRequiredGitHubField } from "@/lib/formFields";

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
      openings,
      salaryMin,
      salaryMax,
      currency,
      contractDurationMonths,
    } = body;

    if (!formTitle?.trim()) {
      return NextResponse.json(
        { message: "Form title is required." },
        { status: 400 }
      );
    }

    if (!formDescription?.trim()) {
      return NextResponse.json(
        { message: "Form description is required." },
        { status: 400 }
      );
    }

    if (!domainId) {
      return NextResponse.json(
        { message: "Please select a domain before creating a form." },
        { status: 400 }
      );
    }

    if (!Array.isArray(fields) || fields.length === 0) {
      return NextResponse.json(
        { message: "Add at least one candidate field." },
        { status: 400 }
      );
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

    if (!recruiter.verified) {
      return NextResponse.json(
        { message: "Verify your company email before creating job forms." },
        { status: 403 }
      );
    }

 
    const monthStart = startOfMonth();
    const [monthlyFormsCount, activeFormsCount] = await Promise.all([
      prisma.recruiterForm.count({
        where: {
          recruiterId: recruiter.id,
          createdAt: { gte: monthStart },
        },
      }),
      prisma.recruiterForm.count({
        where: {
          recruiterId: recruiter.id,
          status: "PUBLISHED",
          expiresAt: { gte: new Date() },
        },
      }),
    ]);

    if (monthlyFormsCount >= recruiter.totalFormsLimit) {
      return NextResponse.json(
        { message: "Form creation limit reached. Upgrade required." },
        { status: 403 }
      );
    }

    if (activeFormsCount >= recruiter.formLimit) {
      return NextResponse.json(
        { message: "Active form limit reached. Archive an active form before publishing another one." },
        { status: 403 }
      );
    }

    const domain = await prisma.domains.findUnique({
      where: { id: domainId },
    });

    if (!domain) {
      return NextResponse.json({ message: "Invalid domain" }, { status: 400 });
    }

    const finalFields = withRequiredGitHubField(fields);
    const invalidField = finalFields.find((f: any) => !f.id || !f.type || !f.label);
    if (invalidField) {
      return NextResponse.json(
        { message: "Each candidate field needs a label and type." },
        { status: 400 }
      );
    }

    // Validate and set default roleType if empty or invalid
    const validRoleTypes = ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"];
    const finalRoleType = roleType && validRoleTypes.includes(roleType) 
      ? roleType 
      : "FULL_TIME"; // Default to FULL_TIME if empty or invalid

    // Validate and set default experience if empty or invalid
    const validExperience = ["JUNIOR", "MID", "SENIOR", "LEAD"];
    const finalExperience = experience && validExperience.includes(experience)
      ? experience
      : "JUNIOR"; // Default to JUNIOR if empty or invalid

    // Ensure specialization is always provided (required field in Prisma)
    const finalSpecialization = specialization ?? "";
    const finalOpenings =
      Number.isFinite(Number(openings)) && Number(openings) > 0
        ? Math.floor(Number(openings))
        : 1;

    const createdForm = await prisma.recruiterForm.create({
      data: {
        recruiterId: recruiter.id,
        domainId,
        title: formTitle,
        description: formDescription,
        fields: finalFields,
        expiresAt,
        roleType: finalRoleType,
        experience: finalExperience,
        workMode: workMode || "REMOTE",
        location,
        specialization: finalSpecialization,
        techStack: normalizeTechStack(techStack),
        openings: finalOpenings,
        salaryMin,
        salaryMax,
        currency,
        contractDurationMonths,
        status: "PUBLISHED",
        publishedAt: new Date(),
        version: 1,
      },
      select: {
        id: true,
        publicId: true,
      },
    });

    await prisma.recruiter.update({
        where: { id: recruiter.id },
        data: {
          totalFormsCount: monthlyFormsCount + 1,
          activeFormCount: activeFormsCount + 1,
        },
    });

    await cacheDel(cacheKeys.recruiterJobs(recruiter.id), cacheKeys.jobs);

    return NextResponse.json({ ok: true, form: createdForm }, { status: 201 });
  } catch (err) {
    console.error("Create job error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

function normalizeTechStack(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .flatMap((item) => String(item).split(","))
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function startOfMonth() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
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
