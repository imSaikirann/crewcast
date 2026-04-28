"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Settings, FileText, Link2, BarChart2, ArrowRight } from "lucide-react";

const steps = [
  {
    title: "Set up your domain",
    desc: "Configure your hiring domain and default form.",
    detail:
      "Set your company name, subdomain, and default fields like name, email, GitHub, and custom questions.",
    icon: Settings,
  },
  {
    title: "Create a role form",
    desc: "Define requirements and screening questions.",
    detail:
      "Add tech stack, seniority, and role-specific questions.",
    icon: FileText,
  },
  {
    title: "Share the link",
    desc: "Post anywhere. No login required.",
    detail:
      "Candidates apply directly. No CV uploads. No friction.",
    icon: Link2,
  },
  {
    title: "Review candidates",
    desc: "Get ranked applications instantly.",
    detail:
      "Each candidate comes scored with GitHub signals and insights.",
    icon: BarChart2,
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [active, setActive] = useState(0);

  return (
    <section className="lc-section" ref={ref}>
      {/* Header */}
      <motion.p
        className="lc-tag"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
      >
        How it works
      </motion.p>

      <motion.h2
        className="lc-h2"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
      >
        From job post to shortlist.
      </motion.h2>

      <motion.p className="lc-sub mb-12">
        Four steps. Clear workflow. No complexity.
      </motion.p>

      <div className="grid gap-8 lg:grid-cols-[360px_1fr]">

        {/* LEFT: Steps (no timeline rail, cleaner and stable) */}
        <div className="space-y-2">
          {steps.map((step, i) => {
            const isActive = i === active;
            const isDone = i < active;

            return (
              <div key={i}>
                <motion.button
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.05 }}
                  className="flex w-full items-start gap-3 rounded-lg p-4 text-left transition-all"
                  style={{
                    background: isActive ? "var(--lc-bg-2)" : "var(--lc-bg-1)",
                    border: isActive
                      ? "1px solid var(--lc-border-hover)"
                      : "1px solid var(--lc-border)",
                  }}
                >
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                    style={{
                      background:
                        isActive || isDone
                          ? "var(--lc-text)"
                          : "var(--lc-bg-3)",
                      color:
                        isActive || isDone
                          ? "var(--lc-bg)"
                          : "var(--lc-text-3)",
                      border: "1px solid var(--lc-border)",
                    }}
                  >
                    {isDone ? "✓" : i + 1}
                  </div>

                  <div className="min-w-0">
                    <p
                      className="text-sm font-semibold"
                      style={{
                        color: isActive
                          ? "var(--lc-text)"
                          : isDone
                          ? "var(--lc-text-2)"
                          : "var(--lc-text-3)",
                      }}
                    >
                      <span className="truncate">{step.title}</span>
                    </p>

                    <p className="text-xs mt-1 text-[var(--lc-text-3)]">
                      {step.desc}
                    </p>
                  </div>
                </motion.button>
              </div>
            );
          })}
        </div>

        {/* RIGHT: Detail */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="rounded-xl border p-6"
          style={{
            background: "var(--lc-bg-1)",
            borderColor: "var(--lc-border)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {/* Title */}
              <div className="flex items-center gap-3 mb-4">
                {(() => {
                  const Icon = steps[active].icon;
                  return <Icon size={18} />;
                })()}
                <h3 className="text-base font-bold text-[var(--lc-text)]">
                  {steps[active].title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm text-[var(--lc-text-2)] leading-relaxed">
                {steps[active].detail}
              </p>

              {/* CTA */}
              {active < steps.length - 1 && (
                <button
                  onClick={() => setActive(active + 1)}
                  className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all"
                  style={{
                    background: "var(--lc-accent)",
                    color: "var(--lc-accent-text)",
                  }}
                >
                  Continue
                  <ArrowRight size={14} />
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}