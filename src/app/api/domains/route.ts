import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { requireRole } from "@/lib/auth";
import { cachedJson } from "@/lib/cache";
import { cacheKeys, cacheTtl } from "@/lib/cacheKeys";
import { ROLES } from "@/lib/constants/roles";



export async function GET() {
  try {
    await requireRole(ROLES.USER);

    const domains = await cachedJson(
      { key: cacheKeys.domains, ttl: cacheTtl.domains },
      () => prisma.domains.findMany()
    );

    return NextResponse.json(domains);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
