import { Button } from "@/components/ui/button"
import { Job } from "../types/job"
import Link from "next/link"

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow flex flex-col h-full">
      {/* Header Section */}
      <div className="flex-none mb-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {job.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span>{job.location}</span>
          <span>•</span>
          <span>{job.workMode}</span>
        </div>
        <div className="text-sm text-gray-700 font-medium">
          {job.experience}
        </div>
      </div>

      {/* Description - grows to fill space */}
      <div className="flex-1 mb-4">
        <p className="text-sm text-gray-600 line-clamp-3">
          {job.description}
        </p>
      </div>

      {/* Tech Stack */}
      <div className="flex-none mb-4">
        <div className="flex flex-wrap gap-2">
          {job.techStack.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Footer - Salary and Button */}
      <div className="flex-none flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="text-lg font-semibold text-gray-900">
          ₹{(job.salaryMin / 100000).toFixed(1)}L – ₹{(job.salaryMax / 100000).toFixed(1)}L
        </div>
      
  <Link href={`/form/${job.publicId}`}>
    <Button className="bg-black hover:bg-gray-800 cursor-pointer text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200">
      Apply
    </Button>
  </Link>
      </div>
    </div>
  )
}