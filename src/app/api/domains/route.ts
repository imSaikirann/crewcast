import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

import { authOptions } from "./../auth/[...nextauth]/route";
import { requireRole } from "@/lib/auth";
import { ROLES } from "@/lib/constants/roles";



export async function GET() {
  try {
    const session = await requireRole(ROLES.USER);

    const domains = await prisma.domains.findMany();

    return NextResponse.json(domains);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
