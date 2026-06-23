import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AppShell from "@/components/app/AppShell";
import { Badge } from "@/components/ui/badge";
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
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="border-b border-border/60 pb-5">
            <h1 className="text-xl font-semibold tracking-tight">Domain management</h1>
            <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
              Create domains, control recruiter visibility, and manage default
              candidate forms separately from analytics.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-[430px_1fr]">
            <section className="rounded-lg border border-border/60">
              <div className="border-b border-border/60 p-4">
                <h2 className="text-sm font-semibold">Create domain</h2>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Add or update a hiring domain. Software defaults always include
                  a locked GitHub profile field.
                </p>
              </div>
              <div className="p-4">
                <DomainCreateForm defaultFields={DEFAULT_SOFTWARE_FIELDS} />
              </div>
            </section>

            <section className="rounded-lg border border-border/60">
              <div className="flex flex-col gap-4 border-b border-border/60 p-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-sm font-semibold">Total domains</h2>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Recruiters only see active domains; defaults drive the form
                    builder.
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold tabular-nums">{domainCount}</p>
                  <p className="text-xs text-muted-foreground">domains</p>
                </div>
              </div>
              <div className="space-y-4 p-4">
                <div className="grid grid-cols-3 divide-x divide-border/60 overflow-hidden rounded-lg border border-border/60">
                  <DomainStat label="Active" value={activeDomainCount} />
                  <DomainStat label="Hidden" value={inactiveDomainCount} />
                  <DomainStat label="Defaults ready" value={domainsWithDefaults} />
                </div>

                <div className="overflow-hidden rounded-lg border border-border/60">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border/60 bg-muted/30 text-xs uppercase tracking-wide text-muted-foreground">
                      <tr>
                        <th className="px-4 py-2.5 text-left font-medium">Domain</th>
                        <th className="px-4 py-2.5 text-left font-medium">Status</th>
                        <th className="px-4 py-2.5 text-left font-medium">Default</th>
                        <th className="px-4 py-2.5 text-left font-medium">Forms</th>
                        <th className="px-4 py-2.5 text-right font-medium">Actions</th>
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
                          <tr key={domain.id} className="border-t border-border/50">
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
                                className="font-normal"
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
              </div>
            </section>
          </div>
        </div>
      </main>
    </AppShell>
  );
}

function DomainStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="px-4 py-3">
      <p className="text-2xl font-semibold tabular-nums">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

