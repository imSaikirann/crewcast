"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ListChecks, Search, ShieldCheck } from "lucide-react";

const pillars = [
  {
    Icon: Search,
    title: "Proof of work beats keywords",
    desc: "We weigh OSS and real projects more than resume buzzwords. Signal over formatting.",
  },
  {
    Icon: Github,
    title: "GitHub-backed scoring",
    desc: "Every application gets a 0â€“100 score with a simple breakdown: activity, quality, OSS, and match.",
  },
  {
    Icon: ListChecks,
    title: "Clear status. Clear decisions.",
    desc: "Candidates see where they stand. Recruiters keep a clean pipeline. No mystery, no spreadsheets.",
  },
  {
    Icon: ShieldCheck,
    title: "Less spam. Better fit.",
    desc: "Candidates shouldnâ€™t file 1000+ applications to be seen. The right work rises faster.",
  },
];

export function WhyCrewcast() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="lc-section" style={{ paddingTop: 56 }} ref={ref}>
      <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 backdrop-blur-md"
        >
          <span className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981aa]" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
            Why Crewcast
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-balance font-extrabold leading-[1.05] tracking-[-0.04em] text-foreground"
          style={{ fontSize: "clamp(2rem, 5.5vw, 3.75rem)" }}
        >
          Hiring should reward{" "}
          <em className="font-light italic text-foreground/85">real work.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-muted-foreground"
        >
          Structured applications, GitHub insights, and a workflow that is fair to candidates and fast for recruiters.
        </motion.p>
      </div>

      <motion.p
        className="hidden"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
      >
        Why Crewcast
      </motion.p>

      <motion.h2
        className="hidden"
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.05 }}
      >
        Hiring should reward real work.
      </motion.h2>

      <motion.p
        className="hidden"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.1 }}
      >
        Crewcast is proof-of-work hiring: structured applications, GitHub insights, and a workflow thatâ€™s fair to candidates and fast for recruiters.
      </motion.p>

      <div className="grid gap-4 sm:grid-cols-2">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.12 + i * 0.06 }}
            className="rounded-[10px] border border-[var(--lc-border)] p-6"
            style={{ background: "var(--lc-bg-1)" }}
          >
            <div
              className="mb-4 grid size-10 place-items-center rounded-[10px] border border-[var(--lc-border)]"
              style={{ background: "var(--lc-bg-2)", color: "var(--lc-text-2)" }}
            >
              <p.Icon size={16} />
            </div>
            <p
              className="text-[14px] font-semibold"
              style={{ color: "var(--lc-text)", fontFamily: "var(--lc-sans)" }}
            >
              {p.title}
            </p>
            <p
              className="mt-2 text-[13px] leading-[1.75]"
              style={{ color: "var(--lc-text-2)" }}
            >
              {p.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

