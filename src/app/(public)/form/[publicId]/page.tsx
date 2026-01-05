import { prisma } from "@/lib/prisma";
import { PublicFormShell } from "@/features/public-form/components/PublicFormShell";

export default async function Page({ params }: { params: { publicId: string } }) {
  const { publicId } = await params;


  // 1️⃣ Load the form
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

  // 2️⃣ Load recruiter
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

  // 3️⃣ Load domain (optional)
  const domain = await prisma.domains.findUnique({
    where: { id: form.domainId },
    select: { title: true },
  });

  // 4️⃣ Merge everything
  const safeForm = {
    ...form,
    recruiter,
    domain,
  };

  // 5️⃣ Render page (SSR)
  return <PublicFormShell form={safeForm} />;
}
