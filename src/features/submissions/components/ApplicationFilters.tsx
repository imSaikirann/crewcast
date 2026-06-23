"use client";

import { Input } from "@/components/ui/input";
import { AppSelect } from "@/components/ui/app-select";

type Props = {
  search: string;
  setSearch: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  scoreBand: string;
  setScoreBand: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
};

export default function ApplicationFilters({
  search,
  setSearch,
  status,
  setStatus,
  scoreBand,
  setScoreBand,
  sort,
  setSort,
}: Props) {
  return (
    <div className="rounded-lg border border-border/60 p-3">
      <div className="grid gap-3 lg:grid-cols-[1fr_170px_170px_190px]">
        <Input
          type="text"
          placeholder="Search name, email, GitHub, or response"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9"
        />

        <SelectField
          label="Status"
          value={status}
          onChange={setStatus}
          options={[
            ["", "All statuses"],
            ["APPLIED", "Applied"],
            ["SHORTLISTED", "Shortlisted"],
            ["INTERVIEW", "Interview"],
            ["REJECTED", "Rejected"],
            ["HIRED", "Hired"],
          ]}
        />

        <SelectField
          label="Score"
          value={scoreBand}
          onChange={setScoreBand}
          options={[
            ["", "All scores"],
            ["strong", "80 and above"],
            ["good", "60 to 79"],
            ["low", "Below 60"],
            ["missing", "No score"],
          ]}
        />

        <SelectField
          label="Sort"
          value={sort}
          onChange={setSort}
          options={[
            ["score_desc", "Highest score"],
            ["newest", "Newest first"],
            ["oldest", "Oldest first"],
            ["name", "Candidate name"],
          ]}
        />
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: [string, string][];
}) {
  return (
    <AppSelect
      label={label}
      value={value}
      onValueChange={onChange}
      options={options.map(([optionValue, optionLabel]) => ({
        value: optionValue,
        label: optionLabel,
      }))}
    />
  );
}

