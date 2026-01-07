"use client";

type Props = {
  search: string;
  setSearch: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
};

export default function ApplicationFilters({
  search,
  setSearch,
  status,
  setStatus,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:w-80 h-10 px-3 rounded-md border bg-background text-sm"
      />

      {/* Status filter */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="h-10 px-3 rounded-md border bg-background text-sm"
      >
        <option value="">All statuses</option>
        <option value="APPLIED">Applied</option>
        <option value="SHORTLISTED">Shortlisted</option>
        <option value="REJECTED">Rejected</option>
      </select>
    </div>
  );
}
