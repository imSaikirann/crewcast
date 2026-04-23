function expiryText(expiresAt: string) {
  const date = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(expiresAt));

  return `Applications close ${date}`;
}

export function PublicFormMeta({ form }: any) {
  const salary =
    form.salaryMin && form.salaryMax
      ? `${form.currency ?? ""} ${formatNumber(form.salaryMin)} - ${formatNumber(form.salaryMax)} / month`
      : null;

  return (
    <section className="overflow-hidden rounded-lg border bg-card shadow-sm">
      <div className="border-b px-5 py-6 sm:px-8 sm:py-8">
        <p className="text-sm font-medium text-muted-foreground">
          {form.recruiter?.companyName || "Confidential Employer"}
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {form.title}
        </h1>

        <div className="mt-6 flex flex-wrap gap-2">
          {form.domain?.title && <Pill>{form.domain.title}</Pill>}
          {form.workMode && <Pill>{formatWorkMode(form.workMode)}</Pill>}
          {form.experience && <Pill>{formatExperience(form.experience)}</Pill>}
          {form.location && <Pill>{form.location}</Pill>}
          {form.openings && <Pill>{form.openings} opening{form.openings > 1 ? "s" : ""}</Pill>}
        </div>
      </div>

      <div className="space-y-5 px-5 py-5 sm:px-8">
        {salary && (
          <div className="rounded-md bg-secondary/50 px-4 py-3 text-sm font-medium">
            {salary}
          </div>
        )}

        {form.description && (
          <p className="whitespace-pre-line text-base leading-7 text-foreground/90">
            {form.description}
          </p>
        )}

        {form.expiresAt && (
          <p className="text-sm text-muted-foreground">{expiryText(form.expiresAt)}</p>
        )}
      </div>
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground">
      {children}
    </span>
  );
}

function formatWorkMode(mode: string) {
  if (mode === "REMOTE") return "Remote";
  if (mode === "ONSITE") return "On-site";
  if (mode === "HYBRID") return "Hybrid";
  return mode;
}

function formatExperience(exp: string) {
  if (exp === "JUNIOR") return "Junior";
  if (exp === "MID") return "Mid";
  if (exp === "SENIOR") return "Senior";
  return exp;
}

function formatNumber(n: number) {
  return n.toLocaleString();
}
