"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HugeIcon } from "@/utils/hugeicons";

import { StatCard } from "../components/StatCard";
import { JobFormsCard } from "../components/JobFormsCard";
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
  const totalSubmissions = forms.reduce((acc, f) => acc + f.submissions, 0);
  const newSubmissions = forms.reduce((acc, f) => acc + f.newSubmissions, 0);
  const activeForms = forms.filter((f) => f.isActive).length;
  const totalViews = forms.reduce((acc, f) => acc + f.views, 0);
  const conversionRate =
    totalViews > 0 ? Math.round((totalSubmissions / totalViews) * 100) : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="space-y-6">
          <header>
            <h1 className="font-display text-[22px] font-semibold tracking-tight">
              Good morning, {firstName(recruiter.companyName)}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {recruiter.companyName} workspace
            </p>
          </header>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Active Forms"
              value={`${activeForms}/${totalForms}`}
              delta="+8.4%"
              intent="primary"
              icon="briefcase"
            />
            <StatCard
              title="Total Applications"
              value={totalSubmissions}
              delta="+12.1%"
              icon="user-add"
            />
            <StatCard
              title="Total Views"
              value={totalViews}
              delta="+4.2%"
              icon="views"
            />
            <StatCard
              title="Avg Conversion"
              value={`${conversionRate}%`}
              delta={conversionRate > 0 ? "+2.0%" : "0%"}
              icon="target-03"
            />
          </div>

          <JobFormsCard forms={forms} />
        </section>

        <aside className="space-y-4 lg:sticky lg:top-20 lg:h-fit">
          <Card className="border-muted-foreground/15 shadow-xs">
            <CardContent className="space-y-3 p-4">
              <p className="text-[13px] font-semibold uppercase tracking-widest text-muted-foreground">
                Quick Actions
              </p>
              <Button
                className="h-11 w-full justify-start bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={creating}
                onClick={() => {
                  setCreating(true);
                  router.push("/dashboard/domains");
                }}
              >
                <HugeIcon name={creating ? "loading" : "add-circle"} className="size-4" />
                Create a Form
              </Button>
              <Button asChild variant="outline" className="h-11 w-full justify-start">
                <Link href="/dashboard/recruiter/profile">
                  <HugeIcon name="user" className="size-4" />
                  Edit Profile
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-muted-foreground/15 shadow-xs">
            <CardContent className="space-y-3 p-4">
              <p className="text-[13px] font-semibold uppercase tracking-widest text-muted-foreground">
                Verification Status
              </p>
              {recruiter.verified ? (
                <div className="flex items-center gap-3 text-sm text-[#4CAF82]">
                  <HugeIcon name="verified-checkmark" className="size-5" />
                  <span>{recruiter.companyEmail} is verified</span>
                </div>
              ) : (
                <div className="rounded-xl border border-primary/30 bg-accent p-3 text-sm text-accent-foreground">
                  Your company email is not verified. Forms cannot be published until verification is complete.
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-muted-foreground/15 shadow-xs">
            <CardContent className="space-y-2 p-4">
              <Badge variant="secondary" className="rounded-md">What's new</Badge>
              <p className="text-sm leading-6 text-muted-foreground">
                Domain templates now keep GitHub scoring fields locked, so every software role stays ready for automated evaluation.
              </p>
            </CardContent>
          </Card>
        </aside>
    </div>
  );
}

function firstName(value: string) {
  return value?.split(" ")?.[0] || "there";
}
