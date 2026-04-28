import AppPage from "@/components/app/AppPage";

import RecruiterProfilePage from "@/features/recruiter/pages/RecruiterProfilePage";

export default function Page() {
  return(
    <AppPage
      backButton={{ fallbackHref: "/dashboard", label: "Back to dashboard" }}
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Profile" },
      ]}
    >
      <RecruiterProfilePage />
    </AppPage>
  )
}

