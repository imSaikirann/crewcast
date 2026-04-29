import AppPage from "@/components/app/AppPage";

import RecruiterProfilePage from "@/features/recruiter/pages/RecruiterProfilePage";

export default function Page() {
  return(
    <AppPage

      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Profile" },
      ]}
    >
      <RecruiterProfilePage />
    </AppPage>
  )
}

