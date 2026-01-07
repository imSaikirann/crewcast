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

  return (
    <div className="flex items-center gap-4">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.back()}
        className="rounded-full"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>

      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {item.href ? (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
