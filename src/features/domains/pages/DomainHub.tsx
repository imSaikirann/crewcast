"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ShieldAlert, AlertTriangle, Inbox } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRecruiterProfile } from "@/features/recruiter/hooks/useRecruiterProfile";
import { DomainCard } from "@/features/domains/components/DomainCard";
import { DomainGridSkeleton } from "../components/DomainGridSkeleton";
import { useDomainsList } from "../hooks/useDomain";

export default function DomainsPage() {
  const [query, setQuery] = useState("");
  const { data: domains, isLoading, error } = useDomainsList();
  const { data: recruiter } = useRecruiterProfile();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!Array.isArray(domains)) return [];
    if (!q) return domains;
    return domains.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
    );
  }, [query, domains]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col gap-6 border-b border-border/60 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-1.5">
          <h1 className="text-xl font-semibold tracking-tight">
            Choose a domain
          </h1>
          <p className="text-sm text-muted-foreground">
            Each domain ships with default fields tailored for that role type.
          </p>
        </div>

        <div className="relative w-full lg:w-80">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            strokeWidth={1.75}
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search domains"
            className="h-9 rounded-md pl-9 text-sm"
            data-testid="domain-search-input"
          />
        </div>
      </header>

      {/* Verification banner */}
      {recruiter && !recruiter.verified && (
        <Alert className="border-border bg-secondary/40">
          <ShieldAlert className="size-4" strokeWidth={1.75} />
          <AlertTitle className="text-sm font-semibold">
            Verify your company email
          </AlertTitle>
          <AlertDescription className="mt-1 flex flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between">
            <span className="text-muted-foreground">
              Forms are locked until{" "}
              <span className="font-medium text-foreground">
                {recruiter.companyEmail}
              </span>{" "}
              is verified.
            </span>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="h-8 w-full rounded-md text-xs sm:w-auto"
              data-testid="open-profile-btn"
            >
              <Link href="/dashboard/recruiter/profile">Open profile</Link>
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Content */}
      {isLoading ? (
        <DomainGridSkeleton />
      ) : error ? (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Domains could not be loaded</AlertTitle>
          <AlertDescription>
            Refresh the page, or contact an admin if the issue continues.
          </AlertDescription>
        </Alert>
      ) : filtered.length === 0 ? (
        <EmptyState query={query} onClear={() => setQuery("")} />
      ) : (
        <>
          <p className="text-xs text-muted-foreground">
            {filtered.length} domain{filtered.length === 1 ? "" : "s"}
            {query && ` matching "${query}"`}
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((domain) => (
              <DomainCard
                key={domain.id}
                domain={domain}
                disabledReason={
                  recruiter && !recruiter.verified
                    ? "Verify company email first"
                    : undefined
                }
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function EmptyState({
  query,
  onClear,
}: {
  query: string;
  onClear: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-20 text-center">
      <div className="grid size-12 place-items-center rounded-full border border-border bg-secondary/40">
        <Inbox className="size-5 text-muted-foreground" strokeWidth={1.5} />
      </div>
      <h3 className="mt-4 font-display text-base font-semibold">
        No domains found
      </h3>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">
        {query
          ? `Nothing matches "${query}". Try a different keyword.`
          : "There are no domains available yet."}
      </p>
      {query && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="mt-4 h-8 text-xs"
        >
          Clear search
        </Button>
      )}
    </div>
  );
}

