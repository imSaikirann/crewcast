import Link from "next/link";
import { ArrowRight, BadgeCheck, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cachedJson } from "@/lib/cache";
import { cacheKeys, cacheTtl } from "@/lib/cacheKeys";
import { prisma } from "@/lib/prisma";
import { HugeIcon, type HugeIconName } from "@/utils/hugeicons";

const comingSoonDomains = [
  {
    title: "AI / ML",
    description:
      "Screen builders working with models, inference, data pipelines, and applied AI product work.",
    signal: "Model work, Python depth, research repos",
    icon: "analytics-up",
  },
  {
    title: "Product Design",
    description:
      "Collect portfolios, case studies, product thinking, and collaboration signals in one form.",
    signal: "Case studies, UX depth, shipped work",
    icon: "target-03",
  },
  {
    title: "Growth",
    description:
      "Hire operators who can run experiments, read funnels, and turn acquisition into repeatable motion.",
    signal: "Experiments, metrics, channel ownership",
    icon: "analytics-up",
  },
] satisfies Array<{
  title: string;
  description: string;
  signal: string;
  icon: HugeIconName;
}>;

export default async function PublicDomainsPage() {
  const domains = await cachedJson(
    { key: cacheKeys.publicDomains, ttl: cacheTtl.publicDomains },
    () =>
      prisma.domains.findMany({
        where: { isActive: true },
        select: {
          id: true,
          title: true,
          description: true,
          jobCount: true,
          haveDefaultForm: true,
          _count: {
            select: { recruiterForms: true },
          },
        },
        orderBy: [{ jobCount: "desc" }, { title: "asc" }],
      })
  );

  const totalForms = domains.reduce(
    (sum, domain) => sum + domain._count.recruiterForms,
    0
  );

  return (
    <main
      className="min-h-screen px-4 pb-20 pt-28 text-foreground sm:px-6"
      style={{
        background: "var(--lc-bg)",
        color: "var(--lc-text)",
        fontFamily: "var(--lc-sans)",
      }}
    >
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--lc-grid) 1px, transparent 1px), linear-gradient(90deg, var(--lc-grid) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 50% at 50% 0%, black 20%, transparent 100%)",
        }}
      />

      <section className="relative mx-auto max-w-[1100px]">
        <div className="grid gap-8 border-b border-[var(--lc-border)] pb-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
          <div>
            <Badge variant="outline" className="mb-5 rounded-md">
              Crewcast hiring domains
            </Badge>
            <h1 className="max-w-4xl font-display text-[clamp(42px,6vw,76px)] font-extrabold leading-[1.02] tracking-tight">
              Choose what you are hiring for.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--lc-text-2)]">
              Domains are role-ready hiring lanes. Each one can carry its own
              default form fields, evaluation signal, and candidate review flow.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-md">
                <Link href="/dashboard/domains">
                  Start with a domain
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-md">
                <Link href="/jobs">View open roles</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-[var(--lc-border)] bg-[var(--lc-bg-1)] p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-md bg-[var(--lc-bg-2)] text-[var(--lc-text)]">
                <Sparkles className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Available now</p>
                <p className="text-xs text-[var(--lc-text-2)]">
                  Active hiring categories in Crewcast
                </p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <DomainStat label="Domains" value={domains.length} />
              <DomainStat label="Forms" value={totalForms} />
            </div>
          </div>
        </div>

        {domains.length === 0 ? (
          <div className="mt-10 rounded-lg border border-dashed border-[var(--lc-border)] bg-[var(--lc-bg-1)] p-10 text-center">
            <h2 className="font-display text-2xl font-semibold">
              Domains are being prepared.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[var(--lc-text-2)]">
              Admins can activate hiring domains from the control room. Once
              active, they will appear here for recruiters to start from.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {domains.map((domain, index) => (
              <DomainShowcaseCard
                key={domain.id}
                domain={{
                  ...domain,
                  formCount: domain._count.recruiterForms,
                }}
                index={index}
              />
            ))}
          </div>
        )}

        <section className="mt-14">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--lc-text-3)]">
                Adding more
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold">
                More hiring lanes are coming.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[var(--lc-text-2)]">
              Each new domain gets its own form defaults and review signal so
              teams are not forcing every role into the same candidate flow.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {comingSoonDomains.map((domain) => (
              <ComingSoonCard key={domain.title} domain={domain} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

function DomainShowcaseCard({
  domain,
  index,
}: {
  domain: {
    id: string;
    title: string;
    description: string;
    jobCount: number;
    haveDefaultForm: boolean;
    formCount: number;
  };
  index: number;
}) {
  const accent = [
    "from-emerald-500/20",
    "from-sky-500/20",
    "from-amber-500/20",
    "from-rose-500/20",
    "from-violet-500/20",
  ][index % 5];

  return (
    <Link
      href={`/dashboard/forms/new?domain=${domain.id}`}
      className="group relative min-h-72 overflow-hidden rounded-lg border border-[var(--lc-border)] bg-[var(--lc-bg-1)] p-5 transition hover:-translate-y-1 hover:border-[var(--lc-border-hover)]"
    >
      <div
        className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-b ${accent} to-transparent opacity-80`}
      />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="grid size-12 place-items-center rounded-md border border-[var(--lc-border)] bg-[var(--lc-bg-2)]">
            <HugeIcon name="briefcase" className="size-6" />
          </div>
          <div className="flex items-center gap-2">
            {domain.haveDefaultForm && (
              <Badge variant="secondary" className="gap-1 rounded-md">
                <BadgeCheck className="size-3.5" />
                default ready
              </Badge>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-display text-2xl font-semibold tracking-tight">
            {domain.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--lc-text-2)]">
            {domain.description}
          </p>
        </div>

        <div className="mt-auto pt-8">
          <div className="mb-4 grid grid-cols-2 gap-2">
            <MiniStat label="Live forms" value={domain.formCount} />
            <MiniStat label="Template" value={domain.haveDefaultForm ? "Ready" : "Custom"} />
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--lc-text)] transition group-hover:translate-x-1">
            Hire in this domain
            <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function ComingSoonCard({
  domain,
}: {
  domain: {
    title: string;
    description: string;
    signal: string;
    icon: HugeIconName;
  };
}) {
  return (
    <div className="rounded-lg border border-dashed border-[var(--lc-border)] bg-[var(--lc-bg-1)] p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="grid size-11 place-items-center rounded-md bg-[var(--lc-bg-2)]">
          <HugeIcon name={domain.icon} className="size-6" />
        </div>
        <Badge variant="outline" className="rounded-md">
          soon
        </Badge>
      </div>
      <h3 className="mt-6 font-display text-xl font-semibold">{domain.title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--lc-text-2)]">
        {domain.description}
      </p>
      <p className="mt-5 rounded-md bg-[var(--lc-bg-2)] px-3 py-2 text-xs text-[var(--lc-text-2)]">
        {domain.signal}
      </p>
    </div>
  );
}

function DomainStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md bg-[var(--lc-bg-2)] px-4 py-3">
      <p className="font-display text-2xl font-semibold">{value}</p>
      <p className="text-xs text-[var(--lc-text-2)]">{label}</p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-md border border-[var(--lc-border)] bg-[var(--lc-bg-2)] px-3 py-2">
      <p className="text-sm font-semibold">{value}</p>
      <p className="text-[11px] text-[var(--lc-text-2)]">{label}</p>
    </div>
  );
}
