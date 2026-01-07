"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HugeIcon } from "@/utils/hugeicons";
// import { DUMMY_FORMS, DUMMY_SUBMISSIONS } from "@/data/data";
// import FormList from "@/components/form/FormList";
// import SubmitedForm from "@/components/form/SubmitedForm";
import { formatDate, formatDateTime } from "@/utils/date";
// import FormStat from "@/components/form/FormStat";
// import { useRecuriterForm } from "@/hooks/queries/useRecruiterForms";
// import { RecruiterFormSummary } from "@/types";

export default function DashboardPage() {
  const router = useRouter();
    // const { data, isLoading, error } = useRecuriterForm();

//   const forms = (data as RecruiterFormSummary[]) ?? [];

   
//   const [submissions] = useState(DUMMY_SUBMISSIONS);

//   const totalForms = forms && forms.length || 0;
//   const totalSubmissions =  && submissions.length || 0;
//   const newSubmissions = submissions.filter((s) => s.status === "new").length || 0;


  function handleCreateForm() {
    router.push("/dashboard/pick-domain");
  }

  return (
    <div className="min-h-screen bg-background font-mono">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Dashboard" },
          ]}
        />

        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage your forms and view submissions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/recruiter">
              <Button variant="outline" size="lg">
                Recruiter Profile <HugeIcon name="user"/>
              </Button>
            </Link>
            <Button disabled={false} onClick={handleCreateForm} size="lg">
              Create Form
            </Button>
          </div>
        </div>

        {/* Stats Cards

        <FormStat totalForms={totalForms} totalSubmissions={totalSubmissions} newSubmissions={newSubmissions} />
    
       
        // {/* Forms List */}
        {/* // <FormList forms={forms} formatDate={formatDate} /> */}

      
        {/* Submissions Section 
        <SubmitedForm submissions={submissions} formatDateTime={formatDateTime} /> */}
      </div>
    </div>
  );
}
