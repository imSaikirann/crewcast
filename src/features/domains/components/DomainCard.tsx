import { BadgeCheck, Lock, ArrowRight } from "lucide-react"
import { Domain } from "../types/domain"
import Link from "next/link"

export function DomainCard({ domain }: { domain: Domain }) {
  const disabled = !domain.isActive

  const content = (
    <div
      className={`
        group relative h-full
        rounded-2xl border p-5
        transition-all
        flex flex-col justify-between
        ${
          disabled
            ? "border-border bg-muted/30 opacity-60"
            : "border-border hover:border-primary hover:shadow-xl bg-card"
        }
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold leading-tight">
            {domain.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {domain.description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {domain.haveDefaultForm && (
            <BadgeCheck className="w-5 h-5 text-emerald-500" />
          )}
          {disabled && <Lock className="w-5 h-5 text-muted-foreground" />}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
        <span>{domain.jobCount} jobs</span>

        {!disabled && (
          <span className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition">
            Select
            <ArrowRight className="w-4 h-4" />
          </span>
        )}
      </div>

      {disabled && (
        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-muted-foreground bg-background/70 rounded-2xl">
          Domain not active
        </div>
      )}
    </div>
  )

  if (disabled) {
    return content
  }

  return (
    <Link href={`/dashboard/forms/new?domain=${domain._id}`}>
      {content}
    </Link>
  )
}
