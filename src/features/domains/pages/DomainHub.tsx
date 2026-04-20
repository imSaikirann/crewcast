"use client"

import { useMemo, useState } from "react"
import Link from "next/link"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRecruiterProfile } from "@/features/recruiter/hooks/useRecruiterProfile"
import { DomainCard } from "@/features/domains/components/DomainCard"
import { DomainGridSkeleton } from "../components/DomainGridSkeleton"
import { useDomainsList } from "../hooks/useDomain"

export default function DomainsPage() {
  const [query, setQuery] = useState("")
  const { data: domains, isLoading, error } = useDomainsList()
  const { data: recruiter } = useRecruiterProfile()

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return Array.isArray(domains)
      ? domains.filter(
          (d) =>
            d.title.toLowerCase().includes(q) ||
            d.description.toLowerCase().includes(q)
        )
      : []
  }, [query, domains])

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h1 className="font-display text-[28px] font-semibold tracking-tight">
            Choose a domain
          </h1>
          <p className="mt-2 truncate text-sm text-muted-foreground">
            Each domain has default fields tailored for that role type.
          </p>
        </div>

        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search domains..."
          className="cc-input w-full lg:w-80"
        />
      </div>

      {recruiter && !recruiter.verified && (
        <Alert className="border-primary/30 bg-accent text-accent-foreground">
          <AlertTitle>Verify your company email first</AlertTitle>
          <AlertDescription className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span>Forms are locked until {recruiter.companyEmail} is verified.</span>
            <Button asChild size="sm" variant="outline" className="w-full bg-background sm:w-auto">
              <Link href="/dashboard/recruiter/profile">Open profile</Link>
            </Button>
          </AlertDescription>
        </Alert>
      )}

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
        <div className="py-20 text-center text-muted-foreground">
          No domains match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((domain) => (
            <DomainCard
              key={domain.id}
              domain={domain}
              disabledReason={
                recruiter && !recruiter.verified
                  ? "Verify company email first"
                  : undefined
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}
