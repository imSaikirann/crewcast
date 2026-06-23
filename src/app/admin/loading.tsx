export default function Loading() {
  return (
    <div className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8 md:pl-80">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="h-6 w-44 animate-pulse rounded-md bg-muted" />
        <div className="h-10 w-80 animate-pulse rounded-md bg-muted" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-28 animate-pulse rounded-lg border bg-background"
            />
          ))}
        </div>
        <div className="grid gap-6 xl:grid-cols-[430px_1fr]">
          <div className="h-96 animate-pulse rounded-lg border bg-background" />
          <div className="h-96 animate-pulse rounded-lg border bg-background" />
        </div>
      </div>
    </div>
  );
}


