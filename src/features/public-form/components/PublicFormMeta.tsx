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
    <section className="rounded-xl border bg-card p-5">
      <p className="text-[13px] text-muted-foreground">
        {form.recruiter?.companyName || "Confidential Employer"}
      </p>
      <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight">
        {form.title}
      </h1>

      <div className="mt-4 flex flex-wrap gap-2">
        {form.domain?.title && <Pill>{form.domain.title}</Pill>}
        {form.workMode && <Pill>{formatWorkMode(form.workMode)}</Pill>}
        {form.experience && <Pill>{formatExperience(form.experience)}</Pill>}
        {form.location && <Pill>{form.location}</Pill>}
        {form.openings && <Pill>{form.openings} opening{form.openings > 1 ? "s" : ""}</Pill>}
      </div>

      {salary && <p className="mt-4 text-sm text-muted-foreground">{salary}</p>}

      {form.description && (
        <p className="mt-5 line-clamp-4 text-sm leading-6 text-foreground/90">
          {form.description}
        </p>
      )}

      {form.expiresAt && (
        <p className="mt-4 text-xs text-muted-foreground">{expiryText(form.expiresAt)}</p>
      )}
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
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
