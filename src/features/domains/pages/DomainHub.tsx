"use client"

import { useMemo, useState } from "react"
import { DomainCard } from "@/features/domains/components/DomainCard"
import { DomainCardSkeleton } from "@/features/domains/components/DomainCardSkeleton"

import Breadcrumbs from "@/components/common/Breadcrumbs"
import { Input } from "@/components/ui/input"
import { useDomainsList } from "../hooks/useDomain"
import { DomainGridSkeleton } from "../components/DomainGridSkeleton"

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Domains", href: "/dashboard/domains" },
] as const

export default function DomainsPage() {
  const [query, setQuery] = useState("")
  const { data: domains, isLoading, error } = useDomainsList()

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return (domains ?? []).filter(
      d =>
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
    )
  }, [query, domains])

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 mt-20 space-y-10">
      <Breadcrumbs items={BREADCRUMBS} />

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
        <div className="text-center py-20 text-destructive">
          Failed to load domains. Try again.
        </div>
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
