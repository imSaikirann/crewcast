"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AppSelect } from "@/components/ui/app-select";
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
  const activeFilters = hasFilters(filters);

  return (
    <section className="space-y-6">
      <div className="rounded-lg border bg-card/80 p-3 shadow-xs">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-end">
          <div className="min-w-0 flex-1">
            <span className="mb-1 block text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Search
            </span>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={filters.query}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  query: event.target.value,
                }))
              }
              placeholder="Search title, company, location, or tech"
              className="h-10 rounded-md bg-background pl-9"
            />
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 xl:w-[720px]">
            <FilterSelect
              label="Mode"
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
              label="Level"
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

        <div className="mt-3 flex flex-col gap-2 border-t pt-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span className="inline-flex items-center gap-2">
            <SlidersHorizontal className="size-4" />
            Showing {filteredJobs.length} of {jobs.length} open roles
          </span>
          {activeFilters && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() =>
                setFilters({
                  query: "",
                  workMode: "ALL",
                  experience: "ALL",
                  roleType: "ALL",
                  tech: "ALL",
                })
              }
              className="w-fit text-foreground"
            >
              <X className="size-4" />
              Clear filters
            </Button>
          )}
        </div>
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
    <AppSelect
      label={label}
      value={value}
      onValueChange={onChange}
      options={options.map(([optionValue, optionLabel]) => ({
        value: optionValue,
        label: optionLabel,
      }))}
      showLabel
      size="lg"
    />
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

