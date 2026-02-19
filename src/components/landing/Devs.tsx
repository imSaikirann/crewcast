"use client"

import { Github, ExternalLink } from "lucide-react"
import { useState } from "react"

const developers = [
  {
    name: "Alex Chen",
    role: "Full-Stack Engineer",
    score: 92,
    repos: 234,
    contributions: "1.2K+",
    skills: ["TypeScript", "React", "Node.js"],
    verified: true,
  },
  {
    name: "Sarah Ibrahim",
    role: "React Specialist",
    score: 88,
    repos: 156,
    contributions: "980+",
    skills: ["React", "Next.js", "Tailwind"],
    verified: true,
  },
  {
    name: "Marcus Lee",
    role: "Backend Architect",
    score: 95,
    repos: 312,
    contributions: "2.1K+",
    skills: ["Python", "PostgreSQL", "AWS"],
    verified: true,
  },
  {
    name: "Elena Rodriguez",
    role: "DevOps Engineer",
    score: 85,
    repos: 89,
    contributions: "750+",
    skills: ["Kubernetes", "Docker", "Terraform"],
    verified: true,
  },
]

export default function DevelopersShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="relative z-10 py-32 px-6 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 mb-6">
            <Github className="w-4 h-4" />
            <span className="text-sm text-neutral-600 dark:text-neutral-400">Top developers</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-balance mb-4">
            Verified engineers you can hire today
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
            Browse developers ranked by their real GitHub impact. Every profile is verified and backed by public data.
          </p>
        </div>

        {/* Developers grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {developers.map((dev, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Animated glow */}
              <div
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-r from-blue-500/10 to-violet-500/10 pointer-events-none`}
              />

              <div className="relative p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 h-full hover:shadow-lg hover:shadow-blue-500/5">
                {/* Score badge */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <div className="px-3 py-1 rounded-lg bg-gradient-to-r from-blue-100 to-violet-100 dark:from-blue-500/20 dark:to-violet-500/20">
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {dev.score}/100
                    </span>
                  </div>
                </div>

                {/* Developer info */}
                <div className="mb-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                      <Github className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{dev.name}</h3>
                        {dev.verified && (
                          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">{dev.role}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Repos</p>
                      <p className="font-bold text-sm">{dev.repos}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Contributions</p>
                      <p className="font-bold text-sm">{dev.contributions}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Score</p>
                      <p className="font-bold text-sm text-blue-600">{dev.score}</p>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-6 pb-6 border-b border-neutral-200 dark:border-neutral-800">
                  <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-3 uppercase">
                    Top skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {dev.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-xs font-medium text-blue-600 dark:text-blue-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button className="w-full py-2 px-4 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-black font-medium text-sm hover:opacity-90 transition flex items-center justify-center gap-2 group-hover:scale-105">
                  View profile
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Browse all link */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition font-medium text-sm">
            Browse all {developers.length}+ engineers
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
