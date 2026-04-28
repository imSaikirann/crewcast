"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavLink({
  href,
  children,
  onClick,
  className,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const pathname = usePathname();
  // Active for exact match or anchor on same page
  const isActive =
    href === pathname ||
    (href.startsWith("/#") && pathname === "/") ||
    (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative rounded-md px-3 py-2 text-[13px] font-medium no-underline transition-colors",
        "text-muted-foreground hover:text-foreground",
       
        className
      )}
    >
      {children}
    </Link>
  );
}