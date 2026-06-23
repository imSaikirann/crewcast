"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight, Briefcase, Lock, Zap } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";


export function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-5 py-24 sm:px-6 sm:py-32 md:py-40"
    >
      {/* â”€â”€ Background: subtle grid + radial glow â”€â”€ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground) / 0.04) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, var(--lc-bg) 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, var(--lc-bg) 30%, transparent 80%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--foreground) / 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 backdrop-blur-md"
        >
          <span className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981aa]" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
            Start with one role
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          className="text-balance font-extrabold leading-[1.02] tracking-[-0.04em] text-foreground"
          style={{ fontSize: "clamp(2rem, 6vw, 4.25rem)" }}
        >
          Turn your next opening into a{" "}
          <em className="font-light italic text-foreground/85">scored shortlist.</em>
        </motion.h2>

     

  

      </div>
    </section>
  );
}

