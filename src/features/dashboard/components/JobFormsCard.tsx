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
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
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
        <div className="rounded-lg border border-dashed bg-secondary/30 p-8 text-center">
          <div className="mx-auto grid size-11 place-items-center rounded-lg bg-background text-primary shadow-xs">
            <HugeIcon name="briefcase" className="size-5" />
          </div>
          <p className="mt-4 text-sm font-semibold text-foreground">No job forms yet</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
            Start with a domain template, then publish a focused form for your next role.
          </p>
          <Button asChild size="sm" className="mt-5">
            <Link href="/dashboard/domains">
              <HugeIcon name="add-circle" className="size-4" />
              Create first form
            </Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {forms.map((form) => (
            <JobFormRow key={form.id} form={form} />
          ))}
        </div>
      )}
    </section>
  );
}