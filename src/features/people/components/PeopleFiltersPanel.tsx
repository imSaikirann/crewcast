"use client";

import { useMemo, useState } from "react";
import { MapPin, Search, SlidersHorizontal, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppSelect } from "@/components/ui/app-select";
import { cn } from "@/lib/utils";

import { LANGUAGE_OPTIONS, languageLabel } from "../data/languages";
import type { PeopleFilters, PeopleSort } from "../types";

type PeopleFiltersPanelProps = {
  filters: PeopleFilters;
  isLoading: boolean;
  onChange: (filters: PeopleFilters) => void;
  onSearch: () => void;
  onReset: () => void;
};

const FOLLOWER_OPTIONS: [string, string][] = [
  ["0", "Any followers"],
  ["50", "50+ followers"],
  ["100", "100+ followers"],
  ["500", "500+ followers"],
  ["1000", "1k+ followers"],
  ["5000", "5k+ followers"],
];

const SORT_OPTIONS: [PeopleSort, string][] = [
  ["followers", "Most followers"],
  ["repositories", "Most repositories"],
  ["joined", "Newest accounts"],
];

export default function PeopleFiltersPanel({
  filters,
  isLoading,
  onChange,
  onSearch,
  onReset,
}: PeopleFiltersPanelProps) {
  const [languageQuery, setLanguageQuery] = useState("");

  const filteredLanguages = useMemo(() => {
    const query = languageQuery.trim().toLowerCase();
    if (!query) return LANGUAGE_OPTIONS;
    return LANGUAGE_OPTIONS.filter((option) =>
      option.label.toLowerCase().includes(query)
    );
  }, [languageQuery]);

  const toggleLanguage = (value: string) => {
    const selected = filters.languages.includes(value);
    if (selected) {
      onChange({
        ...filters,
        languages: filters.languages.filter((language) => language !== value),
      });
      return;
    }
    if (filters.languages.length >= 5) return;
    onChange({ ...filters, languages: [...filters.languages, value] });
  };

  const hasActiveFilters =
    filters.languages.length > 0 ||
    filters.location.trim() !== "" ||
    filters.minFollowers > 0;

  const limitReached = filters.languages.length >= 5;

  return (
    <section className="rounded-xl border bg-card/80 p-4 shadow-xs sm:p-5">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="size-4 text-muted-foreground" />
        <h2 className="text-sm font-semibold">Search filters</h2>
      </div>

      {/* Languages */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Languages
          </span>
          <span className="text-[11px] text-muted-foreground">
            {filters.languages.length}/5 selected
          </span>
        </div>

        {filters.languages.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {filters.languages.map((language) => (
              <Badge
                key={language}
                variant="secondary"
                className="cursor-pointer gap-1 pr-1"
                onClick={() => toggleLanguage(language)}
              >
                {languageLabel(language)}
                <X className="size-3" />
              </Badge>
            ))}
          </div>
        )}

        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={languageQuery}
            onChange={(event) => setLanguageQuery(event.target.value)}
            placeholder="Filter languages (e.g. Rust, Go, Python)"
            className="h-10 rounded-md bg-background pl-9"
          />
        </div>

        <div className="flex max-h-44 flex-wrap content-start gap-1.5 overflow-y-auto rounded-md border bg-background p-2">
          {filteredLanguages.length === 0 ? (
            <p className="px-1 py-2 text-xs text-muted-foreground">
              No languages match â€œ{languageQuery}â€.
            </p>
          ) : (
            filteredLanguages.map((option) => {
              const selected = filters.languages.includes(option.value);
              const disabled = !selected && limitReached;
              return (
                <button
                  key={option.value}
                  type="button"
                  disabled={disabled}
                  onClick={() => toggleLanguage(option.value)}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:bg-accent",
                    disabled && "cursor-not-allowed opacity-40 hover:bg-background"
                  )}
                >
                  {option.label}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Location + selects */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <label className="space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Location
          </span>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={filters.location}
              onChange={(event) =>
                onChange({ ...filters, location: event.target.value })
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") onSearch();
              }}
              placeholder="City or country"
              className="h-10 rounded-md bg-background pl-9"
            />
          </div>
        </label>

        <AppSelect
          label="Followers"
          value={String(filters.minFollowers)}
          onValueChange={(value) =>
            onChange({ ...filters, minFollowers: Number(value) })
          }
          options={FOLLOWER_OPTIONS.map(([value, label]) => ({ value, label }))}
          showLabel
          size="lg"
        />

        <AppSelect
          label="Sort by"
          value={filters.sort}
          onValueChange={(value) =>
            onChange({ ...filters, sort: value as PeopleSort })
          }
          options={SORT_OPTIONS.map(([value, label]) => ({ value, label }))}
          showLabel
          size="lg"
        />
      </div>

      <div className="mt-4 flex flex-col gap-2 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          Searches GitHub for top open-source contributors that match your filters.
        </p>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onReset}
              disabled={isLoading}
            >
              <X className="size-4" />
              Clear
            </Button>
          )}
          <Button
            type="button"
            size="sm"
            onClick={onSearch}
            disabled={isLoading || !hasActiveFilters}
          >
            <Search className="size-4" />
            {isLoading ? "Searchingâ€¦" : "Find people"}
          </Button>
        </div>
      </div>
    </section>
  );
}

