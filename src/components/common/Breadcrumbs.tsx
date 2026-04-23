"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

export interface BreadcrumbItemType {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItemType[];
}


export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const router = useRouter();
  const fallbackHref = items.find((item) => item.href)?.href ?? "/dashboard";

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallbackHref);
  };

  return (
    <div className="flex min-w-0 items-center gap-2">
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="shrink-0 text-muted-foreground hover:text-foreground"
        aria-label="Go back"
        title="Go back"
        onClick={handleBack}
      >
        <ArrowLeft className="size-4" />
      </Button>

      <Breadcrumb className="min-h-5 min-w-0">
        <BreadcrumbList className="h-5 flex-nowrap overflow-hidden text-[12px] leading-none">
          {items.map((item, index) => (
            <React.Fragment key={`${item.label}-${index}`}>
              {index > 0 && <BreadcrumbSeparator className="shrink-0 text-muted-foreground/60" />}
              <BreadcrumbItem className="min-w-0 shrink-0 last:shrink">
                {item.href && index !== items.length - 1 ? (
                  <BreadcrumbLink asChild className="truncate text-muted-foreground hover:text-foreground">
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="truncate font-medium text-foreground">
                    {item.label}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
