import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { cacheKeys } from "@/lib/cacheKeys";
import { PublicFormShell } from "@/features/public-form/components/PublicFormShell";

export default async function Page({
  params,
}: {
  params: Promise<{ publicId: string }>;
}) {
  const { publicId } = await params;

  const cacheKey = cacheKeys.job(publicId);

  // 1️⃣ Try Redis first (best-effort)
  let cached: string | null = null;
  try {
    cached = await redis.get(cacheKey);
  } catch (err) {
    console.error("Redis GET failed:", err);
  }

  if (cached) {
    try {
      return <PublicFormShell form={JSON.parse(cached)} />;
    } catch {
      // corrupt cache → ignore
    }
  }

  // 2️⃣ Load from DB
  const form = await prisma.recruiterForm.findUnique({
    where: { publicId },
    select: {
      publicId: true,
      title: true,
      description: true,
      fields: true,
      createdAt: true,
      expiresAt: true,

      // Hiring metadata
      roleType: true,
      workMode: true,
      experience: true,
      location: true,
      specialization: true,

      // Tech & salary
      techStack: true,
      salaryMin: true,
      salaryMax: true,
      currency: true,
      contractDurationMonths: true,

      // Relations
      recruiterId: true,
      domainId: true,
    },
  });

  if (!form) {
    return <div className="py-24 text-center">Form not found</div>;
  }

  // 3️⃣ Load recruiter
  const recruiter = await prisma.recruiter.findUnique({
    where: { userId: form.recruiterId },
    select: {
      companyName: true,
      website: true,
      linkedinLink: true,
      verified: true,
    },
  });

  if (!recruiter) {
    return (
      <div className="py-24 text-center">
        This job is misconfigured. Recruiter missing.
      </div>
    );
  }

  // 4️⃣ Load domain
  const domain = await prisma.domains.findUnique({
    where: { id: form.domainId },
    select: { title: true },
  });

  // 5️⃣ Merge safe public payload
  const safeForm = {
    ...form,
    recruiter,
    domain,
  };

  // 6️⃣ Compute TTL (until expiry or max 1h)
  let ttl = 3600;
  if (form.expiresAt) {
    const diff = Math.floor(
      (new Date(form.expiresAt).getTime() - Date.now()) / 1000
    );
    if (diff > 0) ttl = Math.min(diff, 3600);
  }

  // 7️⃣ Save to Redis (best-effort)
  try {
    await redis.set(cacheKey, JSON.stringify(safeForm), "EX", ttl);
  } catch (err) {
    console.error("Redis SET failed:", err);
  }

  // 8️⃣ Render
  return <PublicFormShell form={safeForm} />;
}
