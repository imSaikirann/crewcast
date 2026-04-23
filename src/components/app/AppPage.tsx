import type { ReactNode } from "react"

import Breadcrumbs, { type BreadcrumbItemType } from "@/components/common/Breadcrumbs"
import { cn } from "@/lib/utils"

export default function AppPage({
  breadcrumbs,
  children,
  className,
  width = "full",
}: {
  breadcrumbs?: BreadcrumbItemType[]
  children: ReactNode
  className?: string
  width?: "full" | "wide" | "form"
}) {
  return (
    <div className="min-h-screen">
      <div
        className={cn(
          "w-full px-4 pb-8 pt-5 sm:px-6 lg:px-8",
          width === "wide" && "mx-auto max-w-7xl",
          width === "form" && "mx-auto max-w-6xl",
          className
        )}
      >
        {breadcrumbs && (
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
