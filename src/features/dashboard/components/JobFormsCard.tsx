import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HugeIcon } from "@/utils/hugeicons";

import type { JobForm } from "../types/dashboard.types";
import { JobFormRow } from "./JobFormRow";

export function JobFormsCard({ forms }: { forms: JobForm[] }) {
  return (
    <Card className="rounded-lg border-muted-foreground/15 py-5 shadow-xs">
      <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
        <div>
          <CardTitle className="font-display text-base font-semibold">
            Job forms
          </CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Track active roles, candidates, views, and hiring progress.
          </p>
        </div>
        <Button asChild variant="outline" size="sm" className="shrink-0">
          <Link href="/dashboard/domains">
            <HugeIcon name="add-circle" className="size-4" />
            New form
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="space-y-2">
        {forms.length === 0 ? (
          <div className="rounded-lg border border-dashed bg-secondary/30 p-8 text-center">
            <div className="mx-auto grid size-12 place-items-center rounded-lg bg-background text-primary shadow-xs">
              <HugeIcon name="briefcase" className="size-6" />
            </div>
            <p className="mt-4 font-display text-base font-semibold text-foreground">
              No job forms yet
            </p>
            <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
              Start with a domain template, then publish a focused form for your next role.
            </p>
            <Button asChild className="mt-5">
              <Link href="/dashboard/domains">
                <HugeIcon name="add-circle" className="size-4" />
                Create first form
              </Link>
            </Button>
          </div>
        ) : (
          forms.map((form) => <JobFormRow key={form.id} form={form} />)
        )}
      </CardContent>
    </Card>
  );
}
