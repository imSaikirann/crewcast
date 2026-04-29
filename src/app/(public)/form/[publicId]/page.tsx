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
      id: true,
      publicId: true,
      title: true,
      description: true,
      fields: true,
      createdAt: true,
      expiresAt: true,
      openings: true,

      roleType: true,
      workMode: true,
      experience: true,
      location: true,
      specialization: true,
      showCompanyName: true,

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
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="text-center">
          <p className="text-sm font-medium text-muted-foreground">404</p>
          <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight">
            Form not found
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This link may have expired or been removed.
          </p>
        </div>
      </div>
    );
  }

  // Always fetch website + linkedin; only companyName is gated by showCompanyName
  const recruiter = await prisma.recruiter.findUnique({
    where: { id: form.recruiterId },
    select: {
      companyName: true,
      website: true,
      linkedinLink: true,
      verified: true,
    },
  });

  if (!recruiter) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="text-center">
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            This job is misconfigured
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Recruiter information is missing.
          </p>
        </div>
      </div>
    );
  }

  const safeRecruiter = {
    ...recruiter,
    companyName: form.showCompanyName ? recruiter.companyName : null,
  };

  const domain = await prisma.domains.findUnique({
    where: { id: form.domainId },
    select: { title: true },
  });

  const safeForm = {
    ...form,
    recruiter: safeRecruiter,
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