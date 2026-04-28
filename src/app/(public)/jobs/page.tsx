
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Job } from "@/features/jobs/types/job";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight,
  BadgeCheck,
  Bookmark,
  Briefcase,
  CalendarClock,
  Eye,
  Filter,
  Globe2,
  Hourglass,
  MapPin,
  RotateCcw,
  Search,
  Share2,
  Sparkles,
  Users,
  Wallet,
  X,
} from "lucide-react";

type SortKey = "newest" | "expiring" | "popular";

const WORK_MODES = ["ALL", "REMOTE", "HYBRID", "ONSITE"] as const;
const ROLE_TYPES = ["ALL", "FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"] as const;
const EXPERIENCES = ["ALL", "JUNIOR", "MID", "SENIOR", "LEAD"] as const;

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [workMode, setWorkMode] = useState<(typeof WORK_MODES)[number]>("ALL");
  const [roleType, setRoleType] = useState<(typeof ROLE_TYPES)[number]>("ALL");
  const [experience, setExperience] = useState<(typeof EXPERIENCES)[number]>("ALL");
  const [sort, setSort] = useState<SortKey>("newest");
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadJobs() {
      try {
        setLoading(true);
        setLoadError(null);
        const response = await fetch("/api/jobs", { cache: "no-store" });
        if (!response.ok) throw new Error("Unable to load open roles.");
        const payload = await response.json();
        if (!cancelled) setJobs(Array.isArray(payload) ? payload : []);
      } catch (error) {
        if (!cancelled) {
          setLoadError(
            error instanceof Error ? error.message : "Unable to load open roles."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadJobs();

    return () => {
      cancelled = true;
    };
  }, []);

  const activeCount =
    (workMode !== "ALL" ? 1 : 0) +
    (roleType !== "ALL" ? 1 : 0) +
    (experience !== "ALL" ? 1 : 0) +
    (sort !== "newest" ? 1 : 0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = jobs && jobs.filter((j) => {
      if (workMode !== "ALL" && j.workMode !== workMode) return false;
      if (roleType !== "ALL" && j.roleType !== roleType) return false;
      if (experience !== "ALL" && j.experience !== experience) return false;
      if (!q) return true;
      const hay =
        `${j.title} ${j.companyName ?? ""} ${j.location ?? ""} ${
          j.domainTitle ?? ""
        } ${(j.techStack ?? []).join(" ")}`.toLowerCase();
      return hay.includes(q);
    });

    if (sort === "newest") {
      list = list && [...list].sort(
        (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
      );
    } else if (sort === "expiring") {
      list = [...list].sort(
        (a, b) => +new Date(a.expiresAt) - +new Date(b.expiresAt)
      );
    } else {
      list = [...list].sort(
        (a, b) =>
          (b.applicationsCount ?? 0) + (b.viewCount ?? 0) - 
          ((a.applicationsCount ?? 0) + (a.viewCount ?? 0))
      );
    }
    return list;
  }, [jobs, query, workMode, roleType, experience, sort]);

  const reset = () => {
    setQuery("");
    setWorkMode("ALL");
    setRoleType("ALL");
    setExperience("ALL");
    setSort("newest");
  };

  return (
    <main className="min-h-screen bg-background px-4 py-20 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="grid gap-6 border-b pb-7 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 backdrop-blur-md">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981aa]" />
              </span>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                Open engineering roles
              </span>
            </div>
            <h1 className="text-balance text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl">
              Find roles ranked by{" "}
              <em className="font-light italic text-foreground/85">real signals.</em>
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[15px]">
              Browse active Crewcast openings from verified hiring teams. Filter by stack,
              work mode, seniority, and role type.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 rounded-md border bg-card p-4 shadow-xs">
            <Stat label="Roles" value={jobs.length} />
            <Stat
              label="Remote"
              value={jobs.filter((job) => job.workMode === "REMOTE").length}
            />
            <Stat
              label="Companies"
              value={new Set(jobs.map((job) => job.companyName).filter(Boolean)).size}
            />
          </div>
        </section>

        {loadError ? (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            {loadError}
          </div>
        ) : null}

        {loading ? (
          <JobsSkeleton />
        ) : (
    <div className="space-y-6">
      {/* TOOLBAR */}
      <div
        data-testid="jobs-toolbar"
        className="rounded-md border border-border/70 bg-card/60 p-2 shadow-xs backdrop-blur-md"
      >
        <div className="flex items-center gap-2">
          {/* Search — always visible */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              data-testid="jobs-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search role, company, stack…"
              className="h-10 rounded-md border-border/60 bg-background/60 pl-9 pr-9 backdrop-blur"
            />
            {query ? (
              <button
                data-testid="jobs-search-clear"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-md text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            ) : null}
          </div>

          {/* Mobile: single Filters trigger */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                data-testid="jobs-filters-trigger"
                variant="outline"
                className="relative h-10 gap-2 rounded-md border-border/70 bg-background/60 px-3 backdrop-blur lg:hidden"
              >
                <Filter className="size-4" />
                <span className="text-sm">Filters</span>
                {activeCount > 0 ? (
                  <span
                    data-testid="jobs-filters-active-count"
                    className="ml-0.5 grid size-5 place-items-center rounded-md bg-primary text-[10px] font-semibold text-primary-foreground"
                  >
                    {activeCount}
                  </span>
                ) : null}
              </Button>
            </SheetTrigger>

            <SheetContent
              side="bottom"
              className="rounded-t-md border-border/70 bg-card/95 backdrop-blur-xl"
            >
              <SheetHeader className="text-left">
                <SheetTitle className="flex items-center gap-2 font-display">
                  <Filter className="size-4 text-primary" />
                  Filters
                </SheetTitle>
                <SheetDescription>
                  Narrow down roles by mode, type, experience, and order.
                </SheetDescription>
              </SheetHeader>

              <div className="grid gap-4 py-4">
                <FilterField label="Work mode" icon={Globe2}>
                  <FilterSelect
                    testId="filter-workmode-mobile"
                    value={workMode}
                    onChange={(v) => setWorkMode(v as typeof workMode)}
                    options={WORK_MODES}
                  />
                </FilterField>
                <FilterField label="Role type" icon={Briefcase}>
                  <FilterSelect
                    testId="filter-roletype-mobile"
                    value={roleType}
                    onChange={(v) => setRoleType(v as typeof roleType)}
                    options={ROLE_TYPES}
                  />
                </FilterField>
                <FilterField label="Experience" icon={Hourglass}>
                  <FilterSelect
                    testId="filter-experience-mobile"
                    value={experience}
                    onChange={(v) => setExperience(v as typeof experience)}
                    options={EXPERIENCES}
                  />
                </FilterField>
                <FilterField label="Sort" icon={Sparkles}>
                  <SortSegmented
                    testId="filter-sort-mobile"
                    value={sort}
                    onChange={setSort}
                  />
                </FilterField>
              </div>

              <SheetFooter className="flex-row gap-2 sm:justify-between">
                <Button
                  data-testid="jobs-filters-reset-mobile"
                  variant="ghost"
                  onClick={reset}
                  className="gap-2 rounded-md"
                >
                  <RotateCcw className="size-4" />
                  Reset
                </Button>
                <Button
                  data-testid="jobs-filters-apply-mobile"
                  onClick={() => setSheetOpen(false)}
                  className="gap-2 rounded-md"
                >
                  Show {filtered && filtered.length} results
                  <ArrowUpRight className="size-4" />
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {/* Desktop inline filters */}
          <div className="hidden items-center gap-2 lg:flex">
            <FilterSelect
              testId="filter-workmode"
              value={workMode}
              onChange={(v) => setWorkMode(v as typeof workMode)}
              options={WORK_MODES}
              compact
              icon={Globe2}
            />
            <FilterSelect
              testId="filter-roletype"
              value={roleType}
              onChange={(v) => setRoleType(v as typeof roleType)}
              options={ROLE_TYPES}
              compact
              icon={Briefcase}
            />
            <FilterSelect
              testId="filter-experience"
              value={experience}
              onChange={(v) => setExperience(v as typeof experience)}
              options={EXPERIENCES}
              compact
              icon={Hourglass}
            />
            <SortSegmented
              testId="filter-sort"
              value={sort}
              onChange={setSort}
            />
            {activeCount > 0 || query ? (
              <Button
                data-testid="jobs-filters-reset"
                variant="ghost"
                size="sm"
                onClick={reset}
                className="h-10 gap-1.5 rounded-md text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="size-3.5" />
                Reset
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      {/* RESULTS META */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span data-testid="jobs-results-count">
          <span className="font-semibold text-foreground tabular-nums">
            {filtered && filtered.length}
          </span>{" "}
          of {jobs && jobs.length} roles
        </span>
        <span className="hidden items-center gap-1.5 sm:flex">
          <span className="size-1 rounded-full bg-emerald-500" />
          Updated just now
        </span>
      </div>

      {/* GRID */}
      {filtered && filtered.length === 0 ? (
        <EmptyState onReset={reset} />
      ) : (
        <ul
          data-testid="jobs-grid"
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {filtered && filtered.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </ul>
      )}
    </div>
        )}
      </div>
    </main>
  );
}

/* ---------------- Subcomponents ---------------- */

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="min-w-0">
      <div className="text-2xl font-semibold tabular-nums tracking-tight">
        {value}
      </div>
      <div className="mt-1 truncate text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function JobsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-[58px] animate-pulse rounded-md border bg-card/60" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-64 animate-pulse rounded-md border bg-card/60"
          />
        ))}
      </div>
    </div>
  );
}

function JobCard({ job }: { job: Job }) {
  const days = daysUntil(job.expiresAt);
  const urgent = days <= 3;

  return (
    <li
      data-testid={`job-card-${job.publicId}`}
      className="group relative isolate overflow-hidden rounded-md"
    >
      {/* Hairline gradient border */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-md bg-gradient-to-br from-border/80 via-border/40 to-border/80 p-px transition group-hover:from-primary/40 group-hover:via-border/40 group-hover:to-primary/30"
      >
        <div className="size-full rounded-[5px] bg-card/70 backdrop-blur-md" />
      </div>

      {/* Inner top sheen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
      />

      {/* Hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px -z-0 rounded-md opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--x,50%) var(--y,0%), hsl(var(--primary)/0.08), transparent 60%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col gap-4 p-5 transition group-hover:-translate-y-0.5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="grid size-9 shrink-0 place-items-center rounded-md border border-border/70 bg-background/60 font-display text-sm font-semibold uppercase backdrop-blur">
              {(job.companyName ?? "·").slice(0, 1)}
            </div>
            <div className="min-w-0">
              <p className="flex items-center gap-1 truncate text-sm font-medium">
                <span className="truncate">{job.companyName ?? "Private"}</span>
                {job.companyVerified ? (
                  <BadgeCheck
                    className="size-3.5 shrink-0 text-primary"
                    aria-label="Verified"
                  />
                ) : null}
              </p>
              <p className="truncate text-[11px] uppercase tracking-wider text-muted-foreground">
                {job.domainTitle ?? "Software"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <IconGhost label="Save" testId={`job-save-${job.publicId}`}>
              <Bookmark className="size-3.5" />
            </IconGhost>
            <IconGhost label="Share" testId={`job-share-${job.publicId}`}>
              <Share2 className="size-3.5" />
            </IconGhost>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-lg font-semibold leading-snug tracking-tight">
          {job.title}
        </h3>

        {/* Meta row */}
        <div className="flex flex-wrap gap-1.5">
          <MetaChip icon={Globe2}>{prettify(job.workMode)}</MetaChip>
          <MetaChip icon={MapPin}>{job.location ?? "Anywhere"}</MetaChip>
          <MetaChip icon={Hourglass}>{prettify(job.experience)}</MetaChip>
          {job.salaryMin || job.salaryMax ? (
            <MetaChip icon={Wallet} accent>
              {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
            </MetaChip>
          ) : null}
        </div>

        {/* Tech stack */}
        {job.techStack?.length ? (
          <div className="flex flex-wrap gap-1.5">
            {job.techStack.slice(0, 5).map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="rounded-md bg-secondary/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground"
              >
                {t}
              </Badge>
            ))}
            {job.techStack.length > 5 ? (
              <Badge
                variant="secondary"
                className="rounded-md bg-secondary/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
              >
                +{job.techStack.length - 5}
              </Badge>
            ) : null}
          </div>
        ) : null}

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-4">
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Eye className="size-3" />
              <span className="tabular-nums">{job.viewCount ?? 0}</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="size-3" />
              <span className="tabular-nums">{job.applicationsCount ?? 0}</span>
            </span>
            <span
              className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 ${
                urgent
                  ? "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  : "border-border/60 bg-background/40"
              }`}
            >
              <CalendarClock className="size-3" />
              {days <= 0 ? "Last day" : `${days}d left`}
            </span>
          </div>

          {/* Unique apply CTA */}
          <Link
            href={`/form/${job.publicId}`}
            data-testid={`job-apply-${job.publicId}`}
            className="group/btn relative inline-flex items-center gap-1.5 overflow-hidden rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition hover:border-primary/60 hover:bg-primary hover:text-primary-foreground"
          >
            <span
              aria-hidden
              className="absolute inset-y-0 -left-12 w-12 -skew-x-12 bg-foreground/10 transition-all duration-500 group-hover/btn:left-[110%]"
            />
            View role
            <ArrowUpRight className="size-3.5 transition group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </li>
  );
}

function MetaChip({
  icon: Icon,
  children,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] backdrop-blur ${
        accent
          ? "border-primary/25 bg-primary/10 text-primary"
          : "border-border/60 bg-background/50 text-muted-foreground"
      }`}
    >
      <Icon className="size-3" />
      {children}
    </span>
  );
}

function IconGhost({
  children,
  label,
  testId,
}: {
  children: React.ReactNode;
  label: string;
  testId: string;
}) {
  return (
    <button
      data-testid={testId}
      aria-label={label}
      className="grid size-7 place-items-center rounded-md text-muted-foreground transition hover:bg-secondary hover:text-foreground"
    >
      {children}
    </button>
  );
}

function FilterField({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="size-3.5" />
        {label}
      </label>
      {children}
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
  compact,
  icon: Icon,
  testId,
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  compact?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  testId: string;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        data-testid={testId}
        className={`rounded-md border-border/70 bg-background/60 backdrop-blur ${
          compact ? "h-10 w-auto gap-1.5 px-3 text-sm" : "h-10"
        }`}
      >
        {Icon && compact ? <Icon className="size-3.5 text-muted-foreground" /> : null}
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="rounded-md">
        {options.map((opt) => (
          <SelectItem key={opt} value={opt} className="rounded-md">
            {opt === "ALL" ? "All" : prettify(opt)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function SortSegmented({
  value,
  onChange,
  testId,
}: {
  value: SortKey;
  onChange: (v: SortKey) => void;
  testId: string;
}) {
  const items: { key: SortKey; label: string }[] = [
    { key: "newest", label: "Newest" },
    { key: "expiring", label: "Expiring" },
    { key: "popular", label: "Popular" },
  ];
  return (
    <div
      data-testid={testId}
      className="inline-flex h-10 items-center gap-0.5 rounded-md border border-border/70 bg-background/60 p-0.5 backdrop-blur"
    >
      {items.map((it) => (
        <button
          key={it.key}
          data-testid={`${testId}-${it.key}`}
          onClick={() => onChange(it.key)}
          className={`relative rounded-md px-3 py-1.5 text-xs font-medium transition ${
            value === it.key
              ? "bg-card text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div
      data-testid="jobs-empty"
      className="flex flex-col items-center justify-center gap-3 rounded-md border border-dashed border-border/70 bg-card/40 px-6 py-16 text-center backdrop-blur"
    >
      <div className="grid size-10 place-items-center rounded-md border border-border/70 bg-background/60">
        <Search className="size-4 text-muted-foreground" />
      </div>
      <p className="font-display text-lg font-semibold">No matching roles</p>
      <p className="max-w-sm text-sm text-muted-foreground">
        Try a broader keyword or reset filters to see every open role on the
        board.
      </p>
      <Button
        data-testid="jobs-empty-reset"
        variant="outline"
        onClick={onReset}
        className="mt-2 gap-2 rounded-md"
      >
        <RotateCcw className="size-3.5" />
        Reset filters
      </Button>
    </div>
  );
}

/* ---------------- Helpers ---------------- */

function prettify(value?: string | null) {
  if (!value) return "—";
  return value
    .toLowerCase()
    .split("_")
    .map((p) => p[0]?.toUpperCase() + p.slice(1))
    .join(" ");
}

function daysUntil(iso: string) {
  const ms = +new Date(iso) - Date.now();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}

function formatSalary(
  min?: number | null,
  max?: number | null,
  currency?: string | null
) {
  const cur = currency ?? "USD";
  const fmt = (n: number) =>
    n >= 1000 ? `${Math.round(n / 1000)}k` : `${n}`;
  if (min && max) return `${cur} ${fmt(min)}–${fmt(max)}`;
  if (min) return `${cur} ${fmt(min)}+`;
  if (max) return `up to ${cur} ${fmt(max)}`;
  return "Compensation TBD";
}
