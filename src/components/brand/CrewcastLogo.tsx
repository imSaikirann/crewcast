import { cn } from "@/lib/utils"

const logoSrc = "/crewcast-logo.svg"

export function CrewcastMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-11 w-40 items-center justify-center overflow-hidden rounded-md bg-card px-2",
        className
      )}
    >
      <img
        src={logoSrc}
        alt="Crewcast"
        className="h-full w-full object-contain"
        draggable={false}
      />
    </span>
  )
}

export function CrewcastWordmark({
  className,
  markClassName,
}: {
  className?: string
  markClassName?: string
  textClassName?: string
}) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <CrewcastMark className={markClassName} />
    </span>
  )
}
