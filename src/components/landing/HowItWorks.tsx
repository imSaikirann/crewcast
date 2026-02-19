"use client"

import { CheckCircle2 } from "lucide-react"
import { useState } from "react"

const steps = [
  {
    number: 1,
    title: "Sign up & verify",
    description: "Create your company account and verify your hiring authority.",
    highlight: "Takes 2 minutes",
  },
  {
    number: 2,
    title: "Set tech requirements",
    description: "Define the tech stack, experience level, and specific skills needed.",
    highlight: "Be specific",
  },
  {
    number: 3,
    title: "Get ranked candidates",
    description: "Browse engineers ranked by GitHub contribution score and relevance.",
    highlight: "Pre-filtered",
  },
  {
    number: 4,
    title: "Reach & hire",
    description: "Message top matches directly or post your job to reach passive talent.",
    highlight: "Real engineers",
  },
]

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section className="relative z-10 py-32 px-6 bg-white dark:bg-neutral-950">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 mb-6">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">How it works</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-balance">
            Four steps to better hiring
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            From zero to your next hire in minutes, not weeks.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative group cursor-pointer"
              onMouseEnter={() => setActiveStep(index)}
            >
              {/* Connection line */}
              {index !== steps.length - 1 && (
                <div className="absolute left-6 top-20 w-1 h-12 bg-gradient-to-b from-blue-500/50 to-transparent group-hover:from-blue-500 transition-all" />
              )}

              {/* Step card */}
              <div
                className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                  activeStep === index
                    ? "border-blue-500 bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-500/10 dark:to-transparent shadow-lg shadow-blue-500/10"
                    : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700"
                }`}
              >
                <div className="flex gap-6">
                  {/* Step number */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg transition-all duration-300 ${
                        activeStep === index
                          ? "bg-blue-500 text-white scale-110"
                          : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                      }`}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                      {activeStep === index && (
                        <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 animate-in fade-in" />
                      )}
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-3">{step.description}</p>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        activeStep === index
                          ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                          : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                      }`}
                    >
                      {step.highlight}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
