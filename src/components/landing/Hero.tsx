"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const candidates = [
  { initials: "AK", name: "Aditya Kumar", role: "github.com/adityak · TS, React", score: 88, tier: "high" },
  { initials: "PR", name: "Priya Rajan",  role: "github.com/priyarajan · Go, gRPC", score: 74, tier: "mid" },
  { initials: "MS", name: "Mihail Stoev", role: "github.com/mihails · Node, Python", score: 51, tier: "low" },
];

const bars = [
  { label: "Repositories",    pct: 91 },
  { label: "Language match",  pct: 84 },
  { label: "Activity streak", pct: 76 },
  { label: "Profile maturity",pct: 88 },
];

const scoreClasses: Record<string, string> = {
  high: "bg-[rgba(173,250,29,0.12)] text-[var(--lc-accent)]",
  mid:  "bg-[rgba(255,185,0,0.12)] text-[#ffb900]",
  low:  "bg-[rgba(255,68,68,0.10)] text-[var(--lc-danger)]",
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
            "linear-gradient(var(--lc-border) 1px,transparent 1px), linear-gradient(90deg,var(--lc-border) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
        }}
      />
      {/* Accent glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px]"
        style={{ background: "radial-gradient(ellipse, rgba(173,250,29,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-[1100px] mx-auto">
        {/* Headline block */}
        <div className="text-center max-w-[860px] mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="inline-flex items-center gap-2 px-3 py-[5px] rounded-full border border-[var(--lc-border)]
                       font-mono text-[11px] text-[var(--lc-text-2)] mb-8 tracking-wide"
          >
            <span className="w-[5px] h-[5px] rounded-full bg-[var(--lc-accent)]" />
            GitHub-first hiring platform for engineering teams
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.1}
            className="text-[clamp(42px,7vw,80px)] font-semibold leading-[1.05] tracking-[-0.04em]
                       text-[var(--lc-text)] mb-6"
            style={{ fontFamily: "var(--lc-sans)" }}
          >
            Hire engineers by<br />
            their{" "}
            <em className="not-italic text-[var(--lc-accent)]">actual work.</em>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.18}
            className="text-[17px] text-[var(--lc-text-2)] max-w-[520px] mx-auto leading-[1.7] mb-10"
          >
            Stop reading the same resume keywords. Crewcast attaches GitHub
            scoring to every engineering job form , ranked candidates with real
            signal, not claimed skills.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.24}
            className="flex gap-3 justify-center"
          >
            <Link href="/dashboard" className="lc-btn-primary">
              Start hiring free <ArrowRight size={14} />
            </Link>
            <Link href="/jobs" className="lc-btn-ghost">
              See a live form
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
            className="rounded-xl border border-[var(--lc-border)] overflow-hidden"
            style={{
              background: "var(--lc-bg-1)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 40px 80px rgba(0,0,0,0.8)",
            }}
          >
            {/* Titlebar */}
            <div className="h-10 flex items-center px-4 gap-1.5 border-b border-[var(--lc-border)]"
                 style={{ background: "var(--lc-bg-2)" }}>
              <span className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
              <span className="w-[10px] h-[10px] rounded-full bg-[#ffbd2e]" />
              <span className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
              <span className="min-w-0 truncate pl-3 text-center font-mono text-[11px] text-[var(--lc-text-3)] sm:mx-auto sm:pl-0">
                crewcast.io / dashboard / frontend-engineer-2024
              </span>
            </div>

            {/* Toolbar row */}
            <div className="flex flex-col gap-3 px-5 py-3 border-b border-[var(--lc-border)] sm:flex-row sm:items-center sm:justify-between"
                 style={{ background: "var(--lc-bg-1)" }}>
              <div className="min-w-0">
                <div className="text-[13px] font-medium text-[var(--lc-text)]">
                  Frontend Engineer
                </div>
                <div className="font-mono text-[10px] text-[var(--lc-text-3)] mt-0.5">
                  24 applicants · last 7 days
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <span className="font-mono text-[10px] px-3 py-1 border border-[var(--lc-border)] rounded text-[var(--lc-text-3)]">
                  Export CSV
                </span>
                <span className="font-mono text-[10px] px-3 py-1 rounded text-[var(--lc-accent)]"
                      style={{ background: "var(--lc-accent-dim)", border: "1px solid rgba(173,250,29,0.2)" }}>
                  Share form
                </span>
              </div>
            </div>

            {/* Two-col body */}
            <div className="grid md:grid-cols-2">
              {/* Candidates */}
              <div className="border-b border-[var(--lc-border)] p-5 md:border-b-0 md:border-r">
                <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--lc-text-3)] mb-3">
                  Ranked candidates
                </div>
                {candidates.map((c, i) => (
                  <div
                    key={c.name}
                    className="flex min-w-0 items-center justify-between gap-3 py-2.5"
                    style={{ borderBottom: i < candidates.length - 1 ? "1px solid var(--lc-border)" : "none" }}
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div className="w-7 h-7 shrink-0 rounded-[6px] border border-[var(--lc-border)] flex items-center justify-center
                                      font-mono text-[9px] text-[var(--lc-text-2)]"
                           style={{ background: "var(--lc-bg-3)" }}>
                        {c.initials}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-[12px] font-medium text-[var(--lc-text)]">{c.name}</div>
                        <div className="mt-0.5 truncate text-[10px] text-[var(--lc-text-3)]">{c.role}</div>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      <span className="hidden font-mono text-[10px] text-[var(--lc-text-3)] sm:inline">CrewScore</span>
                      <span className={`font-mono text-[12px] font-medium px-2 py-0.5 rounded ${scoreClasses[c.tier]}`}>
                        {c.score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Score breakdown */}
              <div className="p-5">
                <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--lc-text-3)] mb-3">
                  Score breakdown · Aditya Kumar
                </div>
                {bars.map((b) => (
                  <div key={b.label} className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-[11px] text-[var(--lc-text-2)]">{b.label}</span>
                      <span className="font-mono text-[11px] text-[var(--lc-accent)]">{b.pct}</span>
                    </div>
                    <div className="h-[3px] rounded-full" style={{ background: "var(--lc-bg-3)" }}>
                      <div
                        className="h-[3px] rounded-full"
                        style={{ width: `${b.pct}%`, background: "var(--lc-accent)", opacity: 0.7 }}
                      />
                    </div>
                  </div>
                ))}
                <div
                  className="mt-4 flex items-center justify-between px-3 py-2.5 rounded-lg border"
                  style={{ background: "var(--lc-accent-dim)", borderColor: "rgba(173,250,29,0.15)" }}
                >
                  <span className="text-[12px] text-[var(--lc-text-2)]">Final CrewScore</span>
                  <span className="font-mono text-[28px] font-medium leading-none text-[var(--lc-accent)]">88</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
