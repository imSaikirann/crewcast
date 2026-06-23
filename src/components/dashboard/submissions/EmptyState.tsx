type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/40 px-6 py-16 text-center dark:border-border ">
      {/* Dot-grid circle â€” CSS-only, no hardcoded hex */}
      <div className="mb-5 flex size-10 items-center justify-center rounded-full border border-border">
        <div className="grid grid-cols-3 gap-0.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="size-1 rounded-full bg-muted-foreground/40"
            />
          ))}
        </div>
      </div>
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="mt-1 max-w-xs text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

