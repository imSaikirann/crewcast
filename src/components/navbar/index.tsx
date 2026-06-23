"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { isNavbarHidden } from "./nav-config";
import { NavLogo } from "./nav-logo";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";

export default function Navbar() {
  const { data: session } = useSession();
  const user = (session?.user ?? null) as Parameters<typeof DesktopNav>[0]["user"];
  const pathname = usePathname();
  const { hidden, scrolled } = useScrollDirection();

  if (isNavbarHidden(pathname)) return null;

  return (
    <nav
      data-testid="site-navbar"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-300",
        hidden && "-translate-y-full"
      )}
    >
      <div
        className={cn(
          "transition-[background,border-color,backdrop-filter] duration-200",
          scrolled
            ? "border-b border-border/60 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 md:px-6">
          <NavLogo />
          <DesktopNav user={user} />
          <MobileNav user={user} />
        </div>
      </div>
    </nav>
  );
}
