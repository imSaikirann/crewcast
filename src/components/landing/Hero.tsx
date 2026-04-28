"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Balancer from "react-wrap-balancer";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const candidates = [
  {
    initials: "AK",
    name: "Aditya Kumar",
    role: "github.com/adityak · TS, React",
    score: 91,
    tier: "high",
  },
  {
    initials: "PS",
    name: "Priya Sharma",
    role: "github.com/priya-sh · Go, gRPC",
    score: 78,
    tier: "mid",
  },
  {
    initials: "RV",
    name: "Rahul Verma",
    role: "github.com/rv-dev · Node, Python",
    score: 62,
    tier: "low",
  },
];

const bars = [
  { label: "Repositories", pct: 91 },
  { label: "Commit frequency", pct: 84 },
  { label: "PR quality", pct: 88 },
  { label: "Stack match", pct: 95 },
  { label: "Stars earned", pct: 72 },
];

const scoreClasses: Record<string, string> = {
  high: "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  mid: "border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.06)] text-[var(--lc-text-2)]",
  low: "border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)] text-[var(--lc-text-3)]",
};

export default function Hero() {
  return (
    <section
      className="relative min-h-[88vh] overflow-hidden px-6 pb-20 pt-24 md:pt-28"
      style={{ background: "var(--lc-bg)" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--lc-grid) 1px, transparent 1px), linear-gradient(90deg, var(--lc-grid) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 75% 55% at 50% 0%, black 35%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1100px]">
        <div className="mx-auto max-w-[900px] text-center">
    
  <motion.div
           variants={fadeUp}
  initial="hidden"
  animate="show"
  custom={0}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 backdrop-blur-md"
        >
          <span className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981aa]" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
            Built for engineering hiring teams
          </span>
        </motion.div>


          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.1}
            className="mb-6 font-extrabold leading-[1.05] tracking-[-0.02em] text-[var(--lc-text)]"
            style={{
              fontFamily: "var(--lc-sans)",
              fontSize: "clamp(2.4rem, 6.8vw, 5.4rem)",
            }}
          >
            <Balancer>
              Turn engineering hiring into{" "}
              <em style={{ fontStyle: "italic", fontWeight: 300 }}>
                clear decisions.
              </em>
            </Balancer>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.18}
            className="mx-auto mb-10 max-w-[620px] text-[15px] leading-[1.8] text-[var(--lc-text-2)] sm:text-[16px]"
          >
            Crewcast gives every candidate a clear technical signal from public GitHub
            data, so your team spends time with strong engineers instead of reading
            resume noise.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.24}
            className="flex flex-col items-center justify-center gap-4 px-2 sm:flex-row sm:px-0"
          >
            <Link
              href="/dashboard"
              className="lc-btn-primary min-h-12 w-full max-w-[320px] justify-center px-6 text-center sm:w-auto sm:max-w-none"
            >
              <span className="truncate">Create your first hiring form</span>
              <ArrowRight className="size-4 shrink-0" />
            </Link>
            <Link
              href="/jobs"
              className="lc-btn-ghost min-h-12 w-full max-w-[320px] justify-center px-6 text-center sm:w-auto sm:max-w-none"
            >
              View open roles
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="mx-auto mt-12 max-w-[960px]"
        >
          <div
            className="overflow-hidden rounded-md border border-[var(--lc-border)]"
            style={{
              background: "var(--lc-bg-1)",
              boxShadow: "0 0 0 1px var(--lc-grid), var(--lc-hero-display-shadow)",
            }}
          >
            <div
              className="flex h-10 items-center gap-1.5 border-b border-[var(--lc-border)] px-3 sm:px-4"
              style={{ background: "var(--lc-bg-2)" }}
            >
              <span className="size-2.5 rounded-full bg-[#3a3a3a]" />
              <span className="size-2.5 rounded-full bg-[#3a3a3a]" />
              <span className="size-2.5 rounded-full bg-[#3a3a3a]" />
              <span className="ml-2 min-w-0 flex-1 truncate rounded-[4px] border border-[var(--lc-border)] bg-[var(--lc-bg-1)] px-3 py-1 text-center text-[10.5px] text-[var(--lc-text-3)] sm:ml-4">
                crewcast.app / dashboard / frontend-engineer
              </span>
            </div>

            <div
              className="flex flex-col gap-4 border-b border-[var(--lc-border)] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
              style={{ background: "var(--lc-bg-1)" }}
            >
              <div className="min-w-0 text-left">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--lc-text-3)]">
                  Active hiring queue
                </div>
                <div className="mt-1 text-[15px] font-bold text-[var(--lc-text)]">
                  Frontend Engineer
                </div>
                <div className="mt-1 flex flex-wrap gap-1.5 text-[10px] text-[var(--lc-text-3)]">
                  24 applicants · 6 shortlisted · 2 interviews
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <span className="rounded-[4px] border border-[var(--lc-border)] px-3 py-2 text-[10px] font-semibold text-[var(--lc-text-3)]">
                  Export CSV
                </span>
                <span
                  className="rounded-[4px] px-3 py-2 text-[10px] font-bold text-[var(--lc-accent-text)]"
                  style={{ background: "var(--lc-accent)" }}
                >
                  Review queue
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-[1.05fr_0.95fr]">
              <div className="border-b border-[var(--lc-border)] p-4 md:border-b-0 md:border-r md:p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--lc-text-3)]">
                    Ranked candidates
                  </div>
                  <div className="text-[10px] text-[var(--lc-text-3)]">Score</div>
                </div>

                <div className="space-y-2">
                  {candidates.map((c, i) => (
                    <div
                      key={c.name}
                      className="flex min-w-0 items-center justify-between gap-3 rounded-[6px] border border-[var(--lc-border)] px-3 py-3"
                      style={{
                        background:
                          i === 0
                            ? "linear-gradient(135deg, rgba(57,211,83,0.08), var(--lc-bg-2))"
                            : "var(--lc-bg-2)",
                      }}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex size-5 shrink-0 items-center justify-center rounded-full border border-[var(--lc-border)] text-[10px] font-semibold text-[var(--lc-text-3)]">
                          {i + 1}
                        </div>
                        <div
                          className="flex size-8 shrink-0 items-center justify-center rounded-[5px] border border-[var(--lc-border)] text-[10px] font-bold text-[var(--lc-text-2)]"
                          style={{ background: "var(--lc-bg-3)" }}
                        >
                          {c.initials}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-[12.5px] font-semibold text-[var(--lc-text)]">
                            {c.name}
                          </div>
                          <div className="mt-0.5 truncate text-[10.5px] text-[var(--lc-text-3)]">
                            {c.role}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`shrink-0 rounded-[4px] px-2.5 py-1 text-[12px] font-bold ${scoreClasses[c.tier]}`}
                      >
                        {c.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 md:p-5">
                <div className="mb-4 rounded-[6px] border border-[var(--lc-border)] bg-[var(--lc-bg-2)] p-4">
                  <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--lc-text-3)]">
                    Top candidate
                  </div>
                  <div className="mt-2 flex items-end justify-between gap-4">
                    <div className="min-w-0 text-left">
                      <div className="truncate text-[15px] font-bold text-[var(--lc-text)]">
                        Aditya Kumar
                      </div>
                      <div className="mt-1 text-[11px] text-[var(--lc-text-3)]">
                        Strong React, TypeScript, and weekly shipping signal
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="text-[34px] font-semibold leading-none text-[var(--lc-text)]">
                        91
                      </div>
                      <div className="mt-1 text-[9px] uppercase tracking-[0.12em] text-emerald-300">
                        high fit
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--lc-text-3)]">
                  Signal breakdown
                </div>
                {bars.map((b) => (
                  <div key={b.label} className="mb-3">
                    <div className="mb-1.5 flex justify-between">
                      <span className="text-[11.5px] text-[var(--lc-text-2)]">{b.label}</span>
                      <span className="text-[11.5px] font-semibold text-[var(--lc-text-2)]">
                        {b.pct}%
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-[var(--lc-bg-3)]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${b.pct}%`,
                          background:
                            b.pct >= 90
                              ? "#39d353"
                              : "linear-gradient(90deg, var(--lc-text-3), var(--lc-text-2))",
                        }}
                      />
                    </div>
                  </div>
                ))}

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {["18 repos", "92% stack", "weekly"].map((item) => (
                    <div
                      key={item}
                      className="rounded-[5px] border border-[var(--lc-border)] bg-[var(--lc-bg-2)] px-2 py-2 text-center text-[10px] font-semibold text-[var(--lc-text-2)]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
