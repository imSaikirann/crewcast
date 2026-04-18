"use client"

import { useMemo, useState } from "react"
import { DomainCard } from "@/features/domains/components/DomainCard"
import { DomainCardSkeleton } from "@/features/domains/components/DomainCardSkeleton"

import Breadcrumbs from "@/components/common/Breadcrumbs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { useDomainsList } from "../hooks/useDomain"
import { DomainGridSkeleton } from "../components/DomainGridSkeleton"

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Domains", href: "/dashboard/domains" },
] 

export default function DomainsPage() {
  const [query, setQuery] = useState("")
  const { data: domains, isLoading, error } = useDomainsList()

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return Array.isArray(domains) ? domains.filter(
      d =>
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
    ) : []
  }, [query, domains])

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-6 sm:px-6 lg:px-8">
      <Breadcrumbs items={BREADCRUMBS.slice(1)} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold">Select a domain</h1>
          <p className="text-muted-foreground">
            Choose where you want to post your next job
          </p>
        </div>

        <Input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search domains…"
          className="w-full sm:w-72"
        />
      </div>

      {/* Content */}
      {isLoading ? (
        <DomainGridSkeleton />
      ) : error ? (
        <Alert variant="destructive">
          <AlertTitle>Domains could not be loaded</AlertTitle>
          <AlertDescription>
            Refresh the page or contact an admin if the issue continues.
          </AlertDescription>
        </Alert>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          No domains match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(domain => (
            <DomainCard key={domain._id} domain={domain} />
          ))}
        </div>
      )}
    </div>
  )
}
