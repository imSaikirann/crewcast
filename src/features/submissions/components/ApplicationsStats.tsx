import React from "react";

export default function ApplicationsStats() {
  const stats = {
    uniqueViews: 1247,
    totalApplications: 89,
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Views */}
      <div className="bg-background border rounded-lg px-4 py-3 flex flex-col gap-1">
        <span className="text-xs uppercase tracking-wide text-muted-foreground">
          Views
        </span>
        <span className="text-xl font-semibold">
          {stats.uniqueViews.toLocaleString()}
        </span>
      </div>

      {/* Applications */}
      <div className="bg-background border rounded-lg px-4 py-3 flex flex-col gap-1">
        <span className="text-xs uppercase tracking-wide text-muted-foreground">
          Applications
        </span>
        <span className="text-xl font-semibold">
          {stats.totalApplications.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
