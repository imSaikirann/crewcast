import {
  Briefcase,
  MapPin,
  Users,
  Wallet,
  CalendarClock,
  BadgeCheck,
  Building2,
  ExternalLink,
  Linkedin,
} from "lucide-react";

export function PublicFormMeta({ form }: any) {
  const salary =
    form.salaryMin && form.salaryMax
      ? `${form.currency ?? ""} ${formatNumber(form.salaryMin)} – ${formatNumber(form.salaryMax)} / month`
      : null;

  const recruiter = form.recruiter || {};

  return (
    <section className="space-y-8">
      {/* Company row */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Building2 className="size-4" strokeWidth={1.75} />
        <span className="font-medium text-foreground">
          {recruiter.companyName || "Confidential employer"}
        </span>
        {recruiter.verified && (
          <BadgeCheck className="size-4 text-foreground" strokeWidth={2} />
        )}

        {(recruiter.website || recruiter.linkedinLink) && (
          <span className="ml-auto flex items-center gap-3">
            {recruiter.website && (
              <a
                href={recruiter.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs hover:text-foreground"
              >
                <ExternalLink className="size-3.5" />
                Website
              </a>
            )}
            {recruiter.linkedinLink && (
              <a
                href={recruiter.linkedinLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs hover:text-foreground"
              >
                <Linkedin className="size-3.5" />
                LinkedIn
              </a>
            )}
          </span>
        )}
      </div>

      {/* Title */}
      <header>
        <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
          {form.title}
        </h1>

        {/* Inline meta line */}
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {form.domain?.title && (
            <Meta icon={<Briefcase className="size-3.5" />}>
              {form.domain.title}
            </Meta>
          )}
          {form.workMode && (
            <Meta icon={<MapPin className="size-3.5" />}>
              {formatWorkMode(form.workMode)}
              {form.location ? ` · ${form.location}` : ""}
            </Meta>
          )}
          {form.experience && (
            <Meta icon={<BadgeCheck className="size-3.5" />}>
              {formatExperience(form.experience)}
            </Meta>
          )}
          {form.openings && (
            <Meta icon={<Users className="size-3.5" />}>
              {form.openings} opening{form.openings > 1 ? "s" : ""}
            </Meta>
          )}
        </div>
      </header>

      {/* Salary chip */}
      {salary && (
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3.5 py-1.5 text-sm font-medium">
          <Wallet className="size-3.5" strokeWidth={1.75} />
          {salary}
        </div>
      )}

      {/* Description */}
      {form.description && (
        <p className="whitespace-pre-line text-[15px] leading-7 text-foreground/85">
          {form.description}
        </p>
      )}

      {/* Tech stack */}
      {Array.isArray(form.techStack) && form.techStack.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {form.techStack.map((t: string) => (
            <span
              key={t}
              className="rounded-md border border-border bg-background px-2 py-0.5 text-xs text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Expiry */}
      {form.expiresAt && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarClock className="size-3.5" strokeWidth={1.75} />
          {expiryText(form.expiresAt)}
        </div>
      )}

      <hr className="border-border" />
    </section>
  );
}

function Meta({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {icon}
      {children}
    </span>
  );
}

function expiryText(expiresAt: string) {
  const date = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(expiresAt));
  return `Closes ${date}`;
}

function formatWorkMode(mode: string) {
  if (mode === "REMOTE") return "Remote";
  if (mode === "ONSITE") return "On-site";
  if (mode === "HYBRID") return "Hybrid";
  return mode;
}

function formatExperience(exp: string) {
  if (exp === "JUNIOR") return "Junior";
  if (exp === "MID") return "Mid-level";
  if (exp === "SENIOR") return "Senior";
  return exp;
}

function formatNumber(n: number) {
  return n.toLocaleString();
}