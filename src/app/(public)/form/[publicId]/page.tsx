import { prisma } from "@/lib/prisma";
import { cacheGet, cacheSet } from "@/lib/redis";
import { cacheKeys, cacheTtl } from "@/lib/cacheKeys";
import { PublicFormShell } from "@/features/public-form/components/PublicFormShell";
import { trackFormView } from "@/lib/trackFormView";

export default async function Page({
  params,
}: {
  params: Promise<{ publicId: string }>;
}) {
  const { publicId } = await params;

  const cacheKey = cacheKeys.job(publicId);


  const cached = await cacheGet<string>(cacheKey);

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
      openings: true,

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
    where: { id: form.recruiterId },
    select: {
      companyName: form.showCompanyName,
      website: form.showCompanyName,
      linkedinLink: form.showCompanyName,
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
 
  let ttl: number = cacheTtl.publicJob;
  if (form.expiresAt) {
    const diff = Math.floor(
      (new Date(form.expiresAt).getTime() - Date.now()) / 1000
    );
    if (diff > 0) ttl = Math.min(diff, cacheTtl.publicJob);
  }

  await cacheSet(cacheKey, JSON.stringify(safeForm), ttl);

  return <PublicFormShell form={safeForm} />;
}
