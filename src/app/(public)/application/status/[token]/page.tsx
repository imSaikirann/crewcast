import Link from "next/link";

import { CrewcastWordmark } from "@/components/brand/CrewcastLogo";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { formatDateTime } from "@/utils/date";

export default async function ApplicationStatusPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const application = await prisma.application.findUnique({
    where: { trackingToken: token },
    select: {
      fullName: true,
      email: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      jobId: true,
      job: {
        select: {
          title: true,
          publicId: true,
          openings: true,
          recruiter: {
            select: {
              companyName: true,
            },
          },
        },
      },
    },
  });

  if (!application) {
    return (
      <main className="min-h-screen bg-background px-4 py-16 text-foreground">
        <section className="mx-auto max-w-xl rounded-lg border border-border/60 p-8 text-center">
          <CrewcastWordmark className="mb-6 justify-center" markClassName="size-8 rounded-md" />
          <h1 className="text-xl font-semibold">Status link not found</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            This tracking link may be incorrect or no longer available. Check the
            link from your application confirmation page.
          </p>
          <Link className="mt-6 inline-flex text-sm font-medium text-primary" href="/jobs">
            Browse open roles
          </Link>
        </section>
      </main>
    );
  }

  const openings = application.job.openings ?? 1;
  const hiredCount = await prisma.application.count({
    where: {
      jobId: application.jobId,
      status: "HIRED",
    },
  });
  const roleFilled = hiredCount >= openings;
  const copy = getStatusCopy(application.status, roleFilled);

  return (
    <main className="min-h-screen bg-background px-4 py-12 text-foreground">
      <section className="mx-auto max-w-3xl space-y-5">
        <header className="flex items-center justify-between">
          <CrewcastWordmark markClassName="size-8 rounded-md" />
        </header>

        <div className="rounded-lg border border-border/60 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {application.job.recruiter?.companyName || "Hiring team"}
              </p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight">
                {application.job.title}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Application for {application.fullName}
              </p>
            </div>
            <StatusBadge status={application.status} />
          </div>

          <div className="mt-6 grid grid-cols-1 divide-y divide-border/60 overflow-hidden rounded-lg border border-border/60 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <Metric label="Applied" value={formatDateTime(application.createdAt.toISOString())} />
            <Metric label="Last update" value={formatDateTime(application.updatedAt.toISOString())} />
            <Metric label="Hiring progress" value={`${Math.min(hiredCount, openings)}/${openings} hired`} />
          </div>
        </div>

        <div className={`rounded-lg border p-6 ${copy.className}`}>
          <p className="text-xs font-semibold uppercase tracking-wide opacity-80">
            Current status
          </p>
          <h2 className="mt-2 text-2xl font-semibold">{copy.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 opacity-90">
            {copy.description}
          </p>
        </div>

        <div className="rounded-lg border border-border/60 p-6">
          <p className="text-sm font-semibold">What happens next?</p>
          <div className="mt-4 grid gap-3">
            {STATUS_STEPS.map((step) => (
              <div
                key={step.status}
                className={[
                  "flex items-start gap-3 rounded-lg border border-border/60 p-3",
                  step.status === application.status
                    ? "border-primary/40 bg-primary/10"
                    : "",
                ].join(" ")}
              >
                <span className="mt-1 size-2 rounded-full bg-primary" />
                <div>
                  <p className="text-sm font-medium">{step.label}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-3 py-2.5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const className =
    status === "HIRED"
      ? "border-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      : status === "REJECTED"
        ? "border-0 bg-rose-500/10 text-rose-600 dark:text-rose-400"
        : status === "INTERVIEW"
          ? "border-0 bg-primary/10 text-primary"
          : "";

  return (
    <Badge className={`font-normal capitalize ${className}`} variant={className ? "default" : "secondary"}>
      {status.toLowerCase()}
    </Badge>
  );
}

function getStatusCopy(status: string, roleFilled: boolean) {
  if (status === "HIRED") {
    return {
      title: "Congratulations, you were selected.",
      description:
        "The hiring team marked your application as hired for this role. They should contact you with next steps.",
      className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
    };
  }

  if (status === "INTERVIEW") {
    return {
      title: "You moved to the interview stage.",
      description:
        "Good news. The hiring team wants to continue the process. Watch your email for scheduling details.",
      className: "border-primary/30 bg-primary/10 text-primary",
    };
  }

  if (status === "SHORTLISTED") {
    return {
      title: "Your application is shortlisted.",
      description:
        "Your profile looks relevant for this role. The hiring team is reviewing shortlisted candidates before the next step.",
      className: "border-primary/30 bg-primary/10 text-primary",
    };
  }

  if (status === "REJECTED" && roleFilled) {
    return {
      title: "This role is now fully staffed.",
      description:
        "The hiring team filled all available openings, so remaining applications have been closed. Thanks for applying and sharing your work.",
      className: "border-amber-500/30 bg-amber-500/10 text-amber-200",
    };
  }

  if (status === "REJECTED") {
    return {
      title: "You were not selected for this opening.",
      description:
        "Your application was reviewed, but the hiring team decided to move forward with other candidates for this role.",
      className: "border-rose-500/30 bg-rose-500/10 text-rose-200",
    };
  }

  return {
    title: "Your application is under review.",
    description:
      "Your application was received. The hiring team can review your answers and GitHub evidence. No action is needed right now.",
    className: "border-border bg-card text-foreground",
  };
}

const STATUS_STEPS = [
  {
    status: "APPLIED",
    label: "Applied",
    description: "Your application has been received by the hiring team.",
  },
  {
    status: "SHORTLISTED",
    label: "Shortlisted",
    description: "The hiring team marked your profile as relevant for review.",
  },
  {
    status: "INTERVIEW",
    label: "Interview",
    description: "The hiring team wants to continue the conversation.",
  },
  {
    status: "HIRED",
    label: "Hired",
    description: "You were selected for one of the available openings.",
  },
  {
    status: "REJECTED",
    label: "Closed",
    description: "The application is no longer active for this role.",
  },
];

