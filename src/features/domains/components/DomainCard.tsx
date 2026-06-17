"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, BadgeCheck, Lock, Briefcase } from "lucide-react";

import { Domain } from "../types/domain";

export function DomainCard({
  domain,
  disabledReason,
}: {
  domain: Domain;
  disabledReason?: string;
}) {
  const router = useRouter();
  const [opening, setOpening] = useState(false);

  const disabled = !domain.isActive || Boolean(disabledReason);
  const message = disabledReason || "Domain not active";

  const handleClick = () => {
    if (disabled || opening) return;
    setOpening(true);
    router.push(`/dashboard/forms/new?domain=${domain.id}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || opening}
      data-testid={`domain-card-${domain.id}`}
      className={`
        group relative flex h-full flex-col rounded-lg border bg-card p-5 text-left
        transition-all duration-150
        ${
          disabled
            ? "cursor-not-allowed border-border/60 opacity-60"
            : "cursor-pointer border-border/60 hover:border-foreground/20 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
        }
      `}
    >
      {/* Top: icon + status */}
      <div className="flex items-start justify-between gap-3">
        <div className="grid size-9 place-items-center rounded-md border border-border bg-background">
          <Briefcase
            className="size-4 text-foreground"
            strokeWidth={1.75}
          />
        </div>

        <div className="flex items-center gap-1.5">
          {domain.haveDefaultForm && (
            <span
              className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
              title="Default form available"
            >
              <BadgeCheck className="size-3" strokeWidth={2} />
              Default
            </span>
          )}
          {disabled && (
            <span className="inline-flex size-6 items-center justify-center rounded-full bg-secondary/60">
              <Lock className="size-3 text-muted-foreground" strokeWidth={1.75} />
            </span>
          )}
        </div>
      </div>

      {/* Title + description */}
      <div className="mt-5 space-y-1.5">
        <h3 className="font-display text-[15px] font-semibold leading-tight tracking-tight">
          {domain.title}
        </h3>
        <p className="line-clamp-2 text-[13px] leading-5 text-muted-foreground">
          {domain.description}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-border pt-3">
        <span className="text-xs text-muted-foreground">
          {domain.jobCount > 0
            ? `${domain.jobCount} active form${domain.jobCount === 1 ? "" : "s"}`
            : "No forms yet"}
        </span>

        {!disabled && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground">
            {opening ? "Opening" : "Select"}
            <ArrowUpRight
              className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </span>
        )}
      </div>

      {/* Disabled overlay */}
      {disabled && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg bg-background/70">
          <span className="rounded-md border border-border/60 bg-card px-3 py-1.5 text-[11px] font-medium text-muted-foreground">
            {message}
          </span>
        </div>
      )}
    </button>
  );
}