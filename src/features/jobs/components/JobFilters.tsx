"use client";

import { useMemo, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import JobCard from "./JobCard";
import type { Job } from "../types/job";

type Filters = {
  query: string;
  workMode: "ALL" | Job["workMode"];
  experience: "ALL" | Job["experience"];
  roleType: "ALL" | Job["roleType"];
  tech: "ALL" | string;
};

export default function JobsClient({ jobs }: { jobs: Job[] }) {
  const [filters, setFilters] = useState<Filters>({
    query: "",
    workMode: "ALL",
    experience: "ALL",
    roleType: "ALL",
    tech: "ALL",
  });

  const techOptions = useMemo(
    () =>
      Array.from(new Set(jobs.flatMap((job) => job.techStack)))
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b)),
    [jobs]
  );

  const filteredJobs = useMemo(() => {
    const q = filters.query.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesQuery =
        !q ||
        [
          job.title,
          job.description,
          job.companyName,
          job.domainTitle,
          job.location,
          job.specialization,
          ...job.techStack,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(q));

      if (!matchesQuery) return false;
      if (filters.workMode !== "ALL" && job.workMode !== filters.workMode) {
        return false;
      }
      if (
        filters.experience !== "ALL" &&
        job.experience !== filters.experience
      ) {
        return false;
      }
      if (filters.roleType !== "ALL" && job.roleType !== filters.roleType) {
        return false;
      }
      if (filters.tech !== "ALL" && !job.techStack.includes(filters.tech)) {
        return false;
      }

      return true;
    });
  }, [jobs, filters]);

  return (
    <section className="space-y-6">
      <div className="rounded-lg border bg-background p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px_180px_180px]">
          <Input
            value={filters.query}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                query: event.target.value,
              }))
            }
            placeholder="Search title, company, location, or tech"
            className="h-11"
          />

          <FilterSelect
            label="Work mode"
            value={filters.workMode}
            onChange={(value) =>
              setFilters((current) => ({
                ...current,
                workMode: value as Filters["workMode"],
              }))
            }
            options={[
              ["ALL", "All modes"],
              ["REMOTE", "Remote"],
              ["HYBRID", "Hybrid"],
              ["ONSITE", "On-site"],
            ]}
          />

          <FilterSelect
            label="Experience"
            value={filters.experience}
            onChange={(value) =>
              setFilters((current) => ({
                ...current,
                experience: value as Filters["experience"],
              }))
            }
            options={[
              ["ALL", "All levels"],
              ["JUNIOR", "Junior"],
              ["MID", "Mid"],
              ["SENIOR", "Senior"],
              ["LEAD", "Lead"],
            ]}
          />

          <FilterSelect
            label="Role"
            value={filters.roleType}
            onChange={(value) =>
              setFilters((current) => ({
                ...current,
                roleType: value as Filters["roleType"],
              }))
            }
            options={[
              ["ALL", "All roles"],
              ["FULL_TIME", "Full time"],
              ["PART_TIME", "Part time"],
              ["CONTRACT", "Contract"],
              ["INTERNSHIP", "Internship"],
            ]}
          />

          <FilterSelect
            label="Tech"
            value={filters.tech}
            onChange={(value) =>
              setFilters((current) => ({ ...current, tech: value }))
            }
            options={[
              ["ALL", "All tech"],
              ...techOptions.map((tech) => [tech, tech] as [string, string]),
            ]}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredJobs.length} of {jobs.length} open roles
        </p>
        {hasFilters(filters) && (
          <button
            type="button"
            onClick={() =>
              setFilters({
                query: "",
                workMode: "ALL",
                experience: "ALL",
                roleType: "ALL",
                tech: "ALL",
              })
            }
            className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {jobs.length === 0 ? (
        <Alert>
          <AlertTitle>No open jobs yet</AlertTitle>
          <AlertDescription>
            Recruiter forms that are active and not expired will appear here.
          </AlertDescription>
        </Alert>
      ) : filteredJobs.length === 0 ? (
        <Alert variant="warning">
          <AlertTitle>No jobs match these filters</AlertTitle>
          <AlertDescription>
            Try removing one filter or searching for a broader skill.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </section>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: [string, string][];
}) {
  return (
    <label className="space-y-1 text-xs font-medium text-muted-foreground">
      <span>{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-md border bg-background px-3 text-sm text-foreground outline-none transition focus:border-ring focus:ring-ring/50 focus:ring-[3px]"
      >
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  );
}

function hasFilters(filters: Filters) {
  return (
    filters.query !== "" ||
    filters.workMode !== "ALL" ||
    filters.experience !== "ALL" ||
    filters.roleType !== "ALL" ||
    filters.tech !== "ALL"
  );
}
