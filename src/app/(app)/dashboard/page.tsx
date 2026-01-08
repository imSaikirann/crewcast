"use client";

import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HugeIcon } from "@/utils/hugeicons";
import { useRecruiterProfile } from "@/features/recruiter/hooks/useRecruiterProfile";

export default function DashboardPage() {
  const router = useRouter();
  const { data: recruiter, isLoading } = useRecruiterProfile();

  const isVerified = recruiter?.verified;

  function handleCreateForm() {
    router.push("/dashboard/pick-domain");
  }

  return (
    <div className="min-h-screen bg-background font-mono">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 mt-20">

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Dashboard" },
          ]}
        />

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage your forms and view submissions
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard/recruiter/profile">
              <Button variant="outline" size="lg">
                Recruiter Profile <HugeIcon name="user" />
              </Button>
            </Link>

            {isVerified ? (
              <Button
                size="lg"
                onClick={handleCreateForm}
                disabled={isLoading}
              >
                Create Form
              </Button>
            ) : (
              <Link href="/dashboard/recruiter/profile">
                <Button size="lg" variant="outline">
                  Verify company
                </Button>
              </Link>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
