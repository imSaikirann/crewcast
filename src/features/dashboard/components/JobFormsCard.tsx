import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { JobForm } from "../types/dashboard.types";
import { JobFormRow } from "./JobFormRow";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function JobFormsCard({ forms }: { forms: JobForm[] }) {
  return (
    <Card className="rounded-xl border-muted-foreground/15 shadow-xs">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle className="font-display text-[15px] font-medium">Your Forms</CardTitle>
        </div>
        <Button asChild variant="outline" size="sm" className="border-primary/50 text-primary hover:bg-accent">
          <Link href="/dashboard/domains">+ New Form</Link>
        </Button>
      </CardHeader>

      <CardContent className="space-y-2">
        {forms.length === 0 ? (
          <div className="rounded-xl border border-dashed bg-secondary/30 p-10 text-center">
            <svg className="mx-auto mb-4 h-14 w-14 text-primary/50" viewBox="0 0 64 64" fill="none">
              <path d="M21 12h18l8 8v32H21V12Z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M38 12v9h9M27 31h14M27 39h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p className="font-display text-base font-medium text-foreground">No forms yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Create a structured form for your next role.
            </p>
            <Link href="/dashboard/domains" className="mt-4 inline-block text-sm font-medium text-primary">
              + Create your first form
            </Link>
          </div>
        ) : (
          forms.map((form) => <JobFormRow key={form.id} form={form} />)
        )}
      </CardContent>
    </Card>
  );
}
