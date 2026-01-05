function expiryText(expiresAt: string) {
  const diff = Math.ceil(
    (new Date(expiresAt).getTime() - Date.now()) / 86400000
  );

  if (diff <= 0) return "Expired";
  if (diff === 1) return "Expires today";
  return `Expires in ${diff} days`;
}

export function PublicFormMeta({ form }: any) {
  return (
    <div className="space-y-10">

      {/* ───────── Hero Block ───────── */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          {form.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          {form.expiresAt && (
            <span>{expiryText(form.expiresAt)}</span>
          )}

          {form.location && (
            <span>• {form.location}</span>
          )}

          {form.workMode && (
            <span>• {formatWorkMode(form.workMode)}</span>
          )}
        </div>
      </div>

      {/* ───────── Job Highlights ───────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {form.salary && <MetaItem label="Pay" value={form.salary} />}
        {form.roleType && <MetaItem label="Role type" value={formatRoleType(form.roleType)} />}
        {form.experience && <MetaItem label="Experience" value={formatExperience(form.experience)} />}
        {form.location && <MetaItem label="Location" value={form.location} />}
        {form.workMode && <MetaItem label="Work mode" value={formatWorkMode(form.workMode)} />}
      </div>

      {/* ───────── Description ───────── */}
      {form.description && (
        <div className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Job description
          </h2>

          <p className="text-base leading-relaxed text-foreground/90 max-w-prose">
            {form.description}
          </p>
        </div>
      )}
    </div>
  );
}

/* ---------- Meta Item ---------- */

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-background p-4 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="text-base font-medium mt-1">
        {value}
      </p>
    </div>
  );
}

/* ---------- Formatters ---------- */

function formatWorkMode(mode: string) {
  if (mode === "REMOTE") return "Remote";
  if (mode === "ONSITE") return "On-site";
  if (mode === "HYBRID") return "Hybrid";
  return mode;
}

function formatRoleType(type: string) {
  if (type === "FULL_TIME") return "Full-time";
  if (type === "PART_TIME") return "Part-time";
  if (type === "CONTRACT") return "Contract";
  if (type === "INTERN") return "Internship";
  return type;
}

function formatExperience(exp: string) {
  if (exp === "JUNIOR") return "Junior (0–2 yrs)";
  if (exp === "MID") return "Mid (2–5 yrs)";
  if (exp === "SENIOR") return "Senior (5+ yrs)";
  return exp;
}
