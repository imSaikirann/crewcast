"use client";

import type { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { ChevronRight, LogOut, Menu, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { HugeIcon, type HugeIconName } from "@/utils/hugeicons";

const navItems: {
  href: string;
  label: string;
  icon: HugeIconName;
  adminOnly?: boolean;
}[] = [
  { href: "/dashboard", label: "Dashboard", icon: "analytics-up" },
  { href: "/jobs", label: "Jobs", icon: "briefcase" },
  { href: "/dashboard/submissions", label: "Candidates", icon: "user-add" },
  { href: "/dashboard/domains", label: "Domains", icon: "target-03" },
  { href: "/dashboard/recruiter/profile", label: "Profile", icon: "user" },
  { href: "/dashboard/settings", label: "Settings", icon: "more-vertical" },
  { href: "/admin", label: "Admin analytics", icon: "target-03", adminOnly: true },
  { href: "/admin/domains", label: "Domains", icon: "briefcase", adminOnly: true },
];

const primaryNavCount = 3;
const mobileNavHrefs = [
  "/dashboard",
  "/jobs",
  "/dashboard/domains",
  "/dashboard/recruiter/profile",
];

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAdmin = pathname.startsWith("/admin") || session?.user?.role === "admin";

  const visibleNavItems = navItems.filter((item) =>
    isAdmin ? item.adminOnly : !item.adminOnly
  );
  const homeHref = isAdmin ? "/admin" : "/dashboard";

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const stored = window.localStorage.getItem("crewcast-sidebar-collapsed");
    if (stored) setCollapsed(stored === "true");
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((current) => {
      const next = !current;
      window.localStorage.setItem("crewcast-sidebar-collapsed", String(next));
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-sidebar-border bg-sidebar shadow-sm md:flex",
          collapsed ? "w-14" : "w-[220px]"
        )}
      >
        <SidebarContent
          collapsed={collapsed}
          homeHref={homeHref}
          isAdmin={isAdmin}
          pathname={pathname}
          session={session}
          visibleNavItems={visibleNavItems}
          onCollapseToggle={toggleCollapsed}
        />
      </aside>

      <header className="sticky top-0 z-40 border-b bg-background/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="flex items-center justify-between gap-3">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon-sm" aria-label="Open navigation">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="h-screen w-screen max-w-none p-0 sm:max-w-none">
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation</SheetTitle>
                <SheetDescription>Crewcast workspace navigation</SheetDescription>
              </SheetHeader>
              <SidebarContent
                collapsed={false}
                homeHref={homeHref}
                isAdmin={isAdmin}
                pathname={pathname}
                session={session}
                visibleNavItems={visibleNavItems}
                mobile
              />
            </SheetContent>
          </Sheet>

          <Link href={homeHref} className="flex min-w-0 flex-1 items-center justify-center gap-2 font-display font-semibold tracking-tight">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
              C
            </span>
            <span className="truncate">Crewcast</span>
          </Link>

          <UserMenu session={session} compact />
        </div>
      </header>

      <main
        className={cn(
          "min-h-screen pb-20 transition-[padding] duration-200 md:pb-0",
          collapsed ? "md:pl-14" : "md:pl-[220px]"
        )}
      >
        <div className="hidden justify-end px-6 pt-5 md:flex">
          <ThemeToggleButton theme={theme} onToggle={toggleTheme} compact />
        </div>
        {children}
      </main>

      <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-4 rounded-2xl border bg-card/95 p-1 shadow-lg backdrop-blur md:hidden">
        {visibleNavItems
          .filter((item) => mobileNavHrefs.includes(item.href))
          .map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-[11px] font-medium text-muted-foreground transition",
                isActivePath(pathname, item.href) && "bg-accent text-accent-foreground"
              )}
            >
              <HugeIcon name={item.icon} className="size-[18px]" />
              <span className="truncate">{item.label}</span>
            </Link>
          ))}
      </nav>
    </div>
  );
}

function SidebarContent({
  collapsed,
  homeHref,
  isAdmin,
  pathname,
  session,
  visibleNavItems,
  mobile = false,
  onCollapseToggle,
}: {
  collapsed: boolean;
  homeHref: string;
  isAdmin: boolean;
  pathname: string;
  session: Session | null;
  visibleNavItems: typeof navItems;
  mobile?: boolean;
  onCollapseToggle?: () => void;
}) {
  const primary = visibleNavItems.slice(0, primaryNavCount);
  const secondary = visibleNavItems.slice(primaryNavCount);
  const workspaceName = session?.user?.name || (isAdmin ? "Admin Console" : "Crewcast");

  return (
    <div className={cn("flex h-full flex-col", collapsed ? "px-2 py-4" : "px-3 py-4")}>
      <Link
        href={homeHref}
        className={cn("mb-6 flex min-w-0 items-center gap-3 px-1", collapsed && "justify-center px-0")}
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm">
          <span className="font-display text-xs font-semibold">
            {workspaceName.charAt(0).toUpperCase()}
          </span>
        </span>
        {!collapsed && (
          <span className="min-w-0">
            <span className="block truncate font-display text-[13px] font-medium text-sidebar-foreground">
              {workspaceName}
            </span>
            <span className="block truncate text-[11px] text-muted-foreground">Build your crew.</span>
          </span>
        )}
      </Link>

      <nav className="space-y-1">
        {primary.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            active={isActivePath(pathname, item.href)}
            collapsed={collapsed}
            mobile={mobile}
          />
        ))}
        {secondary.length > 0 && (
          <div className={cn("my-3 border-t border-sidebar-border", collapsed ? "mx-2" : "mx-1")} />
        )}
        {secondary.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            active={isActivePath(pathname, item.href)}
            collapsed={collapsed}
            mobile={mobile}
          />
        ))}
      </nav>

      <div className="mt-auto">
        {collapsed && !mobile ? (
          <div className="flex justify-center">
            <UserMenu session={session} compact />
          </div>
        ) : (
          <div className="rounded-lg border bg-card p-2.5 shadow-xs">
            <div className="flex items-center gap-2">
              <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-secondary text-sm font-semibold">
                {(session?.user?.name || session?.user?.email || "R").charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium">
                  {session?.user?.name || "Recruiter"}
                </p>
                <p className="truncate text-[11px] text-muted-foreground">
                  {session?.user?.email || "Signed in"}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-muted-foreground hover:text-destructive"
                onClick={() => signOut({ callbackUrl: "/" })}
                aria-label="Logout"
              >
                <LogOut className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {!mobile && (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onCollapseToggle}
          className={cn("mt-3 text-muted-foreground", collapsed ? "mx-auto" : "ml-auto")}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronRight className={cn("size-4 transition-transform", !collapsed && "rotate-180")} />
        </Button>
      )}
    </div>
  );
}

function NavLink({
  item,
  active,
  collapsed,
  mobile,
}: {
  item: (typeof navItems)[number];
  active: boolean;
  collapsed: boolean;
  mobile?: boolean;
}) {
  const link = (
    <Link
      href={item.href}
      title={collapsed ? item.label : undefined}
      className={cn(
        "group flex h-10 items-center rounded-lg text-[13px] font-medium transition focus-visible:ring-2 focus-visible:ring-ring",
        collapsed ? "justify-center px-0" : "gap-3 px-3",
        active
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
        mobile && "h-12"
      )}
    >
      <HugeIcon name={item.icon} className="size-[18px] shrink-0" />
      {!collapsed && <span className="min-w-0 truncate">{item.label}</span>}
      {!collapsed && active && <ChevronRight className="ml-auto size-4 opacity-70" />}
    </Link>
  );

  if (mobile) return <SheetClose asChild>{link}</SheetClose>;
  return link;
}

function ThemeToggleButton({
  theme,
  onToggle,
  compact = false,
}: {
  theme: "dark" | "light";
  onToggle: () => void;
  compact?: boolean;
}) {
  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size={compact ? "icon-sm" : "sm"}
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="text-muted-foreground hover:text-foreground"
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      {!compact && (isDark ? "Light mode" : "Dark mode")}
    </Button>
  );
}

function UserMenu({
  session,
  compact = false,
}: {
  session: Session | null;
  compact?: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={compact ? "icon-sm" : "sm"}
          className={cn(!compact && "w-full justify-start")}
          aria-label="Open user menu"
        >
          <span className="grid size-6 place-items-center rounded-sm bg-muted text-xs font-semibold">
            {(session?.user?.name || session?.user?.email || "R").charAt(0).toUpperCase()}
          </span>
          {!compact && <span className="truncate">{session?.user?.name || "Recruiter"}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <span className="block truncate">{session?.user?.name || "Recruiter"}</span>
          <span className="block truncate text-xs font-normal text-muted-foreground">
            {session?.user?.email || "Signed in"}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
          <LogOut className="size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function isActivePath(pathname: string, href: string) {
  if (href === "/dashboard" || href === "/admin") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}
