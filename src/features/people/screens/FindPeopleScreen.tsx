"use client";

import { useState } from "react";
import { AlertCircle, Search, UserSearch } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import DeveloperCard from "../components/DeveloperCard";
import PeopleFiltersPanel from "../components/PeopleFiltersPanel";
import PostRolePanel from "../components/PostRolePanel";
import { useFindPeople } from "../hooks/useFindPeople";
import type { PeopleFilters } from "../types";

type TabKey = "find" | "post";

const DEFAULT_FILTERS: PeopleFilters = {
  languages: [],
  location: "",
  minFollowers: 0,
  sort: "followers",
  page: 1,
};

export default function FindPeopleScreen() {
  const [tab, setTab] = useState<TabKey>("find");
  const [filters, setFilters] = useState<PeopleFilters>(DEFAULT_FILTERS);
  const [hasSearched, setHasSearched] = useState(false);

  const findPeople = useFindPeople();
  const result = findPeople.data;

  const runSearch = (nextFilters: PeopleFilters) => {
    setHasSearched(true);
    findPeople.mutate(nextFilters);
  };

  const handleSearch = () => {
    const nextFilters = { ...filters, page: 1 };
    setFilters(nextFilters);
    runSearch(nextFilters);
  };

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
    setHasSearched(false);
    findPeople.reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-border/60 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Talent search</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Discover top open-source contributors or post a new role to attract them.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="inline-flex rounded-lg border bg-muted/40 p-1">
        <TabButton
          active={tab === "find"}
          icon={<UserSearch className="size-4" />}
          label="Find people"
          onClick={() => setTab("find")}
        />
        <TabButton
          active={tab === "post"}
          icon={<Search className="size-4" />}
          label="Post role"
          onClick={() => setTab("post")}
        />
      </div>

      {tab === "find" ? (
        <div className="space-y-6">
          <PeopleFiltersPanel
            filters={filters}
            isLoading={findPeople.isPending}
            onChange={setFilters}
            onSearch={handleSearch}
            onReset={handleReset}
          />

          {findPeople.isError && (
            <Alert variant="warning">
              <AlertCircle className="size-4" />
              <AlertTitle>Search failed</AlertTitle>
              <AlertDescription>
                {extractErrorMessage(findPeople.error)}
              </AlertDescription>
            </Alert>
          )}

          {findPeople.isPending && <ResultsSkeleton />}

          {!findPeople.isPending && result && (
            <ResultsView
              count={result.developers.length}
              totalCount={result.totalCount}
              warnings={result.warnings}
            >
              {result.developers.length === 0 ? (
                <Alert>
                  <AlertTitle>No developers found</AlertTitle>
                  <AlertDescription>
                    Try fewer languages, a broader location, or a lower follower
                    minimum.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
                  {result.developers.map((developer) => (
                    <DeveloperCard key={developer.login} developer={developer} />
                  ))}
                </div>
              )}
            </ResultsView>
          )}

          {!hasSearched && !findPeople.isPending && (
            <div className="rounded-xl border border-dashed bg-card/40 p-10 text-center">
              <UserSearch className="mx-auto size-8 text-muted-foreground" />
              <p className="mt-3 font-medium">Start your search</p>
              <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
                Pick one or more languages, add an optional location, and we&apos;ll
                surface the top GitHub contributors that match.
              </p>
            </div>
          )}
        </div>
      ) : (
        <PostRolePanel />
      )}
    </div>
  );
}

function TabButton({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
        active
          ? "bg-background text-foreground shadow-xs"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function ResultsView({
  count,
  totalCount,
  warnings,
  children,
}: {
  count: number;
  totalCount: number;
  warnings?: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      {count > 0 && (
        <p className="text-sm text-muted-foreground">
          Showing top {count} of {totalCount.toLocaleString()} matching contributors,
          ranked by open-source impact.
        </p>
      )}
      {warnings?.map((warning) => (
        <Alert key={warning} variant="warning">
          <AlertCircle className="size-4" />
          <AlertTitle>Partial GitHub data</AlertTitle>
          <AlertDescription>{warning}</AlertDescription>
        </Alert>
      ))}
      {children}
    </div>
  );
}

function ResultsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="space-y-4 rounded-xl border bg-card/80 p-5">
          <div className="flex items-center gap-3">
            <Skeleton className="size-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-16 w-full rounded-lg" />
          <Skeleton className="h-9 w-full" />
        </div>
      ))}
    </div>
  );
}

function extractErrorMessage(error: unknown): string {
  if (error && typeof error === "object") {
    const axiosLike = error as {
      response?: { data?: { error?: string } };
      message?: string;
    };
    return (
      axiosLike.response?.data?.error ??
      axiosLike.message ??
      "Something went wrong while searching GitHub."
    );
  }
  return "Something went wrong while searching GitHub.";
}

