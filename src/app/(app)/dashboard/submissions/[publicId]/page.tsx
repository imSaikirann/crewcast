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
      openings: true,
      techStack: true,
      workMode: true,
      experience: true,
      roleType: true,
      location: true,
      fields: true,
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
      _count: {
        select: {
          applications: {
            where: { status: "HIRED" },
          },
        },
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
      backButton={{ fallbackHref: "/dashboard/submissions", label: "Back to submissions" }}
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Submissions", href: "/dashboard/submissions" },
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
          openings: form.openings ?? 1,
          hiredCount: form._count.applications,
          techStack: form.techStack,
          workMode: form.workMode,
          experience: form.experience,
          roleType: form.roleType,
          location: form.location,
          fields: normalizeFields(form.fields),
        }}
      />
    </AppPage>
  );
}

function normalizeFields(fields: unknown): {
  id: string;
  label: string;
  type?: string;
}[] {
  if (!Array.isArray(fields)) return [];

  return fields
    .map((field) => {
      if (!field || typeof field !== "object") return null;
      const item = field as Record<string, unknown>;
      if (typeof item.id !== "string") return null;

      const normalized: {
        id: string;
        label: string;
        type?: string;
      } = {
        id: item.id,
        label: typeof item.label === "string" ? item.label : item.id,
      };

      if (typeof item.type === "string") normalized.type = item.type;
      return normalized;
    })
    .filter(
      (field): field is { id: string; label: string; type?: string } =>
        field !== null
    );
}
