import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(
  req: NextRequest,
  context: { params: Promise<{ publicId: string }> }
) {
  try {
    const { publicId } = await context.params;

    if (!publicId) {
      return NextResponse.json(
        { message: "Missing publicId" },
        { status: 400 }
      );
    }



    // 1️⃣ Load form without relations first
    const form = await prisma.recruiterForm.findUnique({
      where: { publicId },
      select: {
        title: true,
        description: true,
        fields: true,
        createdAt: true,
        recruiterId: true,
        roleType:true,
        workMode:true,
        experience:true,
        domainId: true,
        expiresAt:true,
      },
    });

    console.log(form)

    if (!form) {
      return NextResponse.json(
        { message: "Form not found" },
        { status: 404 }
      );
    }

    // 2️⃣ Load recruiter safely
    const recruiter = await prisma.recruiter.findUnique({
      where: { userId: form.recruiterId },
      select: {
        companyName: true,
        website: true,
        linkedinLink: true,
        verified: true,
      },
    });

    if (!recruiter) {
      return NextResponse.json(
        {
          message: "This job form is corrupted (recruiter missing)",
        },
        { status: 500 }
      );
    }

    // 3️⃣ Load domain safely
    const domain = await prisma.domains.findUnique({
      where: { id: form.domainId },
      select: { title: true },
    });

    // 4️⃣ Return merged safe response
    return NextResponse.json({
      title: form.title,
      description: form.description,
      fields: form.fields,
      createdAt: form.createdAt,
      recruiter,
      domains: domain,
      expiresAt : form.expiresAt,
      experience : form.experience,
      roleType: form.roleType,
      workMode:form.workMode
    });
  } catch (err) {
    console.error("Public form fetch error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
