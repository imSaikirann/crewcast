import Link from "next/link";

import { Button } from "@/components/ui/button";
import { HugeIcon } from "@/utils/hugeicons";

import type { JobForm } from "../types/dashboard.types";
import { JobFormRow } from "./JobFormRow";

export function JobFormsCard({ forms }: { forms: JobForm[] }) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Job forms
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Active roles, candidates, views, and hiring progress.
          </p>
        </div>
        <Button asChild variant="outline" size="sm" className="shrink-0">
          <Link href="/dashboard/domains">
            <HugeIcon name="add-circle" className="size-4" />
            <span className="hidden sm:inline">New form</span>
          </Link>
        </Button>
      </div>

      {forms.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border/60 p-8 text-center">
          <p className="text-sm font-medium text-foreground">No job forms yet</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
            Start with a domain template, then publish a focused form for your next role.
          </p>
          <Button asChild variant="outline" size="sm" className="mt-5">
            <Link href="/dashboard/domains">
              <HugeIcon name="add-circle" className="size-4" />
              Create first form
            </Link>
          </Button>
        </div>
      ) : (
        <div className="divide-y divide-border/60 overflow-hidden rounded-lg border border-border/60">
          {forms.map((form) => (
            <JobFormRow key={form.id} form={form} />
          ))}
        </div>
      )}
    </section>
  );
}