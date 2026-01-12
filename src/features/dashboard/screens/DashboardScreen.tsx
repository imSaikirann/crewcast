"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { HugeIcon } from "@/utils/hugeicons";

import { forms } from "../data/mockForms";
import { StatCard } from "../components/StatCard";
import { JobFormsCard } from "../components/JobFormsCard";

export default function DashboardScreen() {
  const router = useRouter();

  const totalForms = forms.length;
  const totalSubmissions = forms.reduce((acc, f) => acc + f.submissions, 0);
  const newSubmissions = forms.reduce((acc, f) => acc + f.newSubmissions, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 mt-20">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Dashboard" }]} />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage your forms and view submissions
            </p>
          </div>

          <div className="flex gap-3">
            <Link href="/recruiter">
              <Button variant="outline" size="lg">
                Recruiter Profile
                <HugeIcon name="user" className="ml-2" />
              </Button>
            </Link>

            <Button size="lg" onClick={() => router.push("/dashboard/pick-domain")}>
              Create Form
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Forms" value={totalForms} />
          <StatCard title="Total Submissions" value={totalSubmissions} />
          <StatCard title="New Submissions" value={newSubmissions} />
        </div>

        <JobFormsCard forms={forms} />
      </div>
    </div>
  );
}
