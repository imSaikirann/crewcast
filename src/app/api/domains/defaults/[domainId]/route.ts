import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { ROLES } from "@/lib/constants/roles";

export async function GET(
  _req: Request,
  context: { params: Promise<{ domainId: string }> }
) {
  try {
    // 🔐 Auth
    await requireRole(ROLES.USER);

    // 🔥 THIS IS THE FIX
    const { domainId } = await context.params;

    if (!domainId) {
      return NextResponse.json(
        { message: "domainId is required" },
        { status: 400 }
      );
    }

    const fields = await prisma.defaultFormSchema.findUnique({
      where: { domainId },
      select:{
        fields:true
      }
    });

    console.log(fields)


    return NextResponse.json(fields);
  } catch (err) {
    console.error("GET DEFAULT FORM ERROR:", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
