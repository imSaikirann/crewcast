"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

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

function ShipMark({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <rect width="44" height="44" rx="9" fill="#f0f0f0" />
      <polygon points="22,10 22,30 12,30" fill="#080808" />
      <rect x="12" y="33" width="20" height="5" rx="1.5" fill="#080808" />
    </svg>
  );
}

export function Comparison() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="lc-section" ref={ref}>
      <motion.p
        className="lc-tag"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
      >
        Signal vs noise
      </motion.p>

      <motion.h2
        className="lc-h2"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
      >
        Simple hiring system.
        <br />
        Better technical decisions.
      </motion.h2>

      <motion.p
        className="lc-sub mb-8"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
      >
        This is the difference between resume-heavy screening and a workflow designed
        for engineering roles.
      </motion.p>

      <div className="mt-6 overflow-x-auto rounded-lg border border-[var(--lc-border)] bg-[var(--lc-bg-1)]">
        <div className="min-w-[640px]">
          <div className="grid grid-cols-[1fr_130px_150px] border-b border-[var(--lc-border)] bg-[var(--lc-bg-2)]">
            <div className="px-4 py-3 text-[11px] uppercase tracking-wide text-[var(--lc-text-3)] sm:px-6 sm:py-4">
              Capability
            </div>

            <div className="border-l border-[var(--lc-border)] px-3 py-3 text-center text-[11px] uppercase tracking-wide text-[var(--lc-text-3)] sm:px-4 sm:py-4">
              Old flow
            </div>

            <div className="flex items-center justify-center gap-2 border-l border-[var(--lc-border)] px-3 py-3 sm:px-4 sm:py-4">
              <ShipMark size={20} />
              <span className="text-[11px] uppercase tracking-wide text-[var(--lc-text)]">
                Crewcast
              </span>
            </div>
          </div>

          {rows.map((row, i) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-[1fr_130px_150px] border-b border-[var(--lc-border)] last:border-0"
            >
              <div className="flex items-center gap-2 px-4 py-3 text-[13px] text-[var(--lc-text-2)] sm:gap-3 sm:px-6 sm:py-4 sm:text-sm">
                {row.highlight && (
                  <span className="rounded border border-[var(--lc-border-hover)] px-2 py-0.5 text-[9px] uppercase tracking-wide text-[var(--lc-text)]">
                    Core
                  </span>
                )}
                <span>{row.feature}</span>
              </div>

              <div className="flex items-center justify-center border-l border-[var(--lc-border)]">
                {row.without ? (
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--lc-border)] text-[var(--lc-text-2)]">
                    <Check size={14} />
                  </span>
                ) : (
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--lc-border)] text-[var(--lc-text-3)]">
                    <X size={14} />
                  </span>
                )}
              </div>

              <div className="flex items-center justify-center border-l border-[var(--lc-border)]">
                {row.with ? (
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--lc-border-hover)] bg-[var(--lc-bg-2)] text-[var(--lc-text)]">
                    <Check size={14} />
                  </span>
                ) : (
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--lc-border)] text-[var(--lc-text-3)]">
                    <X size={14} />
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