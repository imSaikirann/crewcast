"use client"

import { motion, useInView } from "framer-motion"
import { Github, Trophy, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"

export default function CrewStatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative px-6 py-32 overflow-hidden">
      <FloatingGithubIcons />

      <div className="mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-6 gap-6"
        >

          {/* Main Impact Card */}
          <AnimatedCard className="md:col-span-4 p-12">
            <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-6">
              <Trophy className="w-4 h-4" />
              Proven impact
            </div>

            <h3 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Engineers ranked by
              <br />
              real GitHub signal.
            </h3>

            <p className="mt-6 text-neutral-600 dark:text-neutral-400 max-w-lg leading-relaxed">
              CrewCast analyzes commits, OSS contributions, issue quality,
              repo influence, and consistency to generate a developer score.
            </p>

            <Link
              href="/ranking"
              className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-neutral-900 dark:text-white hover:opacity-70 transition"
            >
              View rankings <ArrowUpRight className="w-4 h-4" />
            </Link>
          </AnimatedCard>

          {/* GitHub Activity Card */}
          <AnimatedCard className="md:col-span-2 p-8">
            <p className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              GitHub signals analyzed
            </p>

            <motion.h4
              className="mt-4 text-3xl font-semibold"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              150+
            </motion.h4>
          </AnimatedCard>

          {/* Top 3 Developers */}
          <AnimatedCard className="md:col-span-3 p-10">
            <p className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-6">
              Top developers this week
            </p>

            <div className="space-y-5">
              {[
                { name: "Arjun N", score: 98 },
                { name: "Sara M", score: 95 },
                { name: "David L", score: 92 }
              ].map((dev, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.2 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-sm font-medium"
                    >
                      {i + 1}
                    </motion.div>
                    <span className="text-sm font-medium">
                      {dev.name}
                    </span>
                  </div>

                  <span className="text-sm text-neutral-500">
                    {dev.score}
                  </span>
                </motion.div>
              ))}
            </div>

            <Link
              href="/developers"
              className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-neutral-900 dark:text-white hover:opacity-70 transition"
            >
              Explore developers <ArrowUpRight className="w-4 h-4" />
            </Link>
          </AnimatedCard>

          {/* Hiring Activity */}
          <AnimatedCard className="md:col-span-3 p-10">
            <p className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-6">
              Hiring now
            </p>

            {[
              "Senior Next.js Engineer",
              "Backend Node.js Developer",
              "AI Infrastructure Engineer"
            ].map((role, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15 }}
                className="flex items-center justify-between text-sm mb-4"
              >
                {role}
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
              </motion.div>
            ))}

            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-neutral-900 dark:text-white hover:opacity-70 transition"
            >
              View open roles <ArrowUpRight className="w-4 h-4" />
            </Link>
          </AnimatedCard>

        </motion.div>
      </div>
    </section>
  )
}

/* Reusable Animated Card */
function AnimatedCard({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className={`relative rounded-3xl border border-neutral-200/70 dark:border-neutral-800/80 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-xl overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  )
}

/* Floating GitHub Icons */
function FloatingGithubIcons() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-20 left-20 text-neutral-800 dark:text-neutral-800 opacity-20"
      >
        <Github size={120} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
        className="absolute bottom-32 right-24 text-neutral-300 dark:text-neutral-800 opacity-20"
      >
        <Github size={150} />
      </motion.div>

      <motion.div
        animate={{ y: [0, -20, 0], x: [0, -40, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-1/2 right-1/3 text-neutral-300 dark:text-neutral-800 opacity-10"
      >
        <Github size={100} />
      </motion.div>
    </div>
  )
}
