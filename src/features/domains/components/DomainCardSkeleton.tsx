export function DomainCardSkeleton() {
  return (
    <div className="h-[170px] animate-pulse rounded-2xl border border-border bg-card p-5">
      <div className="flex justify-between">
        <div className="w-full space-y-3">
          <div className="h-5 w-2/3 rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-5/6 rounded bg-muted" />
        </div>

        <div className="h-5 w-5 rounded-full bg-muted" />
      </div>

      <div className="mt-8 h-4 w-24 rounded bg-muted" />
    </div>
  )
}
