export function DomainCardSkeleton() {
  return (
    <div className="h-[170px] rounded-2xl border border-border p-5 animate-pulse bg-card">
      <div className="flex justify-between">
        <div className="space-y-3 w-full">
          <div className="h-5 w-2/3 bg-muted rounded" />
          <div className="h-4 w-full bg-muted/70 rounded" />
          <div className="h-4 w-5/6 bg-muted/70 rounded" />
        </div>

        <div className="h-5 w-5 bg-muted rounded-full" />
      </div>

      <div className="mt-8 h-4 w-24 bg-muted/60 rounded" />
    </div>
  )
}
