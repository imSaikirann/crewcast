"use client";

import { useState } from "react";
import { formatDateTime } from "@/utils/date";

type Application = {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  status: string;
  scores: { totalScore: number }[];
  responses: Record<string, any>;
};

export default function ApplicationTable({
  applications,
}: {
  applications: Application[];
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="border rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="text-left px-4 py-3">Candidate</th>
            <th className="text-left px-4 py-3">Email</th>
            <th className="text-left px-4 py-3">Score</th>
            <th className="text-left px-4 py-3">Applied</th>
            <th className="text-left px-4 py-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((a) => {
            const isOpen = openId === a.id;
            const score = a.scores?.[0]?.totalScore ?? "—";

            return (
              <>
                {/* Summary row */}
                <tr
                  key={a.id}
                  onClick={() =>
                    setOpenId(isOpen ? null : a.id)
                  }
                  className="border-t cursor-pointer hover:bg-muted/40"
                >
                  <td className="px-4 py-3 font-medium">
                    {a.fullName}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {a.email}
                  </td>
                  <td className="px-4 py-3">{score}</td>
                  <td className="px-4 py-3">
                    {formatDateTime(a.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full px-2 py-1 text-xs bg-blue-500/10 text-blue-600">
                      {a.status}
                    </span>
                  </td>
                </tr>

                {/* Expanded responses */}
                {isOpen && (
                  <tr className="bg-muted/20">
                    <td colSpan={5} className="px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        {Object.entries(a.responses).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="flex justify-between border-b pb-1"
                            >
                              <span className="font-medium text-muted-foreground">
                                {key.replace(/_/g, " ")}
                              </span>
                              <span className="max-w-[60%] text-right">
                                {String(value)}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
