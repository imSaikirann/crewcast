import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getRedis } from "@/lib/redis";
import { cacheKeys } from "@/lib/cacheKeys";


const redis = getRedis()
// ADD DATA VALIDATION
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;   

    const data = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing form id" }, { status: 400 });
    }

    // find form
    const form = await prisma.recruiterForm.findUnique({
      where: { publicId: id },
      select: { id: true, isFlagged: true },
    });

    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    if (form.isFlagged) {
      return NextResponse.json(
        { error: "This job has been flagged" },
        { status: 403 }
      );
    }


    const fullName =
      data.full_name || data.name || data.fullName || null;
    const email = data.email || null;

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Missing name or email" },
        { status: 400 }
      );
    }

    // prevent duplicate apply
    const existing = await prisma.application.findFirst({
      where: {
        jobId: form.id,
        email,
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "You already applied to this job" },
        { status: 409 }
      );
    }

    const app = await prisma.application.create({
      data: {
        jobId: form.id,
        fullName,
        email,
        responses: data
      },
    });

    await redis.del(cacheKeys.jobApplications(id));

    return NextResponse.json({ success: true, id: app.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
