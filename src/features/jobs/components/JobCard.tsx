import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Job } from "../types/job";

export default function JobCard({ job }: { job: Job }) {
  const salary = formatSalary(job);
  const expires = daysUntil(job.expiresAt);
  const visibleTech = job.techStack.slice(0, 5);
  const extraTechCount = Math.max(job.techStack.length - visibleTech.length, 0);

  return (
    <article className="flex h-full flex-col rounded-lg border bg-card p-5 shadow-xs transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-medium text-muted-foreground">
              {job.companyName || "Company"}
              {job.companyVerified && (
                <span className="ml-2 text-emerald-600">Verified</span>
              )}
            </p>
            <h2 className="mt-1 line-clamp-2 font-display text-xl font-semibold tracking-tight">
              {job.title}
            </h2>
          </div>
          <Badge variant="secondary">{formatWorkMode(job.workMode)}</Badge>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          {job.domainTitle && <Badge variant="outline">{job.domainTitle}</Badge>}
          {job.specialization && (
            <Badge variant="outline">{job.specialization}</Badge>
          )}
          <Badge variant="outline">{formatExperience(job.experience)}</Badge>
          <Badge variant="outline">{formatRoleType(job.roleType)}</Badge>
        </div>

        <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
          {job.description}
        </p>

        {job.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {visibleTech.map((tech) => (
              <span
                key={tech}
                className="rounded-md border bg-muted/60 px-2.5 py-1 text-xs font-medium"
              >
                {tech}
              </span>
            ))}
            {extraTechCount > 0 && (
              <span className="rounded-md border bg-muted/60 px-2.5 py-1 text-xs font-medium">
                +{extraTechCount} more
              </span>
            )}
          </div>
        )}
      </div>

      <div className="mt-auto space-y-4 pt-5">
        <div className="grid grid-cols-2 gap-3 border-t pt-4 text-sm">
          <Meta label="Location" value={job.location || "Not specified"} />
          <Meta label="Salary" value={salary} />
          <Meta label="Applicants" value={String(job.applicationsCount)} />
          <Meta label="Deadline" value={expires} />
        </div>

        <Button asChild className="w-full">
          <Link href={`/form/${job.publicId}`}>Apply now</Link>
        </Button>
      </div>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-0.5 truncate font-medium">{value}</p>
    </div>
  );
}

function formatSalary(job: Job) {
  if (!job.salaryMin && !job.salaryMax) return "Not disclosed";
  const currency = job.currency || "INR";

  if (job.salaryMin && job.salaryMax) {
    return `${currency} ${formatCompact(job.salaryMin)} - ${formatCompact(job.salaryMax)}`;
  }

  if (job.salaryMin) return `From ${currency} ${formatCompact(job.salaryMin)}`;
  return `Up to ${currency} ${formatCompact(job.salaryMax ?? 0)}`;
}

function formatCompact(value: number) {
  if (value >= 10000000) return `${trimNumber(value / 10000000)}Cr`;
  if (value >= 100000) return `${trimNumber(value / 100000)}L`;
  if (value >= 1000) return `${trimNumber(value / 1000)}K`;
  return String(value);
}

function trimNumber(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function daysUntil(date: string) {
  const diff = Math.ceil((new Date(date).getTime() - Date.now()) / 86400000);
  if (diff <= 0) return "Today";
  if (diff === 1) return "1 day";
  return `${diff} days`;
}

function formatWorkMode(mode: Job["workMode"]) {
  if (mode === "ONSITE") return "On-site";
  return mode.charAt(0) + mode.slice(1).toLowerCase();
}

function formatRoleType(type: Job["roleType"]) {
  return type
    .split("_")
    .map((part) => part.charAt(0) + part.slice(1).toLowerCase())
    .join(" ");
}

function formatExperience(exp: Job["experience"]) {
  if (exp === "JUNIOR") return "Junior";
  if (exp === "MID") return "Mid";
  if (exp === "SENIOR") return "Senior";
  return "Lead";
}
