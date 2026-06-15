"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  UserPlus,
  FileText,
  Share2,
  Sparkles,
  Check,
  ArrowRight,
  Mail,
  Github,
  Star,
  Link2,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────── */
/*  Steps — real copy                                       */
/* ──────────────────────────────────────────────────────── */
const steps = [
  {
    title: "Create your account",
    desc:  "Verify your work email, build your recruiter profile.",
    detail:
      "Sign up with Google, verify your company email, and set up your hiring profile in under 60 seconds. We use your domain to brand every form you publish.",
    icon: UserPlus,
    chips: ["Google sign-in", "Email verification", "Recruiter profile"],
  },
  {
    title: "Build your role form",
    desc:  "Define requirements & screening questions.",
    detail:
      "Pick a role template or start blank. Add tech stack, seniority, and custom questions. Candidates link their GitHub — we pull public signals automatically.",
    icon: FileText,
    chips: ["Role templates", "Custom questions", "GitHub auto-pull"],
  },
  {
    title: "Publish & share",
    desc:  "One link. Post anywhere. No friction.",
    detail:
      "Get a clean public link to share on LinkedIn, X, or your careers page. Candidates apply in 2 minutes — no login, no CV uploads, no spam.",
    icon: Share2,
    chips: ["Public link", "Embed widget", "QR code"],
  },
  {
    title: "Review your shortlist",
    desc:  "Ranked candidates with real signals.",
    detail:
      "Each applicant arrives scored. See commit activity, language fit, repo quality, and your custom answers — all in one view. Move from 200 applicants to top 10 in minutes.",
    icon: Sparkles,
    chips: ["AI scoring", "GitHub signals", "Side-by-side compare"],
  },
];

/* ──────────────────────────────────────────────────────── */
/*  Component                                               */
/* ──────────────────────────────────────────────────────── */
export function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  return (
    <section
      ref={ref}
      id="how-it-works"
      className="relative px-5 py-24 sm:px-6 sm:py-28 md:py-36"
    >
      {/* Header */}
      <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 backdrop-blur-md"
        >
          <span className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981aa]" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
            How it works
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-balance font-extrabold leading-[1.05] tracking-[-0.04em] text-foreground"
          style={{ fontSize: "clamp(2rem, 5.5vw, 3.75rem)" }}
        >
          From job post to{" "}
          <em className="font-light italic text-foreground/85">shortlist.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-muted-foreground"
        >
          Four steps. Zero friction. From signup to a ranked shortlist in a single afternoon.
        </motion.p>
      </div>

      {/* Body */}
      <div className="mx-auto grid max-w-[1100px] gap-6 lg:grid-cols-[380px_1fr] lg:gap-10">
        {/* LEFT: stepper */}
        <div className="relative">
          <div className="space-y-3">
            {steps.map((step, i) => {
              const isActive = i === active;
              const isDone = i < active;
              const hasConnector = i < steps.length - 1;
              return (
                <motion.button
                  key={i}
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  data-testid={`how-step-${i}`}
                  className={cn(
                    "group relative flex min-h-[72px] w-full items-start gap-4 rounded-lg p-3 text-left transition-all",
                    isActive
                      ? "bg-card ring-1 ring-border shadow-[0_14px_38px_rgba(0,0,0,0.16)]"
                      : "hover:bg-muted/40"
                  )}
                >
                  {hasConnector && (
                    <span
                      aria-hidden
                      className={cn(
                        "absolute left-[30px] top-[30px] z-0 h-[calc(100%+12px)] w-px transition-colors duration-300",
                        i < active ? "bg-foreground" : "bg-border"
                      )}
                    />
                  )}

                  {/* Number circle */}
                  <div
                    className={cn(
                      "relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border text-[12px] font-bold transition-all",
                      isActive &&
                        "border-foreground bg-foreground text-background shadow-[0_10px_24px_rgba(0,0,0,0.28)]",
                      isDone &&
                        "border-emerald-500/45 bg-background text-emerald-500 shadow-[0_0_0_5px_rgba(16,185,129,0.08)]",
                      !isActive &&
                        !isDone &&
                        "border-border bg-background text-muted-foreground"
                    )}
                  >
                    {isDone ? <Check className="size-4" /> : i + 1}
                  </div>

                  <div className="min-w-0 pt-1">
                    <p
                      className={cn(
                        "text-[13.5px] font-semibold transition-colors",
                        isActive
                          ? "text-foreground"
                          : isDone
                            ? "text-foreground/70"
                            : "text-foreground/50 group-hover:text-foreground/80"
                      )}
                    >
                      {step.title}
                    </p>
                    <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                      {step.desc}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* RIGHT: animated preview panel */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative overflow-hidden rounded-2xl border border-border bg-card"
        >
          {/* Dotted bg */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage:
                "radial-gradient(hsl(var(--foreground) / 0.12) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
              maskImage:
                "radial-gradient(ellipse 60% 60% at 50% 30%, var(--lc-bg) 30%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 60% 60% at 50% 30%, var(--lc-bg) 30%, transparent 80%)",
            }}
          />

          <div className="relative z-10 p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {/* Header */}
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-background">
                    {(() => {
                      const Icon = steps[active].icon;
                      return <Icon className="size-4 text-foreground" />;
                    })()}
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                      Step {active + 1} of {steps.length}
                    </p>
                    <h3 className="text-[17px] font-bold tracking-tight text-foreground">
                      {steps[active].title}
                    </h3>
                  </div>
                </div>

                {/* Detail */}
                <p className="text-[14px] leading-relaxed text-muted-foreground">
                  {steps[active].detail}
                </p>

                {/* Chips */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {steps[active].chips.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-border bg-background px-2.5 py-1 text-[11.5px] font-medium text-foreground/75"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                {/* Visual mock per step */}
                <div className="mt-6 rounded-lg border border-border bg-background/60 p-4 backdrop-blur-sm">
                  <StepPreview index={active} />
                </div>

                {/* Navigation */}
                <div className="mt-6 flex items-center justify-between">
                  <button
                    onClick={() => setActive((p) => Math.max(0, p - 1))}
                    disabled={active === 0}
                    className="text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
                  >
                    ← Back
                  </button>
                  {active < steps.length - 1 ? (
                    <button
                      onClick={() => setActive(active + 1)}
                      className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2 text-[12.5px] font-bold text-background transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                      Continue
                      <ArrowRight className="size-3.5" />
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-[12px] font-bold text-emerald-500">
                      <Check className="size-3.5" /> You're done
                    </span>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────── */
/*  Per-step mini preview                                   */
/* ──────────────────────────────────────────────────────── */
function StepPreview({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="space-y-2">
        <Row icon={<Mail className="size-3.5" />} label="you@company.com" badge="Verified" tone="emerald" />
        <Row icon={<UserPlus className="size-3.5" />} label="Recruiter · Acme Corp" badge="Saved" />
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="space-y-2">
        <Row label="Senior Backend Engineer" badge="Draft" />
        <Row label="Stack: Go · Postgres · Kafka" />
        <Row label="Custom: 'Ship a real-time bug'" />
      </div>
    );
  }
  if (index === 2) {
    return (
      <div className="space-y-2">
        <Row icon={<Link2 className="size-3.5" />} label="crewcast.co/r/acme-backend" badge="Live" tone="emerald" />
        <Row label="Shared on LinkedIn · X · Careers page" />
      </div>
    );
  }
  return (
    <div className="space-y-2">
      <Row icon={<Github className="size-3.5" />} label="@octocat — 247 commits, Go fit 92%" badge="Top match" tone="emerald" />
      <Row icon={<Star className="size-3.5" />} label="@dev-rey — strong tests, ships weekly" />
      <Row icon={<Star className="size-3.5" />} label="@kira-codes — clean refactors" />
    </div>
  );
}

function Row({
  icon,
  label,
  badge,
  tone,
}: {
  icon?: React.ReactNode;
  label: string;
  badge?: string;
  tone?: "emerald";
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-border/70 bg-background px-3 py-2">
      <div className="flex min-w-0 items-center gap-2 text-[12px] text-foreground/80">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <span className="truncate">{label}</span>
      </div>
      {badge && (
        <span
          className={cn(
            "shrink-0 rounded-full border px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider",
            tone === "emerald"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
              : "border-border bg-muted text-muted-foreground"
          )}
        >
          {badge}
        </span>
      )}
    </div>
  );
}
