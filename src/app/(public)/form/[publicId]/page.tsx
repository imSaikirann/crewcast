import { prisma } from "@/lib/prisma";
import { getRedis } from "@/lib/redis";
import { cacheKeys } from "@/lib/cacheKeys";
import { PublicFormShell } from "@/features/public-form/components/PublicFormShell";
import { trackFormView } from "@/lib/trackFormView";

const redis = getRedis()
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
    const form = JSON.parse(cached);

    await trackFormView(form.id);   

    return <PublicFormShell form={form} />;
  } catch {
    // corrupt cache → ignore
  }
}



  const form = await prisma.recruiterForm.findUnique({
    where: { publicId },
    select: {
      id:true,
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
      showCompanyName:true,

      // Tech & salary
      techStack: true,
      salaryMin: true,
      salaryMax: true,
      currency: true,
      contractDurationMonths: true,


      recruiterId: true,
      domainId: true,
    },
  });

  if (!form) {
    return <div className="py-24 text-center">Form not found</div>;
  }


  const recruiter = await prisma.recruiter.findUnique({
    where: { userId: form.recruiterId },
    select: {
      companyName: !form.showCompanyName ? true: false,
      website: !form.showCompanyName ? true: false,
      linkedinLink: !form.showCompanyName ? true: false,
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
  
  await trackFormView(form.id);
 
  let ttl = 3600;
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
