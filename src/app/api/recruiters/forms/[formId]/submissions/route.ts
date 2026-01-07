import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { cacheKeys } from "@/lib/cacheKeys";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ formId: string }> }
) {
  try {

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { formId: publicId } = await context.params;


    const cacheKey = cacheKeys.jobApplications(publicId);

 
    const cached = await redis.get(cacheKey);
    if (cached) {
      return NextResponse.json(JSON.parse(cached));
    }

   
    const form = await prisma.recruiterForm.findUnique({
      where: { publicId },
      select: {
        id: true,
        recruiterId: true,
      },
    });

    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }


    if (form.recruiterId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

  
    const submissions = await prisma.application.findMany({
      where: {
        jobId: form.id, 
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        createdAt: true,
        responses: true,
        status:true,
        scores: {
          select: {
            totalScore: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });


    await redis.setex(cacheKey, 30, JSON.stringify(submissions)); 

    return NextResponse.json(submissions);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
