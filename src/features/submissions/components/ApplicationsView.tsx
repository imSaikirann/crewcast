"use client";

import ApplicationFilters from "@/features/submissions/components/ApplicationFilters";
import ApplicationTable from "@/features/submissions/components/ApplicationTable";
import { useState, useMemo } from "react";


export default function ApplicationsView({ data }: { data: any[] }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const filtered = useMemo(() => {
    return data.filter((a) => {
      const q = search.toLowerCase();

      const matchesSearch =
        a.fullName.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q);

      const matchesStatus = status ? a.status === status : true;

      return matchesSearch && matchesStatus;
    });
  }, [data, search, status]);

  return (
    <div className="space-y-4">
      <ApplicationFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <ApplicationTable applications={filtered} />
    </div>
  );
}
