"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Settings, FileText, Link2, BarChart2 } from "lucide-react";

const steps = [
  {
    num: "01",
    Icon: Settings,
    title: "Set up your domain",
    desc: "Register your company hiring domain and configure default form fields once. Reuse across every role.",
    detail: "Takes under 2 minutes. Enter your company name, choose a subdomain, and set which fields appear on all your forms by default — name, email, GitHub, custom questions.",
    mock: (
      <div className="space-y-2.5">
        <div className="rounded-[6px] border border-[var(--lc-border)] px-3 py-2.5"
             style={{ background: "var(--lc-bg-3)" }}>
          <div className="text-[9px] uppercase tracking-[0.1em] mb-1" style={{ color: "var(--lc-text-3)" }}>Company domain</div>
          <div className="text-[13px] font-medium" style={{ color: "var(--lc-text)" }}>acme.crewcast.io</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {["Name","Email","GitHub URL","Custom question"].map(f => (
            <div key={f} className="rounded-[5px] border border-[var(--lc-border)] px-2.5 py-2"
                 style={{ background: "var(--lc-bg-3)" }}>
              <div className="text-[11px]" style={{ color: "var(--lc-text-2)" }}>{f}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 pt-1">
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--lc-success)" }} />
          <span className="text-[10px]" style={{ color: "var(--lc-text-3)" }}>Domain active</span>
        </div>
      </div>
    ),
  },
  {
    num: "02",
    Icon: FileText,
    title: "Build a role form",
    desc: "Add tech stack requirements, custom screening questions, and mark GitHub as required for software roles.",
    detail: "Each role gets its own form. Define required languages, seniority level, salary band visibility, and any role-specific screening questions. GitHub is automatically required for engineering roles.",
    mock: (
      <div className="space-y-2">
        <div className="rounded-[5px] border border-[var(--lc-border)] px-3 py-2.5"
             style={{ background: "var(--lc-bg-3)" }}>
          <div className="text-[9px] uppercase tracking-[0.1em] mb-1" style={{ color: "var(--lc-text-3)" }}>Role title</div>
          <div className="text-[13px] font-medium" style={{ color: "var(--lc-text)" }}>Senior Frontend Engineer</div>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {["TypeScript","React","Node.js"].map(t => (
            <span key={t} className="text-[10px] px-2 py-1 rounded-[4px] border border-[var(--lc-border)]"
                  style={{ color: "var(--lc-text-2)", background: "var(--lc-bg-3)" }}>
              {t}
            </span>
          ))}
        </div>
        <div className="rounded-[5px] border px-3 py-2 flex items-center justify-between"
             style={{ background: "rgba(255,255,255,0.03)", borderColor: "var(--lc-border-hover)" }}>
          <span className="text-[11px]" style={{ color: "var(--lc-text)" }}>GitHub URL</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded-[3px]"
                style={{ background: "rgba(255,255,255,0.08)", color: "var(--lc-text-2)" }}>Required</span>
        </div>
      </div>
    ),
  },
  {
    num: "03",
    Icon: Link2,
    title: "Share the public link",
    desc: "Every job gets a unique URL. Post it anywhere — no account needed for candidates to apply.",
    detail: "One link, zero friction. Candidates open it, fill in their details and GitHub handle, and submit. No login, no CV upload. Median completion time: 3 minutes.",
    mock: (
      <div className="space-y-3">
        <div className="rounded-[6px] border border-[var(--lc-border)] px-3 py-2.5 flex items-center justify-between"
             style={{ background: "var(--lc-bg-3)" }}>
          <span className="text-[11px]" style={{ color: "var(--lc-text-2)" }}>crewcast.io/apply/senior-fe</span>
          <span className="text-[9px] px-2 py-0.5 rounded-[3px] border border-[var(--lc-border)]"
                style={{ color: "var(--lc-text-3)" }}>Copy</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          {[["Job boards","Post"],["Slack","Share"],["Email","Send"]].map(([l,a]) => (
            <div key={l} className="rounded-[5px] border border-[var(--lc-border)] py-2.5"
                 style={{ background: "var(--lc-bg-3)" }}>
              <div className="text-[11px] font-medium" style={{ color: "var(--lc-text-2)" }}>{l}</div>
              <div className="text-[9px] mt-0.5" style={{ color: "var(--lc-text-3)" }}>{a}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--lc-success)" }} />
          <span className="text-[10px]" style={{ color: "var(--lc-text-3)" }}>No account required for candidates</span>
        </div>
      </div>
    ),
  },
  {
    num: "04",
    Icon: BarChart2,
    title: "Review scored candidates",
    desc: "Applications land ranked with GitHub signal breakdowns, language match %, and activity streaks.",
    detail: "Open your dashboard and every applicant already has a score. Filter by score, stack match, or activity streak. Click any candidate for the full GitHub breakdown before deciding who to interview.",
    mock: (
      <div className="space-y-2">
        {[
          { name: "Aditya Kumar", score: 91, match: "TS, React" },
          { name: "Priya Sharma", score: 78, match: "React, Go"  },
          { name: "Rahul Verma",  score: 62, match: "Node.js"    },
        ].map((c, i) => (
          <div key={c.name}
               className="flex items-center justify-between rounded-[5px] border border-[var(--lc-border)] px-3 py-2.5"
               style={{ background: i === 0 ? "rgba(255,255,255,0.04)" : "var(--lc-bg-3)" }}>
            <div>
              <div className="text-[12px] font-semibold" style={{ color: "var(--lc-text)" }}>{c.name}</div>
              <div className="text-[10px]" style={{ color: "var(--lc-text-3)" }}>{c.match}</div>
            </div>
            <span className="text-[13px] font-bold"
                  style={{ color: i === 0 ? "var(--lc-text)" : "var(--lc-text-2)" }}>
              {c.score}
            </span>
          </div>
        ))}
      </div>
    ),
  },
];

/* Pixel constants — keep in sync so line meets dot centers exactly */
const DOT_D    = 24;   /* dot diameter px          */
const PX_LEFT  = 16;   /* button px-4 = 16px       */
const PY_TOP   = 16;   /* button py-4 = 16px       */
const ROW_GAP  = 8;    /* space-y-2 = 8px          */
/* line x = PX_LEFT + DOT_D/2 = 28px from left edge of button */
/* line top = PY_TOP + DOT_D  = 40px (bottom of dot)          */
/* line height = ROW_GAP + PY_TOP = 24px (gap to next dot)    */

export function HowItWorks() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  return (
    <section id="how-it-works" className="lc-section" ref={ref}>

      <motion.p className="lc-tag" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
        How it works
      </motion.p>

      <motion.h2 className="lc-h2"
        initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.05 }}>
        From job post to ranked shortlist.
      </motion.h2>

      <motion.p className="lc-sub mb-14"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.1 }}>
        Four steps. No integration required. Live in under 10 minutes.
      </motion.p>

      <div className="grid lg:grid-cols-[400px_1fr] gap-8 items-start">

        {/* ── Step list ── */}
        <div className="flex flex-col" style={{ gap: `${ROW_GAP}px` }}>
          {steps.map((s, i) => {
            const isActive = active === i;
            const isDone   = i < active;
            const isLast   = i === steps.length - 1;

            return (
              /* Wrapper keeps the connector line scoped per row */
              <div key={s.num} className="relative">
                <motion.button
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.4 }}
                  className="relative w-full text-left flex items-start gap-4 rounded-[8px] transition-all duration-200 cursor-pointer"
                  style={{
                    padding:    `${PY_TOP}px ${PX_LEFT}px`,
                    background: isActive ? "var(--lc-bg-2)" : "transparent",
                    border:     isActive
                      ? "0.5px solid var(--lc-border-hover)"
                      : "0.5px solid transparent",
                  }}
                >
                  {/* Dot */}
                  <div
                    className="relative z-10 shrink-0 flex items-center justify-center rounded-full transition-all duration-200"
                    style={{
                      width:      `${DOT_D}px`,
                      height:     `${DOT_D}px`,
                      marginTop:  "1px",
                      background: isActive || isDone ? "var(--lc-text)" : "var(--lc-bg-3)",
                      border:     `1px solid ${isActive || isDone ? "var(--lc-text)" : "var(--lc-border)"}`,
                    }}
                  >
                    {isDone ? (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                           stroke="#080808" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    ) : (
                      <span className="text-[9px] font-bold leading-none"
                            style={{ color: isActive ? "#080808" : "var(--lc-text-3)" }}>
                        {i + 1}
                      </span>
                    )}
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-semibold leading-snug mb-1 transition-colors duration-150"
                         style={{
                           fontFamily: "var(--lc-sans)",
                           color: isActive ? "var(--lc-text)" : isDone ? "var(--lc-text-2)" : "var(--lc-text-3)",
                         }}>
                      {s.title}
                    </div>
                    <div className="text-[12px] leading-[1.6] transition-colors duration-150"
                         style={{ color: isActive ? "var(--lc-text-2)" : "var(--lc-text-3)" }}>
                      {s.desc}
                    </div>
                  </div>

                  {isActive && (
                    <svg className="shrink-0 mt-1" width="14" height="14" viewBox="0 0 24 24"
                         fill="none" stroke="currentColor" strokeWidth="2"
                         style={{ color: "var(--lc-text-3)" }}>
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  )}
                </motion.button>

                {/* Connector line between rows — drawn OUTSIDE the button so it's never clipped */}
                {!isLast && (
                  <div
                    aria-hidden="true"
                    style={{
                      position:   "absolute",
                      /* x: px-4 offset + half dot width */
                      left:       `${PX_LEFT + DOT_D / 2}px`,
                      /* y: py-top + dot height + 1px = just below dot bottom edge */
                      top:        `${PY_TOP + DOT_D + 1}px`,
                      /* height: covers the gap between this row's bottom and next row's dot */
                      height:     `${ROW_GAP + PY_TOP - 1}px`,
                      width:      "1px",
                      background: isDone ? "var(--lc-text)" : "var(--lc-border)",
                      transition: "background 0.3s ease",
                      zIndex:     0,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* ── Detail panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="sticky top-20 rounded-[8px] border border-[var(--lc-border)] overflow-hidden"
          style={{ background: "var(--lc-bg-1)" }}
        >
          {/* Titlebar */}
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-[var(--lc-border)]"
               style={{ background: "var(--lc-bg-2)" }}>
            <div className="w-7 h-7 rounded-[6px] border border-[var(--lc-border)] flex items-center justify-center shrink-0"
                 style={{ background: "var(--lc-bg-3)", color: "var(--lc-text-2)" }}>
              {(() => { const Icon = steps[active].Icon; return <Icon size={13} />; })()}
            </div>
            <div className="min-w-0">
              <div className="text-[9px] uppercase tracking-[0.12em] leading-none mb-0.5"
                   style={{ color: "var(--lc-text-3)" }}>
                Step {steps[active].num}
              </div>
              <div className="text-[13px] font-bold leading-snug"
                   style={{ color: "var(--lc-text)", fontFamily: "var(--lc-sans)" }}>
                {steps[active].title}
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="p-5 space-y-4"
            >
              <p className="text-[13px] leading-[1.75]" style={{ color: "var(--lc-text-2)" }}>
                {steps[active].detail}
              </p>

              <div className="rounded-[6px] border border-[var(--lc-border)] p-4"
                   style={{ background: "var(--lc-bg-2)" }}>
                {steps[active].mock}
              </div>

              {active < steps.length - 1 && (
                <button
                  onClick={() => setActive(active + 1)}
                  className="flex items-center gap-1.5 text-[11px] transition-colors duration-150 pt-1"
                  style={{ color: "var(--lc-text-3)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lc-text)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--lc-text-3)")}
                >
                  Next: {steps[active + 1].title}
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}