"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { HugeIcon } from "@/utils/hugeicons";

import { StatCard } from "../components/StatCard";
import { JobFormsCard } from "../components/JobFormsCard";
import type { JobForm } from "../types/dashboard.types";

export default function DashboardScreen({ forms }: { forms: JobForm[] }) {
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
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Dashboard" }]} />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Recruiter workspace
            </p>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="mt-1 max-w-2xl text-muted-foreground">
              Track job forms, views, applications, and candidate movement from one place.
            </p>
          </div>

          <div className="flex gap-3">
            <Link href="/dashboard/recruiter/profile">
              <Button variant="outline" size="lg">
                Recruiter Profile
                <HugeIcon name="user" className="ml-2" />
              </Button>
            </Link>

            <Button
              size="lg"
              disabled={creating}
              onClick={() => {
                setCreating(true);
                router.push("/dashboard/domains");
              }}
            >
              {creating ? "Opening..." : "Create Form"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Active forms"
            value={`${activeForms}/${totalForms}`}
            helper="Published and not expired"
            icon="briefcase"
          />
          <StatCard
            title="Applications"
            value={totalSubmissions}
            helper={`${newSubmissions} total captured`}
            icon="user-add"
          />
          <StatCard
            title="Views"
            value={totalViews}
            helper="Public job page visits"
            icon="views"
          />
          <StatCard
            title="Conversion"
            value={`${conversionRate}%`}
            helper="Applications from views"
            icon="target-03"
          />
        </div>

        <JobFormsCard forms={forms} />
      </div>
    </div>
  );
}
