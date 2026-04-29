export const dynamic = "force-dynamic"

import AppPage from '@/components/app/AppPage'
import Form from '@/features/form-builder/pages/Form'


export default function page() {
  return (
    <AppPage
      width="form"
     
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "New form" },
      ]}
    >
      <Form />
    </AppPage>
  )
}
