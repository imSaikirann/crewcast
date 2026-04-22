import AppPage from "@/components/app/AppPage"
import RecruiterSettingsPage from "@/features/recruiter/pages/RecruiterSettingsPage"

export default function Page() {
  return (
    <AppPage
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Settings" },
      ]}
    >
      <RecruiterSettingsPage />
    </AppPage>
  )
}
