import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AppShell from "@/components/app/AppShell";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROLES } from "@/lib/constants/roles";
import { withRequiredGitHubField } from "@/lib/formFields";
import { prisma } from "@/lib/prisma";
import DomainCreateForm from "./DomainCreateForm";
import DomainDeleteDialog from "./DomainDeleteDialog";
import DomainEditDialog from "./DomainEditDialog";

const DEFAULT_SOFTWARE_FIELDS = withRequiredGitHubField([
  {
    id: "full_name",
    label: "Full name",
    type: "text",
    required: true,
    placeholder: "Jane Developer",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "jane@example.com",
  },
  {
    id: "years_experience",
    label: "Years of experience",
    type: "number",
    required: true,
    placeholder: "3",
  },
  {
    id: "portfolio",
    label: "Portfolio or resume",
    type: "url",
    required: false,
    placeholder: "https://...",
  },
]);

export default async function AdminDomainsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) redirect("/login");
  if (session.user.role !== ROLES.ADMIN) redirect("/dashboard");

  const domains = await prisma.domains.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      isActive: true,
      haveDefaultForm: true,
      jobCount: true,
      createdAt: true,
      defaultFormSchemas: {
        select: {
          fields: true,
          updatedAt: true,
        },
        orderBy: { updatedAt: "desc" },
        take: 1,
      },
      _count: {
        select: {
          defaultFormSchemas: true,
          recruiterForms: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const domainCount = domains.length;
  const activeDomainCount = domains.filter((domain) => domain.isActive).length;
  const inactiveDomainCount = domainCount - activeDomainCount;
  const domainsWithDefaults = domains.filter(
    (domain) => domain.haveDefaultForm || domain._count.defaultFormSchemas > 0
  ).length;

  return (
    <AppShell>
      <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Admin setup
            </p>
            <h1 className="text-3xl font-bold tracking-tight">
              Domain Management
            </h1>
            <p className="mt-1 max-w-3xl text-muted-foreground">
              Create domains, control recruiter visibility, and manage default
              candidate forms separately from analytics.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-[430px_1fr]">
            <Card className="border-muted-foreground/15">
              <CardHeader>
                <CardTitle>Create Domain</CardTitle>
                <CardDescription>
                  Add or update a hiring domain. Software defaults always include
                  a locked GitHub profile field.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DomainCreateForm defaultFields={DEFAULT_SOFTWARE_FIELDS} />
              </CardContent>
            </Card>

            <Card className="border-muted-foreground/15">
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <CardTitle>Total Domains</CardTitle>
                    <CardDescription>
                      Recruiters only see active domains; defaults drive the form
                      builder.
                    </CardDescription>
                  </div>
                  <div className="rounded-md border bg-muted/40 px-4 py-3 text-right">
                    <p className="text-3xl font-bold">{domainCount}</p>
                    <p className="text-xs text-muted-foreground">domains</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-3">
                  <DomainStat label="Active" value={activeDomainCount} />
                  <DomainStat label="Hidden" value={inactiveDomainCount} />
                  <DomainStat label="Defaults ready" value={domainsWithDefaults} />
                </div>

                <div className="overflow-hidden rounded-lg border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-3 text-left">Domain</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Default</th>
                        <th className="px-4 py-3 text-left">Forms</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {domains.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-4 py-8 text-center text-muted-foreground"
                          >
                            No domains yet.
                          </td>
                        </tr>
                      ) : (
                        domains.map((domain) => (
                          <tr key={domain.id} className="border-t">
                            <td className="px-4 py-3">
                              <div className="font-medium">{domain.title}</div>
                              <div className="max-w-xl text-muted-foreground">
                                {domain.description}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <Badge
                                variant={
                                  domain.isActive ? "default" : "secondary"
                                }
                              >
                                {domain.isActive ? "Active" : "Hidden"}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              {domain.haveDefaultForm ||
                              domain._count.defaultFormSchemas > 0
                                ? "Ready"
                                : "Missing"}
                            </td>
                            <td className="px-4 py-3">
                              {domain._count.recruiterForms}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <div className="inline-flex items-center gap-2">
                                <DomainEditDialog
                                  domain={{
                                    id: domain.id,
                                    title: domain.title,
                                    description: domain.description,
                                    isActive: domain.isActive,
                                    haveDefaultForm: domain.haveDefaultForm,
                                    defaultFieldsJson: domain.defaultFormSchemas?.[0]
                                      ? JSON.stringify(
                                          domain.defaultFormSchemas[0].fields,
                                          null,
                                          2
                                        )
                                      : null,
                                  }}
                                  fallbackDefaultFields={DEFAULT_SOFTWARE_FIELDS}
                                />
                                <DomainDeleteDialog
                                  domain={{
                                    id: domain.id,
                                    title: domain.title,
                                    recruiterFormCount: domain._count.recruiterForms,
                                  }}
                                />
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </AppShell>
  );
}

function DomainStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border bg-background px-4 py-3">
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
