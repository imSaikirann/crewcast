"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { CrewcastMark } from "../brand/CrewcastLogo";

const rows = [
  {
    feature: "Signal-based candidate scoring",
    without: false,
    with: true,
    highlight: true,
  },
  {
    feature: "Automatically ranked shortlist",
    without: false,
    with: true,
  },
  {
    feature: "Tech stack & language matching",
    without: false,
    with: true,
  },
  {
    feature: "Activity & consistency insights",
    without: false,
    with: true,
  },
  {
    feature: "Role-specific application forms",
    without: false,
    with: true,
  },
  {
    feature: "No login required for candidates",
    without: false,
    with: true,
  },
  {
    feature: "Manual resume-first screening",
    without: true,
    with: false,
  },
  {
    feature: "Keyword-based filtering",
    without: true,
    with: false,
  },
];



export function Comparison() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="lc-section" ref={ref}>
      <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 backdrop-blur-md"
        >
          <span className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981aa]" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
            Signal vs noise
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-balance font-extrabold leading-[1.05] tracking-[-0.04em] text-foreground"
          style={{ fontSize: "clamp(2rem, 5.5vw, 3.75rem)" }}
        >
          Simple hiring system.{" "}
          <em className="font-light italic text-foreground/85">Better decisions.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-muted-foreground"
        >
          See the difference between resume-heavy screening and a workflow designed for engineering roles.
        </motion.p>
      </div>


      <div className="mt-6 overflow-x-auto rounded-lg border border-dashed border-[var(--lc-border)] bg-[var(--lc-bg-1)]">
        <div className="min-w-[640px]">
          <div className="grid grid-cols-[1fr_130px_150px] border-b border-[var(--lc-border)] bg-[var(--lc-bg-2)]">
            <div className="px-4 py-3 text-[11px] uppercase tracking-wide text-[var(--lc-text-3)] sm:px-6 sm:py-4">
              Capability
            </div>

            <div className="border-l border-[var(--lc-border)] px-3 py-3 text-center text-[11px] uppercase tracking-wide text-[var(--lc-text-3)] sm:px-4 sm:py-4">
              Others
            </div>

            <div className="flex items-center justify-center gap-2 border-l border-[var(--lc-border)] px-3 py-3 sm:px-4 sm:py-4">
              <CrewcastMark  />
              
            </div>
          </div>

          {rows.map((row, i) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-[1fr_130px_150px] border-b border-dashed border-[var(--lc-border)] last:border-0"
            >
              <div className="flex items-center gap-2 px-4 py-3 text-[13px] text-[var(--lc-text-2)] sm:gap-3 sm:px-6 sm:py-4 sm:text-sm">
                {row.highlight && (
                  <span className="rounded border border-dashed bg-green-200 border-[var(--lc-border-hover)] text-green-600 px-2 py-0.5 text-[9px] uppercase tracking-wide text-[var(--lc-text)]">
                    Core
                  </span>
                )}
                <span>{row.feature}</span>
              </div>

              <div className="flex items-center justify-center border-l border-[var(--lc-border)]">
                {row.without ? (
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--lc-border)] text-[var(--lc-text-2)]">
                    <Check  className="text-green-500" size={14} />
                  </span>
                ) : (
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border  border-[var(--lc-border)] text-[var(--lc-text-3)]">
                    <X className="text-red-400"  size={14} />
                  </span>
                )}
              </div>

              <div className="flex items-center justify-center border-l border-[var(--lc-border)]">
                {row.with ? (
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--lc-border-hover)] bg-[var(--lc-bg-2)] text-[var(--lc-text)]">
                    <Check className="text-green-500" size={14} />
                  </span>
                ) : (
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--lc-border)] text-[var(--lc-text-3)]">
                    <X className="text-red-400" size={14} />
                  </span>
                )}
              </div>
            </motion.div>
          ))}

          <div className="grid grid-cols-[1fr_130px_150px] bg-[var(--lc-bg-2)]">
            <div className="px-4 py-3 text-[11px] text-[var(--lc-text-3)] sm:px-6 sm:py-4 sm:text-xs">
              Start free. Publish one role today.
            </div>

            <div />

            <div className="flex justify-center py-2.5 sm:py-3">
              <Link href="/dashboard" className="lc-btn-primary px-4 py-2 text-sm">
                Start hiring
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-3 text-[11px] text-[var(--lc-text-3)] md:hidden">
        Swipe horizontally to see full comparison.
      </p>
    </section>
  );
}
