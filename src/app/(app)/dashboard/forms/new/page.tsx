export const dynamic = "force-dynamic"

import AppPage from '@/components/app/AppPage'
import Form from '@/features/form-builder/pages/Form'


export default function page() {
  return (
    <AppPage
      width="form"
      backButton={{ fallbackHref: "/dashboard/domains", label: "Back to domains" }}
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "New form" },
      ]}
    >
      <Form />
    </AppPage>
  )
}
