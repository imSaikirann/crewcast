import { cn } from "@/lib/utils"

const logoSrc = "/logo.png"

export function CrewcastMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-card",
        className
      )}
    >
      <img
        src={logoSrc}
        alt="Crewcast"
        className="h-full w-full object-cover"
        draggable={false}
      />
    </span>
  )
}

export function CrewcastWordmark({
  className,
  markClassName,
  textClassName,
}: {
  className?: string
  markClassName?: string
  textClassName?: string
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <CrewcastMark className={markClassName} />
      <span
        className={cn(
          "font-display text-sm font-semibold tracking-normal text-foreground",
          textClassName
        )}
      >
        Crewcast
      </span>
    </span>
  )
}





