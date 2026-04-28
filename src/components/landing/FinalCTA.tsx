"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { HugeIcon, type HugeIconName } from "@/utils/hugeicons";

const trustPoints: { label: string; icon: HugeIconName }[] = [
  { label: "Launch a role in minutes", icon: "briefcase" },
  { label: "Public GitHub signals only", icon: "lock" },
  { label: "No integrations required", icon: "time-quarter-pass" },
];

export function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="lc-section" style={{ paddingBottom: 120 }} ref={ref}>
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-[var(--lc-border)] px-8 py-16 text-center sm:px-12 sm:py-20"
        style={{ background: "var(--lc-bg-1)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-[300px] w-[400px] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 72%)",
          }}
        />
        <div className="relative z-10">
          <p className="lc-tag mb-5 justify-center">Start with one role</p>
          <h2 className="lc-h2 mx-auto mb-4 max-w-3xl">
            Turn your next opening into a scored shortlist.
          </h2>
          <p className="lc-sub mx-auto mb-9">
            Build a simple form. Collect structured applications. Review real work.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/dashboard" className="lc-btn-primary font-sans text-sm">
              Create a hiring form <HugeIcon name="arrow-right" className="size-4" />
            </Link>
            <Link href="/jobs" className="lc-btn-ghost font-sans text-sm">
              View open roles
            </Link>
          </div>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            {trustPoints.map((item) => (
              <span
                key={item.label}
                className="flex items-center gap-2 rounded-lg border border-[var(--lc-border)] px-3 py-2 text-xs font-medium text-[var(--lc-text-2)]"
              >
                <HugeIcon name={item.icon} className="size-4 text-[var(--lc-accent)]" />
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
