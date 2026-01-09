import { DomainCardSkeleton } from "./DomainCardSkeleton";

export function DomainGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <DomainCardSkeleton key={i} />
      ))}
    </div>
  )
}
