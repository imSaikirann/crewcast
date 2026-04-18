"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HugeIcon, type HugeIconName } from "@/utils/hugeicons";

const navItems: {
  href: string;
  label: string;
  icon: HugeIconName;
  adminOnly?: boolean;
}[] = [
  { href: "/dashboard", label: "Overview", icon: "analytics-up" },
  { href: "/dashboard/domains", label: "Create form", icon: "add-circle" },
  { href: "/dashboard/recruiter/profile", label: "Recruiter profile", icon: "user" },
  { href: "/admin", label: "Admin analytics", icon: "target-03", adminOnly: true },
  { href: "/admin/domains", label: "Domains", icon: "briefcase", adminOnly: true },
];

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = pathname.startsWith("/admin") || session?.user?.role === "admin";

  const visibleNavItems = navItems.filter((item) =>
    isAdmin ? item.adminOnly : !item.adminOnly
  );
  const homeHref = isAdmin ? "/admin" : "/dashboard";

  return (
    <div className="min-h-screen bg-[#f8faf7] text-foreground dark:bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r bg-background/95 px-4 py-5 shadow-sm backdrop-blur md:flex">
        <Link href={homeHref} className="mb-8 flex items-center gap-3 px-2">
          <div className="grid size-10 place-items-center rounded-md bg-primary text-primary-foreground">
            <HugeIcon name="briefcase" className="size-5" />
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight">crewcast</p>
            <p className="text-xs text-muted-foreground">
              {isAdmin ? "Admin console" : "Hiring workspace"}
            </p>
          </div>
        </Link>

        <nav className="space-y-1">
          {visibleNavItems.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted-foreground transition",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "hover:bg-muted hover:text-foreground"
                )}
              >
                <HugeIcon name={item.icon} className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto rounded-md border bg-muted/35 p-3">
          <p className="truncate text-sm font-semibold">
            {session?.user?.name || "Recruiter"}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {session?.user?.email || "Signed in"}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3 w-full"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Logout
          </Button>
        </div>
      </aside>

      <div className="border-b bg-background px-4 py-3 md:hidden">
        <div className="flex items-center justify-between">
          <Link href={homeHref} className="font-bold tracking-tight">
            crewcast
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Logout
          </Button>
        </div>
        <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {visibleNavItems.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex h-9 shrink-0 items-center gap-2 rounded-md border px-3 text-xs font-medium",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground"
                )}
              >
                <HugeIcon name={item.icon} className="size-3.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <main className="md:pl-72">{children}</main>
    </div>
  );
}

function isActivePath(pathname: string, href: string) {
  if (href === "/dashboard" || href === "/admin") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
