import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  getClientFingerprint,
  publicFormRateLimits,
  rateLimit,
  rateLimitResponse,
} from "@/lib/rateLimit";


export async function GET(
  req: NextRequest,
  context: { params: Promise<{ publicId: string }> }
) {
  try {
    const { publicId } = await context.params;
    const fingerprint = getClientFingerprint(req);
    const fetchLimit = await rateLimit({
      key: `crewcast:rl:public-form:fetch:${publicId}:${fingerprint.hash}`,
      ...publicFormRateLimits.fetch,
    });

    if (!fetchLimit.allowed) {
      return rateLimitResponse(fetchLimit);
    }

    if (!publicId) {
      return NextResponse.json(
        { message: "Missing publicId" },
        { status: 400 }
      );
    }




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
        status: true,
        domainId: true,
        expiresAt:true,
      },
    });

    if (!form) {
      return NextResponse.json(
        { message: "Form not found" },
        { status: 404 }
      );
    }

    if (form.status !== "PUBLISHED" || form.expiresAt < new Date()) {
      return NextResponse.json(
        { message: "This form is not accepting applications right now" },
        { status: 404 }
      );
    }


    const recruiter = await prisma.recruiter.findUnique({
      where: { id: form.recruiterId },
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


    const domain = await prisma.domains.findUnique({
      where: { id: form.domainId },
      select: { title: true },
    });


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
