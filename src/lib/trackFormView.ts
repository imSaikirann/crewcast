import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function trackFormView(formId: string) {
  const h = headers();

  const ip =
    (await h).get("x-forwarded-for")?.split(",")[0] ||
    (await h).get("x-real-ip") ||
    "unknown";

  const userAgent = (await h).get("user-agent") || "unknown";

  const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);


  const existing = await prisma.formView.findFirst({
    where: {
      formId,
      ip,
      userAgent,
      createdAt: { gte: last24h },
    },
  });

  if (existing) return; 


  await prisma.$transaction([
    prisma.formView.create({
      data: { formId, ip, userAgent },
    }),
    prisma.recruiterForm.update({
      where: { id: formId },
      data: { viewCount: { increment: 1 } },
    }),
  ]);
}
