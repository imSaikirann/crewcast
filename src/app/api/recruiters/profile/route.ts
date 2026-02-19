import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { getRedis } from "@/lib/redis";
import { cacheKeys } from "@/lib/cacheKeys";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CreateRecruiterSchema } from "@/lib/validators/recruiter";

const redis = getRedis()
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


    return NextResponse.json(profile);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
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

    // If email changed, reset verification status
    const verified = existingProfile.companyEmail === companyEmail 
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

    return NextResponse.json(updatedProfile);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
