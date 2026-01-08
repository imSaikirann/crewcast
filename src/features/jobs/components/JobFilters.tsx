"use client"

import { useMemo, useState } from "react"
import JobCard from "./JobCard"
import { Job } from "../types/job"

type Filters = {
  workMode: "ALL" | "REMOTE" | "HYBRID" | "ONSITE"
  experience: "ALL" | "JUNIOR" | "MID" | "SENIOR"
  tech: "ALL" | string
}

export default function JobsClient({ jobs }: { jobs: Job[] }) {
  const [filters, setFilters] = useState<Filters>({
    workMode: "ALL",
    experience: "ALL",
    tech: "ALL",
  })

  const techOptions = useMemo(
    () => Array.from(new Set(jobs.flatMap((j) => j.techStack))),
    [jobs]
  )

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (filters.workMode !== "ALL" && job.workMode !== filters.workMode) return false
      if (filters.experience !== "ALL" && job.experience !== filters.experience) return false
      if (filters.tech !== "ALL" && !job.techStack.includes(filters.tech)) return false
      return true
    })
  }, [jobs, filters])

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <select
          value={filters.workMode}
          onChange={(e) => setFilters({ ...filters, workMode: e.target.value as any })}
          className="px-4 py-2 rounded-lg border bg-white dark:bg-neutral-900"
        >
          <option value="ALL">All Modes</option>
          <option value="REMOTE">Remote</option>
          <option value="HYBRID">Hybrid</option>
          <option value="ONSITE">Onsite</option>
        </select>

        <select
          value={filters.experience}
          onChange={(e) => setFilters({ ...filters, experience: e.target.value as any })}
          className="px-4 py-2 rounded-lg border bg-white dark:bg-neutral-900"
        >
          <option value="ALL">All Levels</option>
          <option value="JUNIOR">Junior</option>
          <option value="MID">Mid</option>
          <option value="SENIOR">Senior</option>
        </select>

        <select
          value={filters.tech}
          onChange={(e) => setFilters({ ...filters, tech: e.target.value })}
          className="px-4 py-2 rounded-lg border bg-white dark:bg-neutral-900"
        >
          <option value="ALL">All Tech</option>
          {techOptions.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </select>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <p className="text-center text-neutral-500 mt-10">
          No jobs match these filters
        </p>
      )}
    </>
  )
}
