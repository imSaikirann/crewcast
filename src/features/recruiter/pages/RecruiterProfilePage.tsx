"use client";

import ProfileHeader from "../components/ProfileHeader";
import ProfileCard from "../components/ProfileCard";
import ProfileStats from "../components/ProfileStats";
import ProfileActions from "../components/ProfileActions";
import PlanUsageCard from "../components/PlanUsageCard";

export default function RecruiterProfilePage() {
  const recruiter = {
    name: "SkillHigh Technologies",
    email: "hr@skillhigh.in",
    website: "https://skillhigh.in",
    verified: true,
    totalJobs: 12,
    totalApplications: 482,
  };

  const plan = {
    name: "Starter",
    activeForms: 2,
    activeLimit: 3,
    totalForms: 7,
    totalLimit: 10,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        <ProfileHeader recruiter={recruiter} />

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <ProfileCard recruiter={recruiter} />
          <ProfileStats recruiter={recruiter} />
          <PlanUsageCard plan={plan} />
        </div>

        {/* Actions */}
        <div className="pt-2">
          <ProfileActions />
        </div>

      </div>
    </div>
  );
}
