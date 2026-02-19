"use client"

import { Code2, Zap, Target, GitBranch, Users, Award } from "lucide-react"
import { useState } from "react"

const benefits = [
  {
    icon: Code2,
    title: "Real Code Metrics",
    description: "Track actual contributions, commits, and open source impact across 1000+ projects.",
  },
  {
    icon: Zap,
    title: "Instant Scoring",
    description: "Get objective developer rankings in seconds. No bias. No guesswork. Pure data.",
  },
  {
    icon: Target,
    title: "Precision Matching",
    description: "Find developers whose GitHub history matches your exact tech stack and needs.",
  },
  {
    icon: GitBranch,
    title: "GitHub Verified",
    description: "Every engineer verified through their public GitHub profile and contributions.",
  },
  {
    icon: Users,
    title: "Quality Pool",
    description: "Access top 5% of developers who actively contribute to open source.",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description: "Hire engineers with documented, verifiable real-world experience.",
  },
]

export default function Benefits() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="relative z-10 py-32 px-6 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 mb-6">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">Why Crewcast</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-balance">
            Built for engineering teams
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Stop wasting time on resumes. Start hiring based on what developers actually build.
          </p>
        </div>

        {/* Benefits grid - Bento style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            const isLargeCard = index === 0

            return (
              <div
                key={index}
                className={`relative group cursor-pointer transition-all duration-300 ${
                  isLargeCard ? "lg:col-span-1" : ""
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Animated glow on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none ${
                    index % 2 === 0
                      ? "bg-gradient-to-r from-blue-500/10 to-transparent"
                      : "bg-gradient-to-r from-violet-500/10 to-transparent"
                  }`}
                />

                <div className="relative p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 h-full">
                  {/* Icon container */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-neutral-900 dark:text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mt-4 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {benefit.description}
                  </p>

                  {/* Bottom accent line on hover */}
                  <div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                    style={{
                      width: hoveredIndex === index ? "100%" : "0%",
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
