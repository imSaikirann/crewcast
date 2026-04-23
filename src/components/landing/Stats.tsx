// ─── StatsBar.tsx ───────────────────────────────────────────────────────────
"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  BarChart2,
  FileText,
  FileText as FT,
  Github,
  LayoutGrid,
  Link2,
  Settings,
  Shield,
  TrendingUp,
} from "lucide-react";

const stats = [
  { val: "0–100", label: "Scored on every submission"      },
  { val: "4",     label: "Signal dimensions measured"      },
  { val: "<5m",   label: "Candidate application time"      },
  { val: "Public",label: "GitHub data only — no scraping"  },
];

export function StatsBar() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className="max-w-[1100px] mx-auto px-6">
      <div
        ref={ref}
        className="grid grid-cols-2 md:grid-cols-4 overflow-hidden rounded-[8px] border border-[var(--lc-border)]"
        style={{ background: "var(--lc-border)" }}
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.07 }}
            className="flex flex-col items-center justify-center py-7 text-center"
            style={{ background: "var(--lc-bg-1)" }}
          >
            <div
              className="text-[28px] font-semibold leading-none mb-1.5"
              style={{ color: "var(--lc-text)", fontFamily: "var(--lc-sans)" }}
            >
              {s.val}
            </div>
            <div className="text-[12px]" style={{ color: "var(--lc-text-3)" }}>
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


// ─── HowItWorks.tsx ─────────────────────────────────────────────────────────
const steps = [
  {
    num: "01",
    Icon: Settings,
    title: "Set up your domain",
    desc: "Register your company hiring domain and configure default form fields once. Reuse across every role.",
  },
  {
    num: "02",
    Icon: FileText,
    title: "Build a role form",
    desc: "Add tech stack requirements, custom screening questions, and mark GitHub as required for software roles.",
  },
  {
    num: "03",
    Icon: Link2,
    title: "Share the public link",
    desc: "Every job gets a unique URL. Post it anywhere — no account needed for candidates to apply.",
  },
  {
    num: "04",
    Icon: BarChart2,
    title: "Review scored candidates",
    desc: "Applications land ranked with GitHub signal breakdowns, language match %, and activity streaks.",
  },
];

export function HowItWorks() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="how-it-works" className="lc-section" ref={ref}>
      <motion.p
        className="lc-tag"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
      >
        How it works
      </motion.p>

      <motion.h2
        className="lc-h2"
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.05 }}
      >
        From job post to ranked shortlist.
      </motion.h2>

      <motion.p
        className="lc-sub mb-14"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.1 }}
      >
        Four steps. No integration required. Live in under 10 minutes.
      </motion.p>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 overflow-hidden rounded-[8px] border border-[var(--lc-border)]"
        style={{ background: "var(--lc-border)" }}
      >
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 + i * 0.08 }}
            className="group p-7 transition-colors duration-150"
            style={{ background: "var(--lc-bg-1)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--lc-bg-2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--lc-bg-1)")}
          >
            <div
              className="text-[11px] font-medium mb-5"
              style={{ color: "var(--lc-text-3)" }}
            >
              {s.num}
            </div>
            <div
              className="w-8 h-8 rounded-[6px] border border-[var(--lc-border)] flex items-center justify-center mb-4"
              style={{ background: "var(--lc-bg-2)", color: "var(--lc-text-2)" }}
            >
              <s.Icon size={14} />
            </div>
            <div
              className="text-[13px] font-semibold mb-2"
              style={{ color: "var(--lc-text)", fontFamily: "var(--lc-sans)" }}
            >
              {s.title}
            </div>
            <div
              className="text-[12px] leading-[1.65]"
              style={{ color: "var(--lc-text-2)" }}
            >
              {s.desc}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


// ─── Features.tsx ────────────────────────────────────────────────────────────
const features = [
  {
    id: "dashboard",
    Icon: LayoutGrid,
    title: "Recruiter dashboard",
    desc: "All jobs, applications, and candidate scores in one place. No context switching.",
    preview: (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {[
            ["24",  "Total applicants"],
            ["3",   "Active jobs"     ],
            ["68%", "GitHub provided" ],
            ["76",  "Avg score"       ],
          ].map(([v, l]) => (
            <div
              key={l}
              className="rounded-[6px] border border-[var(--lc-border)] p-3"
              style={{ background: "var(--lc-bg-2)" }}
            >
              <div
                className="text-[20px] font-semibold leading-none"
                style={{ color: "var(--lc-text)" }}
              >
                {v}
              </div>
              <div className="text-[10px] mt-1" style={{ color: "var(--lc-text-3)" }}>
                {l}
              </div>
            </div>
          ))}
        </div>
        <div
          className="border border-[var(--lc-border)] rounded-[6px] p-3"
          style={{ background: "var(--lc-bg-2)" }}
        >
          <div
            className="text-[9px] font-semibold uppercase mb-2"
            style={{ color: "var(--lc-text-3)" }}
          >
            Recent activity
          </div>
          {[
            "Aditya Kumar applied · score 91 · 2m ago",
            "Backend Intern job published · 1h ago",
            "Frontend form scored 24 applicants · 3h ago",
          ].map((a) => (
            <div
              key={a}
              className="text-[11px] py-1.5 border-b border-[var(--lc-border)] last:border-0"
              style={{ color: "var(--lc-text-2)" }}
            >
              {a}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "scoring",
    Icon: Github,
    title: "GitHub signal scoring",
    desc: "Repos, language match, activity, account age, OSS contributions — scored automatically on submit.",
    preview: (
      <div className="space-y-3">
        <div
          className="text-[9px] font-semibold uppercase mb-3"
          style={{ color: "var(--lc-text-3)" }}
        >
          Score breakdown · github.com/adityak
        </div>
        {[
          ["Repositories",    91],
          ["Language match",  84],
          ["Activity streak", 76],
          ["Profile maturity",88],
        ].map(([l, p]) => (
          <div key={l as string} className="space-y-1">
            <div className="flex justify-between">
              <span className="text-[11px]" style={{ color: "var(--lc-text-2)" }}>{l}</span>
              <span className="text-[11px] font-medium" style={{ color: "var(--lc-text-2)" }}>{p}</span>
            </div>
            <div className="h-[2px] rounded-full" style={{ background: "var(--lc-bg-3)" }}>
              <div
                className="h-[2px] rounded-full"
                style={{ width: `${p}%`, background: "var(--lc-text-2)" }}
              />
            </div>
          </div>
        ))}
        <div
          className="flex items-center justify-between px-3 py-2.5 rounded-[6px] border mt-4"
          style={{ background: "var(--lc-bg-2)", borderColor: "var(--lc-border)" }}
        >
          <span className="text-[12px]" style={{ color: "var(--lc-text-2)" }}>Final score</span>
          <span
            className="text-[28px] font-semibold leading-none"
            style={{ color: "var(--lc-text)" }}
          >
            91
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "forms",
    Icon: FT,
    title: "Role-specific forms",
    desc: "Custom questions, tech stack fields, salary range, and GitHub — all in one clean candidate flow.",
    preview: (
      <div
        className="border border-[var(--lc-border)] rounded-[6px] overflow-hidden"
      >
        <div
          className="px-3 py-2 border-b border-[var(--lc-border)] text-[10px] font-medium"
          style={{ background: "var(--lc-bg-2)", color: "var(--lc-text-3)" }}
        >
          Frontend Engineer — Application
        </div>
        <div className="p-4 space-y-3">
          {[
            ["Full name *",      "Enter your full name"],
            ["Email address *",  "your@email.com"      ],
          ].map(([l, p]) => (
            <div key={l}>
              <div className="text-[10px] mb-1" style={{ color: "var(--lc-text-3)" }}>{l}</div>
              <div
                className="border border-[var(--lc-border)] rounded-[4px] px-2.5 py-2 text-[11px]"
                style={{ color: "var(--lc-text-2)" }}
              >
                {p}
              </div>
            </div>
          ))}
          <div>
            <div className="text-[10px] mb-1 flex items-center gap-1" style={{ color: "var(--lc-text-3)" }}>
              GitHub profile URL
              <span style={{ color: "var(--lc-danger)" }}>* required</span>
            </div>
            <div
              className="border rounded-[4px] px-2.5 py-2 text-[11px]"
              style={{
                background:   "var(--lc-bg-2)",
                borderColor:  "var(--lc-border-hover)",
                color:        "var(--lc-text-2)",
              }}
            >
              github.com/your-username
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "analytics",
    Icon: TrendingUp,
    title: "Analytics & reporting",
    desc: "Views, conversion rates, form quality scores, and recruiter activity tracked over time.",
    preview: (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {[
            ["312", "Form views"  ],
            ["24",  "Applications"],
            ["7.7%","Conversion"  ],
            ["5m",  "Avg review"  ],
          ].map(([v, l]) => (
            <div
              key={l}
              className="rounded-[6px] border border-[var(--lc-border)] p-3"
              style={{ background: "var(--lc-bg-2)" }}
            >
              <div
                className="text-[20px] font-semibold leading-none"
                style={{ color: "var(--lc-text)" }}
              >
                {v}
              </div>
              <div className="text-[10px] mt-1" style={{ color: "var(--lc-text-3)" }}>{l}</div>
            </div>
          ))}
        </div>
        <div
          className="border border-[var(--lc-border)] rounded-[6px] p-3"
          style={{ background: "var(--lc-bg-2)" }}
        >
          <div
            className="text-[9px] font-semibold uppercase mb-2"
            style={{ color: "var(--lc-text-3)" }}
          >
            Score distribution
          </div>
          <div className="flex items-end gap-0.5 h-10">
            {[20, 40, 80, 100, 60, 30, 15].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm"
                style={{
                  height:     `${h}%`,
                  background: h >= 60 ? "rgba(255,255,255,0.18)" : "var(--lc-bg-3)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "admin",
    Icon: Shield,
    title: "Admin domain control",
    desc: "Manage hiring domains, recruiter access roles, default form settings, and platform-wide permissions.",
    preview: (
      <div className="space-y-2">
        {[
          ["Domain",         "filtrank.in",              "Active",        "hi" ],
          ["Team",           "3 recruiters · 2 admins",  "Manage →",      "lo" ],
          ["Default fields", "Name, email, GitHub",      "Edit →",        "lo" ],
          ["Access control", "Role-based permissions",   "Configure →",   "lo" ],
        ].map(([l, v, a, t]) => (
          <div
            key={l as string}
            className="flex items-center justify-between border border-[var(--lc-border)] rounded-[6px] px-3 py-2.5"
            style={{ background: "var(--lc-bg-2)" }}
          >
            <div>
              <div className="text-[10px]" style={{ color: "var(--lc-text-3)" }}>{l}</div>
              <div className="text-[12px] mt-0.5" style={{ color: "var(--lc-text-2)" }}>{v}</div>
            </div>
            <span
              className="text-[10px] font-medium px-2 py-0.5 rounded-[3px]"
              style={
                t === "hi"
                  ? { background: "rgba(255,255,255,0.08)", color: "var(--lc-text)" }
                  : { color: "var(--lc-text-3)" }
              }
            >
              {a}
            </span>
          </div>
        ))}
      </div>
    ),
  },
];

export function Features() {
  const [active, setActive] = useState("dashboard");
  const current = features.find((f) => f.id === active)!;
  const ref     = useRef(null);
  const inView  = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="features" className="lc-section" ref={ref} style={{ paddingTop: 0 }}>
      <motion.p
        className="lc-tag"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
      >
        Platform
      </motion.p>

      <motion.h2
        className="lc-h2 mb-14"
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.05 }}
      >
        Everything a hiring team<br />needs. Nothing else.
      </motion.h2>

      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-start">

        {/* Feature list */}
        <div
          className="overflow-hidden rounded-[8px] border border-[var(--lc-border)]"
          style={{ background: "var(--lc-border)" }}
        >
          {features.map((f, i) => (
            <motion.button
              key={f.id}
              onClick={() => setActive(f.id)}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="w-full text-left flex gap-4 p-5 transition-all duration-150 border-l-2 cursor-pointer"
              style={{
                background:      active === f.id ? "var(--lc-bg-2)" : "var(--lc-bg-1)",
                borderLeftColor: active === f.id ? "var(--lc-text)" : "transparent",
              }}
            >
              <div
                className="w-8 h-8 rounded-[6px] border flex items-center justify-center flex-shrink-0 transition-colors"
                style={{
                  background:  active === f.id ? "var(--lc-bg-3)"          : "var(--lc-bg-3)",
                  borderColor: active === f.id ? "var(--lc-border-hover)"  : "var(--lc-border)",
                  color:       active === f.id ? "var(--lc-text)"          : "var(--lc-text-2)",
                }}
              >
                <f.Icon size={14} />
              </div>
              <div>
                <div
                  className="text-[13px] font-semibold mb-1"
                  style={{ color: "var(--lc-text)", fontFamily: "var(--lc-sans)" }}
                >
                  {f.title}
                </div>
                <div className="text-[12px] leading-[1.6]" style={{ color: "var(--lc-text-2)" }}>
                  {f.desc}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Preview panel */}
        <div
          className="sticky top-20 rounded-[8px] border border-[var(--lc-border)] overflow-hidden"
          style={{ background: "var(--lc-bg-1)" }}
        >
          <div
            className="flex items-center gap-2 px-4 py-3 border-b border-[var(--lc-border)] text-[11px] font-medium"
            style={{ background: "var(--lc-bg-2)", color: "var(--lc-text-3)" }}
          >
            <current.Icon size={12} style={{ color: "var(--lc-text-2)" }} />
            {current.title}
          </div>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="p-5"
          >
            {current.preview}
          </motion.div>
        </div>
      </div>
    </section>
  );
}


// ─── Comparison.tsx ──────────────────────────────────────────────────────────
export function Comparison() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="lc-section" style={{ paddingTop: 0 }} ref={ref}>
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
        className="lc-sub mb-12"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.1 }}
      >
        Crewcast doesn't replace recruiter judgment — it gives it a foundation of
        real engineering evidence from day one.
      </motion.p>

      <div className="grid md:grid-cols-2 gap-4">

        {/* Without */}
        <motion.div
          className="border border-[var(--lc-border)] rounded-[8px] p-7"
          style={{ background: "var(--lc-bg-1)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
        >
          <div
            className="text-[11px] font-semibold uppercase mb-5"
            style={{ color: "var(--lc-danger)" }}
          >
            Without Crewcast
          </div>
          {[
            "Hundreds of applications with no technical context",
            "Resume keywords decide who makes it to round one",
            "Manual GitHub checks for maybe 5% of candidates",
            "Hours wasted interviewing unqualified engineers",
          ].map((t) => (
            <div
              key={t}
              className="flex items-start gap-3 py-2 border-b border-[var(--lc-border)] last:border-0"
            >
              <span
                className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "var(--lc-danger)", opacity: 0.5 }}
              />
              <span className="text-[13px] leading-[1.5]" style={{ color: "var(--lc-text-2)" }}>
                {t}
              </span>
            </div>
          ))}
        </motion.div>

        {/* With — white bordered highlight, no green */}
        <motion.div
          className="border rounded-[8px] p-7"
          style={{
            background:   "var(--lc-bg-2)",
            borderColor:  "var(--lc-border-hover)",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.22 }}
        >
          <div
            className="text-[11px] font-semibold uppercase mb-5"
            style={{ color: "var(--lc-text)" }}
          >
            With Crewcast
          </div>
          {[
            "Every application has a GitHub score on arrival",
            "Ranked table shows who has public work to review",
            "Score based on real repos, not claimed experience",
            "Shortlist in minutes — your judgment, better data",
          ].map((t) => (
            <div
              key={t}
              className="flex items-start gap-3 py-2 border-b border-[var(--lc-border)] last:border-0"
            >
              <span
                className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "var(--lc-text)", opacity: 0.6 }}
              />
              <span className="text-[13px] leading-[1.5]" style={{ color: "var(--lc-text-2)" }}>
                {t}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
