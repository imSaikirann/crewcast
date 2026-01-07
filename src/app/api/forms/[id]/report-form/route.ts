import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

    // IF FORMS gets 10 reports then automtically it should be flagged
    // ELSE  CrewCast admin should veridy based on report infromation

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params.id ? params : { id: null };
    const { reason, message } = await req.json();

 

    if (!id) {
      return NextResponse.json({ message: "Missing id" }, { status: 400 });
    }

    if (!reason || !message) {
      return NextResponse.json(
        { message: "Missing reason or message" },
        { status: 400 }
      );
    }

    // verify form exists
    const form = await prisma.recruiterForm.findUnique({
      where: { publicId: id },
      select: { id: true },
    });

    if (!form) {
      return NextResponse.json({ message: "Form not found" }, { status: 404 });
    }

    // get request fingerprint
    const h = headers();
    const ip =
      (await h).get("x-forwarded-for")?.split(",")[0] ||
      (await h).get("x-real-ip") ||
      "unknown";

    const userAgent = (await h).get("user-agent") || "unknown";

    // rate limit (same device once per 24h)
    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const existing = await prisma.jobReport.findFirst({
      where: {
        formId: id,
        ip,
        userAgent,
        createdAt: { gte: last24h },
      },
    });

    if (existing) {
      return NextResponse.json(
        { message: "You already reported this form" },
        { status: 429 }
      );
    }

    await prisma.jobReport.create({
      data: {
        formId: id,
        reason,
        message,
        ip,
        userAgent,
      },
    });

    return NextResponse.json({ message: "Form reported successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
