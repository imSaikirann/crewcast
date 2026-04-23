import { NextResponse } from "next/server";

import { requireRole } from "@/lib/auth";
import { cachedJson } from "@/lib/cache";
import { cacheKeys, cacheTtl } from "@/lib/cacheKeys";
import { ROLES } from "@/lib/constants/roles";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  context: { params: Promise<{ domainId: string }> }
) {
  try {
    await requireRole(ROLES.USER);

    const { domainId } = await context.params;

    if (!domainId) {
      return NextResponse.json(
        { message: "domainId is required" },
        { status: 400 }
      );
    }

    const defaultForm = await cachedJson(
      { key: cacheKeys.domainDefault(domainId), ttl: cacheTtl.domainDefault },
      () =>
        prisma.defaultFormSchema.findUnique({
          where: { domainId },
          select: { fields: true },
        })
    );

    return NextResponse.json(defaultForm);
  } catch (err) {
    console.error("GET DEFAULT FORM ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
