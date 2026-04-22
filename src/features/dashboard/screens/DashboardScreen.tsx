"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { HugeIcon } from "@/utils/hugeicons";

import { JobFormsCard } from "../components/JobFormsCard";
import { StatCard } from "../components/StatCard";
import type { DashboardRecruiter, JobForm } from "../types/dashboard.types";

export default function DashboardScreen({
  forms,
  recruiter,
}: {
  forms: JobForm[];
  recruiter: DashboardRecruiter;
}) {
  const router = useRouter();
  const [creating, setCreating] = useState(false);

  const totalForms = forms.length;
  const monthlyForms = forms.filter((form) => isThisMonth(form.createdAt)).length;
  const totalSubmissions = forms.reduce((acc, form) => acc + form.submissions, 0);
  const activeForms = forms.filter((form) => form.isActive).length;
  const totalViews = forms.reduce((acc, form) => acc + form.views, 0);
  const conversionRate =
    totalViews > 0 ? Math.round((totalSubmissions / totalViews) * 100) : 0;
  const hasInternshipRole = forms.some((form) => form.roleType === "INTERNSHIP");
  const hasApplications = totalSubmissions > 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Dashboard
          </p>
          <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight">
            Good morning, {firstName(recruiter.companyName)}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {recruiter.companyName} hiring workspace
          </p>
        </div>
        <Button
          className="h-10 w-full sm:w-auto"
          disabled={creating}
          onClick={() => {
            setCreating(true);
            router.push("/dashboard/domains");
          }}
        >
          <HugeIcon name={creating ? "loading" : "add-circle"} className="size-4" />
          Create form
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Active forms"
          value={`${activeForms}/${totalForms}`}
          intent="primary"
          icon="briefcase"
        />
        <StatCard title="Applications" value={totalSubmissions} icon="user-add" />
        <StatCard title="Form views" value={totalViews} icon="views" />
        <StatCard title="Conversion" value={`${conversionRate}%`} icon="target-03" />
      </div>

      <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
        <div className="grid gap-3 sm:grid-cols-2">
          <LimitCard
            title="Active published forms"
            value={activeForms}
            limit={recruiter.formLimit}
            helper="Forms currently live and accepting applications."
          />
          <LimitCard
            title="Monthly form creation"
            value={monthlyForms}
            limit={recruiter.totalFormsLimit}
            helper="Forms created on your current plan."
          />
        </div>
        <Button disabled variant="outline" className="h-full min-h-24 justify-center">
          <HugeIcon name="credit-card" className="size-4" />
          Upgrade plan
        </Button>
      </div>

      <section className="space-y-4">
        {!recruiter.verified && (
          <Alert variant="warning" className="rounded-lg">
            <AlertTitle>Verify your company email</AlertTitle>
            <AlertDescription>
              Publish access stays locked until {recruiter.companyEmail} is verified.
            </AlertDescription>
          </Alert>
        )}

        {totalForms > 0 && !hasInternshipRole && (
          <Alert className="rounded-lg">
            <AlertTitle>No internship role detected</AlertTitle>
            <AlertDescription>
              Create an internship form when you are hiring interns so candidates see the right role type and expectations.
            </AlertDescription>
          </Alert>
        )}

        {totalForms > 0 && !hasApplications && (
          <Alert className="rounded-lg">
            <AlertTitle>No candidates yet</AlertTitle>
            <AlertDescription>
              Share a public job link from any form. New applications will appear here once candidates apply.
            </AlertDescription>
          </Alert>
        )}

        <JobFormsCard forms={forms} />
      </section>
    </div>
  );
}

function LimitCard({
  title,
  value,
  limit,
  helper,
}: {
  title: string;
  value: number;
  limit: number;
  helper: string;
}) {
  const percent = limit > 0 ? Math.min(100, Math.round((value / limit) * 100)) : 0;

  return (
    <div className="rounded-lg border bg-card p-4 shadow-xs">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
          {value}/{limit}
        </span>
      </div>
      <div className="mt-3 h-2 rounded-full bg-muted">
        <div className="h-2 rounded-full bg-primary" style={{ width: `${percent}%` }} />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{helper}</p>
    </div>
  );
}

function firstName(value: string) {
  return value?.split(" ")?.[0] || "there";
}

function isThisMonth(value: string) {
  const date = new Date(value);
  const now = new Date();
  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
}
