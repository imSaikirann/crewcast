import DashboardScreen from "@/features/dashboard/screens/DashboardScreen";
import AppPage from "@/components/app/AppPage";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ROLES } from "@/lib/constants/roles";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (session.user.role === ROLES.ADMIN) {
    redirect("/admin");
  }

  const recruiter = await prisma.recruiter.findUnique({
    where: { userId: session.user.id },
    select: {
      id: true,
      companyName: true,
      companyEmail: true,
      verified: true,
    },
  });

  if (!recruiter) {
    redirect("/dashboard/recruiter/profile");
  }

  const forms = await prisma.recruiterForm.findMany({
    where: { recruiterId: recruiter.id },
    select: {
      id: true,
      publicId: true,
      title: true,
      description: true,
      fields: true,
      status: true,
      createdAt: true,
      expiresAt: true,
      viewCount: true,
      domain: {
        select: { title: true },
      },
      _count: {
        select: { applications: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const dashboardForms = forms.map((form) => ({
    id: form.id,
    publicId: form.publicId,
    title: form.title,
    description: form.description,
    fieldsCount: Array.isArray(form.fields) ? form.fields.length : 0,
    isActive: form.status === "PUBLISHED" && form.expiresAt > new Date(),
    status: form.status,
    createdAt: form.createdAt.toISOString(),
    expiresAt: form.expiresAt.toISOString(),
    submissions: form._count.applications,
    newSubmissions: form._count.applications,
    views: form.viewCount,
    domainTitle: form.domain?.title,
  }));

  return (
    <AppPage breadcrumbs={[{ label: "Dashboard" }]}>
      <DashboardScreen forms={dashboardForms} recruiter={recruiter} />
    </AppPage>
  );
}
