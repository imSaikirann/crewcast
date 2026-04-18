"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BadgeCheck, Lock, ArrowRight } from "lucide-react";

import { Domain } from "../types/domain";

export function DomainCard({ domain }: { domain: Domain }) {
  const disabled = !domain.isActive;
  const router = useRouter();
  const [opening, setOpening] = useState(false);

  const content = (
    <div
      className={`
        group relative flex h-full flex-col justify-between rounded-lg border p-5
        text-left transition-all
        ${
          disabled
            ? "border-border bg-muted/30 opacity-60"
            : "border-border bg-card hover:border-primary hover:shadow-lg"
        }
      `}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold leading-tight">
            {domain.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {domain.description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {domain.haveDefaultForm && (
            <BadgeCheck className="h-5 w-5 text-emerald-500" />
          )}
          {disabled && <Lock className="h-5 w-5 text-muted-foreground" />}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
        <span>{domain.jobCount} jobs</span>

        {!disabled && (
          <span className="flex items-center gap-1 text-primary transition group-hover:translate-x-0.5">
            {opening ? "Opening..." : "Select"}
            <ArrowRight className="h-4 w-4" />
          </span>
        )}
      </div>

      {disabled && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-background/70 text-xs font-medium text-muted-foreground">
          Domain not active
        </div>
      )}
    </div>
  );

  if (disabled) {
    return content;
  }

  return (
    <button
      type="button"
      disabled={opening}
      onClick={() => {
        setOpening(true);
        router.push(`/dashboard/forms/new?domain=${domain.id}`);
      }}
      className="h-full cursor-pointer disabled:cursor-wait"
    >
      {content}
    </button>
  );
}
