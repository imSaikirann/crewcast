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
  { initials: "AK", name: "Aditya Kumar",  role: "github.com/adityak · TS, React",    score: 91, tier: "high" },
  { initials: "PS", name: "Priya Sharma",  role: "github.com/priya-sh · Go, gRPC",     score: 78, tier: "mid"  },
  { initials: "RV", name: "Rahul Verma",   role: "github.com/rv-dev · Node, Python",   score: 62, tier: "low"  },
];

const bars = [
  { label: "Repositories",     pct: 91 },
  { label: "Commit freq.",      pct: 84 },
  { label: "PR quality",        pct: 88 },
  { label: "Stack match",       pct: 95 },
  { label: "Stars earned",      pct: 72 },
];

const scoreClasses: Record<string, string> = {
  high: "bg-[rgba(255,255,255,0.10)] text-[#e0e0e0]  border border-[rgba(255,255,255,0.18)]",
  mid:  "bg-[rgba(255,255,255,0.06)] text-[#888888]  border border-[rgba(255,255,255,0.10)]",
  low:  "bg-[rgba(255,255,255,0.03)] text-[#444444]  border border-[rgba(255,255,255,0.06)]",
};

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-28 pb-20 px-6 overflow-hidden"
      style={{ background: "var(--lc-bg)" }}
    >
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1100px] mx-auto">
        {/* Headline block */}
        <div className="text-center max-w-[860px] mx-auto">

          {/* Tag pill */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="inline-flex items-center gap-2 px-3 py-[5px] rounded-full border border-[var(--lc-border)]
                       text-[11px] font-medium text-[var(--lc-text-3)] mb-8"
          >
            <span className="w-[5px] h-[5px] rounded-full bg-[var(--lc-text-3)]" />
            GitHub-first hiring platform for engineering teams
          </motion.div>

          {/* Headline — heavy weight + italic contrast, no color accent */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.1}
            className="text-[clamp(48px,7vw,80px)] font-extrabold leading-[1.0]
                       text-[var(--lc-text)] mb-6"
            style={{ fontFamily: "var(--lc-sans)" }}
          >
            <Balancer>
              Hire engineers by their{" "}
              <em className="font-light italic not-italic" style={{ fontStyle: "italic", fontWeight: 300 }}>
                actual work.
              </em>
            </Balancer>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.18}
            className="text-[16px] text-[var(--lc-text-2)] max-w-[500px] mx-auto leading-[1.75] mb-10"
          >
            Stop reading the same resume keywords. Crewcast attaches GitHub
            scoring to every engineering job form — ranked candidates with real
            signal, not claimed skills.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.24}
            className="flex justify-center px-2 sm:px-0"
          >
            <Link
              href="/dashboard"
              className="lc-btn-primary min-h-12 w-full max-w-[320px] justify-center px-6 text-center sm:w-auto sm:max-w-none"
            >
              <span className="truncate">Start hiring free</span>
              <ArrowRight className="size-4 shrink-0" />
            </Link>
          </motion.div>
        </div>

        {/* Browser mockup */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="mt-16 max-w-[860px] mx-auto"
        >
          <div
            className="rounded-lg border border-[var(--lc-border)] overflow-hidden"
            style={{
              background: "var(--lc-bg-1)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 40px 80px rgba(0,0,0,0.8)",
            }}
          >
            {/* Titlebar */}
            <div
              className="h-10 flex items-center px-4 gap-1.5 border-b border-[var(--lc-border)]"
              style={{ background: "var(--lc-bg-2)" }}
            >
              {/* All dots greyed — no color */}
              <span className="w-[10px] h-[10px] rounded-full bg-[#3a3a3a]" />
              <span className="w-[10px] h-[10px] rounded-full bg-[#3a3a3a]" />
              <span className="w-[10px] h-[10px] rounded-full bg-[#3a3a3a]" />
              <span className="min-w-0 truncate pl-3 text-center text-[11px] text-[var(--lc-text-3)] sm:mx-auto sm:pl-0">
                filtrank.in / dashboard / frontend-engineer-2024
              </span>
            </div>

            {/* Toolbar row */}
            <div
              className="flex flex-col gap-3 px-5 py-3 border-b border-[var(--lc-border)] sm:flex-row sm:items-center sm:justify-between"
              style={{ background: "var(--lc-bg-1)" }}
            >
              <div className="min-w-0">
                <div className="text-[13px] font-bold text-[var(--lc-text)]">
                  Frontend Engineer
                </div>
                <div className="text-[10px] text-[var(--lc-text-3)] mt-0.5">
                  24 applicants · last 7 days
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <span className="text-[10px] px-3 py-1 border border-[var(--lc-border)] rounded-[4px] text-[var(--lc-text-3)]">
                  Export CSV
                </span>
                <span
                  className="text-[10px] px-3 py-1 rounded-[4px] font-bold text-[var(--lc-accent-text)]"
                  style={{ background: "var(--lc-accent)" }}
                >
                  Share form
                </span>
              </div>
            </div>

            {/* Two-col body */}
            <div className="grid md:grid-cols-2">

              {/* Candidates */}
              <div className="border-b border-[var(--lc-border)] p-5 md:border-b-0 md:border-r">
                <div className="text-[9px] font-semibold uppercase text-[var(--lc-text-3)] mb-3">
                  Ranked candidates
                </div>
                {candidates.map((c, i) => (
                  <div
                    key={c.name}
                    className="flex min-w-0 items-center justify-between gap-3 py-2.5"
                    style={{
                      borderBottom: i < candidates.length - 1 ? "0.5px solid var(--lc-border)" : "none",
                    }}
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div
                        className="w-7 h-7 shrink-0 rounded-[5px] border border-[var(--lc-border)] flex items-center justify-center
                                   text-[9px] text-[var(--lc-text-2)]"
                        style={{ background: "var(--lc-bg-3)" }}
                      >
                        {c.initials}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-[12px] font-semibold text-[var(--lc-text)]">{c.name}</div>
                        <div className="mt-0.5 truncate text-[10px] text-[var(--lc-text-3)]">{c.role}</div>
                      </div>
                    </div>
                    <span className={`shrink-0 text-[12px] font-semibold px-2 py-0.5 rounded-[3px] ${scoreClasses[c.tier]}`}>
                      {c.score}
                    </span>
                  </div>
                ))}
              </div>

              {/* Score breakdown */}
              <div className="p-5">
                <div className="text-[9px] font-semibold uppercase text-[var(--lc-text-3)] mb-3">
                  Score breakdown · Aditya Kumar
                </div>
                {bars.map((b) => (
                  <div key={b.label} className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-[12px] text-[var(--lc-text-2)]">{b.label}</span>
                      <span className="text-[12px] font-medium text-[var(--lc-text-2)]">{b.pct}</span>
                    </div>
                    <div className="h-[2px] rounded-full" style={{ background: "var(--lc-bg-3)" }}>
                      <div
                        className="h-[2px] rounded-full"
                        style={{ width: `${b.pct}%`, background: "var(--lc-text-2)" }}
                      />
                    </div>
                  </div>
                ))}

                {/* Final score card */}
                <div
                  className="mt-4 flex items-center justify-between px-3 py-2.5 rounded-[6px] border"
                  style={{
                    background: "var(--lc-bg-2)",
                    borderColor: "var(--lc-border)",
                  }}
                >
                  <span className="text-[12px] text-[var(--lc-text-2)]">Final score</span>
                  <span className="text-[28px] font-semibold leading-none text-[var(--lc-text)]">91</span>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
