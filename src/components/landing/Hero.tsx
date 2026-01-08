"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-white text-black dark:bg-black dark:text-white transition-colors">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT — Message */}
        <div className="space-y-8">
          <p className="text-sm tracking-widest uppercase text-neutral-600 dark:text-neutral-400">
            Crewcast — hiring without noise
          </p>

          <h1 className="text-5xl md:text-6xl lg:text-4xl font-extrabold leading-tight">
            Real engineers.
            <br />
            Real GitHub.
            <br />
            Real hiring.
          </h1>

          <p className="text-lg text-neutral-700 dark:text-neutral-400 max-w-xl">
            We rank developers by what they build, not by what they write on resumes.
            Recruiters get signal. Developers get fairness.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/jobs">
              <Button className="px-8 py-6 bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200">
                View open jobs
              </Button>
            </Link>

            <Link href="/dashboard">
              <Button
                variant="outline"
                className="px-8 py-6 border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
              >
                Post a job
              </Button>
            </Link>
          </div>
        </div>

        {/* RIGHT — Proof */}
        <div className="border border-neutral-300 dark:border-neutral-800 p-8 rounded-xl space-y-6 bg-white dark:bg-neutral-950">
          <p className="uppercase text-xs tracking-wider text-neutral-500 dark:text-neutral-400">
            Live hiring feed
          </p>

          <div className="space-y-4">
            {[
              "Senior Frontend Engineer — Remote",
              "Node.js Backend Engineer — Bangalore",
              "Full Stack Developer — Europe",
              "React Engineer — Contract",
            ].map((job, i) => (
              <div
                key={i}
                className="flex items-center justify-between border border-neutral-200 dark:border-neutral-800 px-4 py-3 rounded-lg hover:border-neutral-400 dark:hover:border-neutral-600 transition"
              >
                <span className="text-sm">{job}</span>
                <span className="text-xs text-neutral-500">Open</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-neutral-500 dark:text-neutral-600">
            Updated in real-time from active recruiters
          </p>
        </div>
      </div>
    </section>
  )
}
