import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AppPage from "@/components/app/AppPage";
import ApplicationsView from "@/features/submissions/components/ApplicationsView";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ publicId: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const { publicId } = await params;

  const recruiter = await prisma.recruiter.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  });

  if (!recruiter) {
    redirect("/dashboard/recruiter/profile");
  }

  const form = await prisma.recruiterForm.findFirst({
    where: { publicId, recruiterId: recruiter.id },
    select: {
      id: true,
      title: true,
      description: true,
      publicId: true,
      viewCount: true,
      status: true,
      expiresAt: true,
      techStack: true,
      workMode: true,
      experience: true,
      roleType: true,
      location: true,
      applications: {
        select: {
          id: true,
          fullName: true,
          email: true,
          createdAt: true,
          responses: true,
          status: true,
          scores: {
            select: {
              totalScore: true,
              breakdown: true,
              evaluatedAt: true,
            },
            orderBy: { evaluatedAt: "desc" },
            take: 1,
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!form) {
    redirect("/dashboard");
  }

  const data = form.applications.map((application) => ({
    ...application,
    createdAt: application.createdAt.toISOString(),
    responses: application.responses as Record<string, unknown>,
  }));

  return (
    <AppPage
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: form.title },
      ]}
    >
      <ApplicationsView
        data={data}
        form={{
          title: form.title,
          description: form.description,
          publicId: form.publicId,
          viewCount: form.viewCount,
          status: form.status,
          expiresAt: form.expiresAt.toISOString(),
          techStack: form.techStack,
          workMode: form.workMode,
          experience: form.experience,
          roleType: form.roleType,
          location: form.location,
        }}
      />
    </AppPage>
  );
}
