import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen">
      <div className="w-full space-y-6 px-4 pb-8 pt-5 sm:px-6 lg:px-8">
        <div className="border-b pb-5">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="mt-3 h-8 w-64" />
          <Skeleton className="mt-2 h-4 w-80 max-w-full" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-32 rounded-lg" />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <Skeleton className="h-96 rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-36 rounded-lg" />
            <Skeleton className="h-36 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
