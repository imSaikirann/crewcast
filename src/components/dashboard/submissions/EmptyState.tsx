type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50 px-6 py-16 text-center dark:border-zinc-700 dark:bg-zinc-900/40">
      {/* Dot-grid circle — CSS-only, no hardcoded hex */}
      <div className="mb-5 flex size-10 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700">
        <div className="grid grid-cols-3 gap-0.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="size-1 rounded-full bg-zinc-300 dark:bg-zinc-600"
            />
          ))}
        </div>
      </div>
      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{title}</p>
      <p className="mt-1 max-w-xs text-xs text-zinc-400 dark:text-zinc-500">{description}</p>
    </div>
  );
}