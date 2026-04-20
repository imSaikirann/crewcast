"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, BadgeCheck, Lock } from "lucide-react";

import { HugeIcon } from "@/utils/hugeicons";
import { Domain } from "../types/domain";

export function DomainCard({
  domain,
  disabledReason,
}: {
  domain: Domain;
  disabledReason?: string;
}) {
  const disabled = !domain.isActive || Boolean(disabledReason);
  const router = useRouter();
  const [opening, setOpening] = useState(false);
  const message = disabledReason || "Domain not active";

  const content = (
    <div
      className={`
        group relative flex h-full min-h-52 flex-col justify-between rounded-xl border p-6
        text-left transition-all duration-120
        ${
          disabled
            ? "border-border bg-muted/30 opacity-60"
            : "border-border bg-card hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
        }
      `}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-5 grid size-10 place-items-center rounded-xl bg-secondary text-primary">
            <HugeIcon name="briefcase" className="size-6" />
          </div>
          <h3 className="font-display text-base font-medium leading-tight">
            {domain.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-muted-foreground">
            {domain.description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {domain.jobCount > 0 && (
            <span className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
              {domain.jobCount} forms
            </span>
          )}
          {domain.haveDefaultForm && <BadgeCheck className="h-5 w-5 text-primary" />}
          {disabled && <Lock className="h-5 w-5 text-muted-foreground" />}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm">
        <span />
        {!disabled && (
          <span className="flex items-center gap-1 text-[13px] font-medium text-primary transition group-hover:translate-x-0.5">
            {opening ? "Opening..." : "Use this domain"}
            <ArrowRight className="h-4 w-4" />
          </span>
        )}
      </div>

      {disabled && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-background/80 px-5 text-center text-xs font-medium text-muted-foreground backdrop-blur-[1px]">
          {message}
        </div>
      )}
    </div>
  );

  if (disabled) return content;

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
