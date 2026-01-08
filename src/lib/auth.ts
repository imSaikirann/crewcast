
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ROLES } from "./constants/roles";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function requireRole(role: string) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== role) {
    return {
      ok: false as const,
      response: NextResponse.json({ message: "Forbidden" }, { status: 403 }),
    };
  }

  return { ok: true as const, session };
}
