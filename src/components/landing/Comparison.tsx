"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { X, Check } from "lucide-react";

const rows = [
  {
    feature:   "A signal score on every application",
    without:   false,
    with:      true,
    highlight: true,
  },
  {
    feature:   "A ranked shortlist (built-in)",
    without:   false,
    with:      true,
    highlight: false,
  },
  {
    feature:   "Language + stack match",
    without:   false,
    with:      true,
    highlight: false,
  },
  {
    feature:   "Activity + consistency signals",
    without:   false,
    with:      true,
    highlight: false,
  },
  {
    feature:   "Role-specific public application form",
    without:   false,
    with:      true,
    highlight: false,
  },
  {
    feature:   "No candidate account required",
    without:   false,
    with:      true,
    highlight: false,
  },
  {
    feature:   "Manual resume screening",
    without:   true,
    with:      false,
    highlight: false,
  },
  {
    feature:   "Blind keyword filtering",
    without:   true,
    with:      false,
    highlight: false,
  },
];

function ShipMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="44" height="44" rx="9" fill="#f0f0f0" />
      <polygon points="22,10 22,30 12,30" fill="#080808" />
      <rect x="12" y="33" width="20" height="5" rx="1.5" fill="#080808" />
    </svg>
  );
}

export function Comparison() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="lc-section" style={{ paddingTop: 0 }} ref={ref}>

      {/* Header */}
      <motion.p
        className="lc-tag"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
      >
        Signal vs noise
      </motion.p>

      <motion.h2
        className="lc-h2"
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.05 }}
      >
        Less guessing.<br />More signal.
      </motion.h2>

      <motion.p
        className="lc-sub mb-14"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.1 }}
      >
        Crewcast doesn’t replace judgment. It replaces guessing.
      </motion.p>

      {/* Comparison table (mobile-friendly) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.15 }}
        className="rounded-[8px] border border-[var(--lc-border)] overflow-hidden"
        style={{ background: "var(--lc-bg-1)" }}
      >
        <div className="overflow-x-auto">
          <div className="min-w-[560px]">

        {/* Column headers */}
        <div
          className="grid grid-cols-[1fr_120px_160px] border-b border-[var(--lc-border)]"
          style={{ background: "var(--lc-bg-2)" }}
        >
          <div className="px-6 py-4 text-[10px] uppercase tracking-[0.12em]"
               style={{ color: "var(--lc-text-3)" }}>
            Capability
          </div>

          {/* Without header */}
          <div className="px-4 py-4 flex flex-col items-center justify-center border-l border-[var(--lc-border)]">
            <div
              className="text-[10px] uppercase tracking-[0.1em] text-center"
              style={{ color: "var(--lc-text-3)" }}
            >
              Others
            </div>
          </div>

          {/* With header */}
          <div
            className="px-4 py-4 flex flex-col items-center justify-center gap-2 border-l"
            style={{ borderColor: "var(--lc-border-hover)", background: "var(--lc-bg-1)" }}
          >
            <ShipMark size={24} />
            <span
              className="text-[10px] uppercase tracking-[0.1em]"
              style={{ color: "var(--lc-text)" }}
            >
              Crewcast
            </span>
          </div>
        </div>

        {/* Rows */}
        {rows.map((row, i) => (
          <motion.div
            key={row.feature}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 + i * 0.04 }}
            className="grid grid-cols-[1fr_120px_160px] border-b border-[var(--lc-border)] last:border-0"
            style={{
              background: row.highlight ? "rgba(255,255,255,0.02)" : "transparent",
            }}
          >
            {/* Feature label */}
            <div
              className="px-6 py-4 flex items-center text-[13px] leading-[1.5]"
              style={{ color: row.highlight ? "var(--lc-text)" : "var(--lc-text-2)" }}
            >
              {row.highlight && (
                <span
                  className="mr-3 text-[9px] uppercase tracking-[0.1em] px-2 py-0.5 rounded-[3px] border border-[var(--lc-border-hover)] shrink-0"
                  style={{ color: "var(--lc-text)", background: "var(--lc-bg-3)" }}
                >
                  Key
                </span>
              )}
              {row.feature}
            </div>

            {/* Without cell */}
            <div
              className="px-4 py-4 flex items-center justify-center border-l border-[var(--lc-border)]"
            >
              {row.without ? (
                <Check size={15} style={{ color: "var(--lc-text-3)" }} />
              ) : (
                <X size={15} style={{ color: "var(--lc-danger)", opacity: 0.6 }} />
              )}
            </div>

            {/* With cell */}
            <div
              className="px-4 py-4 flex items-center justify-center border-l"
              style={{ borderColor: "var(--lc-border-hover)" }}
            >
              {row.with ? (
                <div className="flex items-center gap-1.5">
                  <Check size={15} style={{ color: "var(--lc-text)" }} />
                </div>
              ) : (
                <X size={15} style={{ color: "var(--lc-danger)", opacity: 0.5 }} />
              )}
            </div>
          </motion.div>
        ))}

        {/* CTA footer */}
        <div
          className="grid grid-cols-[1fr_120px_160px] border-t"
          style={{ borderColor: "var(--lc-border-hover)", background: "var(--lc-bg-2)" }}
        >
          <div className="px-6 py-5 flex items-center">
            <p className="text-[12px]" style={{ color: "var(--lc-text-3)" }}>
              Free to start.
            </p>
          </div>
          <div className="border-l border-[var(--lc-border)]" />
          <div
            className="px-4 py-4 flex items-center justify-center border-l"
            style={{ borderColor: "var(--lc-border-hover)" }}
          >
            <a
              href="/dashboard"
              className="lc-btn-primary !py-2 !px-4 !text-[12px] flex items-center gap-2"
            >
              Get started
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}