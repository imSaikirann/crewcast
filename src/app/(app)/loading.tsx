export default function Loading() {
  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="h-6 w-40 animate-pulse rounded-md bg-muted" />
        <div className="h-10 w-72 animate-pulse rounded-md bg-muted" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-lg border bg-background"
            />
          ))}
        </div>
        <div className="h-80 animate-pulse rounded-lg border bg-background" />
      </div>
    </div>
  );
}
