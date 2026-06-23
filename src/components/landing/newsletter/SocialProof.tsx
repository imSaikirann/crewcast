"use client";

import { motion, type Variants } from "framer-motion";
import {
  DevtoolIcon,
  FounderFlagIcon,
  RemoteGlobeIcon,
  RocketIcon,
  SeedlingIcon,
  TalentSearchIcon,
} from "./icons";

const readers = [
  { name: "Seed teams", icon: SeedlingIcon },
  { name: "Founder-led hiring", icon: FounderFlagIcon },
  { name: "First recruiters", icon: TalentSearchIcon },
  { name: "Devtool startups", icon: DevtoolIcon },
  { name: "Remote teams", icon: RemoteGlobeIcon },
  { name: "YC-style companies", icon: RocketIcon },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export function SocialProof() {
  return (
    <section className="w-full border-y border-border bg-muted/60">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-border" aria-hidden="true" />
          <p className="font-sora text-center text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Built for startup hiring
          </p>
          <span className="h-px w-8 bg-border" aria-hidden="true" />
        </div>

        <motion.div
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {readers.map(({ name, icon: Icon }) => (
            <motion.div
              key={name}
              variants={item}
              className="group flex h-18 items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 text-center transition-colors duration-150 hover:border-[var(--border-strong)] hover:bg-muted/40"
            >
              <Icon
                size={18}
                className="shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-emerald-600"
              />
              <span className="font-heading text-sm font-semibold leading-snug tracking-tight text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
                {name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <p className="font-sora mx-auto mt-8 max-w-xl text-center text-[15px] leading-7 text-muted-foreground">
          Turn a flood of applicants into a proof-backed shortlist before your
          next standup.
        </p>
      </div>
    </section>
  );
}


