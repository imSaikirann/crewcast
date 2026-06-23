import type { ReactNode } from "react"

import Breadcrumbs, { type BreadcrumbItemType } from "@/components/common/Breadcrumbs"
import BackButton from "@/components/common/BackButton"
import { cn } from "@/lib/utils"

export default function AppPage({
  breadcrumbs,
  children,
  className,
  width = "full",
  backButton,
}: {
  breadcrumbs?: BreadcrumbItemType[]
  children: ReactNode
  className?: string
  width?: "full" | "wide" | "form"
  backButton?: {
    fallbackHref?: string
    label?: string
  }
}) {
  return (
    <div className="min-h-screen">
      <div
        className={cn(
          "w-full px-4 pb-10 pt-6 sm:px-6 lg:px-8",
          width === "wide" && "mx-auto max-w-7xl",
          width === "form" && "mx-auto max-w-6xl",
          className
        )}
      >
        {breadcrumbs && (
          <div className="mb-6">
            {backButton && (
              <BackButton
                fallbackHref={backButton.fallbackHref}
                label={backButton.label}
                className="mb-3"
              />
            )}
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

