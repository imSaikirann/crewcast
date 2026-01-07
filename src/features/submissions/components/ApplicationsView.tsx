"use client";

import { useState, useMemo } from "react";
import ApplicationFilters from "@/features/submissions/components/ApplicationFilters";
import ApplicationTable from "@/features/submissions/components/ApplicationTable";
import ApplicationsStats from "@/features/submissions/components/ApplicationsStats";

type Application = {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  status: string;
  scores: { totalScore: number }[];
  responses: Record<string, any>;
};

export default function ApplicationsView({ data }: { data: Application[] }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    return data.filter((a) => {
      const matchesSearch =
        a.fullName.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q);

      const matchesStatus = status ? a.status === status : true;

      return matchesSearch && matchesStatus;
    });
  }, [data, search, status]);

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex flex-col lg:flex-row-reverse lg:items-center lg:justify-between gap-4">
        <ApplicationFilters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
        />

        <ApplicationsStats />
      </div>

      {/* Table */}
      <div className="bg-background border rounded-xl overflow-hidden">
        <ApplicationTable applications={filtered} />
      </div>
    </div>
  );
}
