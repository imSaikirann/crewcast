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
  high: "border border-[rgba(255,255,255,0.22)] bg-[rgba(255,255,255,0.10)] text-[#e7e7e7]",
  mid: "border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] text-[#a0a0a0]",
  low: "border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-[#666666]",
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
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
            <span className="text-white/90">Built for engineering hiring teams</span>
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
          className="mx-auto mt-12 max-w-[920px]"
        >
          <div
            className="rounded-lg border border-[var(--lc-border)] overflow-hidden"
            style={{
              background: "var(--lc-bg-1)",
              boxShadow: "0 0 0 1px var(--lc-grid), var(--lc-hero-display-shadow)",
            }}
          >
            <div
              className="h-10 flex items-center px-4 gap-1.5 border-b border-[var(--lc-border)]"
              style={{ background: "var(--lc-bg-2)" }}
            >
              <span className="w-[10px] h-[10px] rounded-full bg-[#3a3a3a]" />
              <span className="w-[10px] h-[10px] rounded-full bg-[#3a3a3a]" />
              <span className="w-[10px] h-[10px] rounded-full bg-[#3a3a3a]" />
              <span className="min-w-0 truncate pl-3 text-center text-[11px] text-[var(--lc-text-3)] sm:mx-auto sm:pl-0">
                crewcast.app / dashboard / frontend-engineer
              </span>
            </div>

            <div
              className="flex flex-col gap-3 px-5 py-3 border-b border-[var(--lc-border)] sm:flex-row sm:items-center sm:justify-between"
              style={{ background: "var(--lc-bg-1)" }}
            >
              <div className="min-w-0">
                <div className="text-[13px] font-bold text-[var(--lc-text)]">
                  Frontend Engineer
                </div>
                <div className="text-[10px] text-[var(--lc-text-3)] mt-0.5">
                  24 applicants · 6 shortlisted · 2 interviews
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
                  Review queue
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2">
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
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[5px] border border-[var(--lc-border)] text-[9px] text-[var(--lc-text-2)]"
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

              <div className="p-5">
                <div className="text-[9px] font-semibold uppercase text-[var(--lc-text-3)] mb-3">
                  Why candidate #1 ranks highest
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
