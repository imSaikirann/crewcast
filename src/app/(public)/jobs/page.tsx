import Breadcrumbs from "@/components/common/Breadcrumbs"
import JobCard from "@/features/jobs/components/JobCard"
import { Job } from "@/features/jobs/types/job"

const jobs: Job[] = [
  {
    id: "695bc159e67d820a6155a2f8",
    publicId: "a0249757-9e93-47ec-acd9-ca383643cf26",
    title: "Frontend Engineer",
    techStack: ["React", "TypeScript", "Next.js", "Tailwind", "REST APIs"],
    description:
      "We are hiring a frontend engineer to build and scale our SaaS product.",
    salaryMin: 1200000,
    salaryMax: 2000000,
    experience: "MID",
    location: "India",
    roleType: "FULL_TIME",
    workMode: "REMOTE",
  },
  {
    id: "695beda48c05b60ee9de7004",
    publicId: "edcc05ef-1435-456b-815d-2d29b1ad0eb0",
    title: "Backend Engineer (Node.js)",
    techStack: ["Node.js", "TypeScript", "PostgreSQL", "Prisma", "Redis", "Docker", "AWS"],
    description:
      "We are looking for a backend engineer to design and scale APIs.",
    salaryMin: 1800000,
    salaryMax: 2800000,
    experience: "SENIOR",
    location: "Bangalore, India",
    roleType: "FULL_TIME",
    workMode: "HYBRID",
  },
]

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 px-6 py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 mt-5 ">
            <Breadcrumbs
                      items={[
                        { label: "Home", href: "/" },
                        { label: "Jobs", href: "/jobs" },
                        
                      ]}
                    />
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-10">
          Open Positions
        </h1>

       

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  )
}
