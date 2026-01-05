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
      
    }
  }

 
  const form = await prisma.recruiterForm.findUnique({
    where: { publicId },
    select: {
      publicId: true,
      title: true,
      description: true,
      fields: true,
      createdAt: true,
      recruiterId: true,
      roleType: true,
      workMode: true,
      experience: true,
      domainId: true,
      expiresAt: true,
    },
  });

  if (!form) {
    return <div className="py-24 text-center">Form not found</div>;
  }

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

  const domain = await prisma.domains.findUnique({
    where: { id: form.domainId },
    select: { title: true }, 
  });

  const safeForm = {
    ...form,
    recruiter,
    domain,
  };

 
  let ttl = 3600; // 1 hour
  if (form.expiresAt) {
    const diff = Math.floor(
      (new Date(form.expiresAt).getTime() - Date.now()) / 1000
    );
    if (diff > 0) ttl = Math.min(diff, 3600);
  }


  try {
    await redis.set(cacheKey, JSON.stringify(safeForm), "EX", ttl);
  } catch (err) {
    console.error("Redis SET failed:", err);
  }

  return <PublicFormShell form={safeForm} />;
}
