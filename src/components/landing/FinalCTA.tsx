"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section className="lc-section" style={{ paddingBottom: 120 }} ref={ref}>
      <motion.div
        className="relative overflow-hidden border border-[var(--lc-border)] rounded-2xl px-12 py-20 text-center"
        style={{ background: "var(--lc-bg-1)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[400px] h-[300px]"
             style={{ background: "radial-gradient(ellipse, rgba(173,250,29,0.07) 0%, transparent 70%)" }} />
        <div className="relative z-10">
          <p className="lc-tag justify-center mb-5">Free to start</p>
          <h2 className="lc-h2 mb-4">Create your first<br />hiring form today.</h2>
          <p className="lc-sub mx-auto mb-9">
            Set up your domain, publish a job form, and let Crewcast score GitHub evidence
            as applications arrive. No credit card required.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/dashboard" className="lc-btn-primary">
              Get started free <ArrowRight size={14} />
            </Link>
            <Link href="/jobs" className="lc-btn-ghost">Browse open jobs</Link>
          </div>
          <div className="mt-7 flex gap-6 justify-center flex-wrap">
            {["Free to start","Public GitHub data only","Live in under 10 minutes"].map((t) => (
              <span key={t} className="font-mono text-[11px] text-[var(--lc-text-3)] flex items-center gap-1.5">
                <span style={{ color: "var(--lc-accent)" }}>✓</span>{t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
