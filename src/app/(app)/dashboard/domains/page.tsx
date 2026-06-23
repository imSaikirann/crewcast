import DomainsPage from '@/features/domains/pages/DomainHub'
import AppPage from '@/components/app/AppPage'
import React from 'react'

export default function page() {
  return (
    <AppPage
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Domains" },
      ]}
    >
      <DomainsPage />
    </AppPage>
  )
}

