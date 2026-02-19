"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, GitCommit, Star } from "lucide-react"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center px-6 pt-32 pb-24 relative overflow-hidden">

      {/* Subtle background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <div className="space-y-8">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
            <Github className="w-4 h-4" />
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              Powered by real GitHub contributions
            </span>
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
              Hire engineers
              <br />
              <span className="text-neutral-900 dark:text-white">
                ranked by real work.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed">
              CrewCast scores developers using GitHub activity,
              open-source contributions, project impact,
              and engineering consistency — not resumes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link href="/dashboard">
              <Button className="gap-2 h-auto text-base font-semibold">
                Start hiring <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link href="/jobs">
              <Button variant="outline">
                View jobs
              </Button>
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE – Live GitHub Score Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-xl p-8 shadow-xl"
          >

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-sm font-semibold">
                  AN
                </div>
                <div>
                  <p className="text-sm font-medium">Arjun N</p>
                  <p className="text-xs text-neutral-500">Frontend Engineer</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs text-neutral-500">CrewScore</p>
                <motion.p
                  className="text-2xl font-semibold"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  98
                </motion.p>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <GitCommit className="w-4 h-4 text-neutral-500" />
                  Commits
                </span>
                <span className="text-neutral-700 dark:text-neutral-300">
                  1,842
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-neutral-500" />
                  OSS Stars
                </span>
                <span className="text-neutral-700 dark:text-neutral-300">
                  3,210
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Consistency</span>
                <span className="text-green-600">High</span>
              </div>
            </div>

            {/* Bottom CTA */}
            <Link
              href="/developers/arjun"
              className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-neutral-900 dark:text-white hover:opacity-70 transition"
            >
              View full profile <ArrowRight className="w-4 h-4" />
            </Link>

          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
