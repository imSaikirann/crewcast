"use client";

import type { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { ChevronLeft, ChevronRight, LogOut, Menu, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

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
import { CrewcastMark } from "@/components/brand/CrewcastLogo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
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
  { href: "/dashboard/recruiter/profile", label: "Profile", icon: "office-building" },
  { href: "/dashboard/settings", label: "Settings", icon: "settings" },
  { href: "/admin", label: "Analytics", icon: "analytics-up", adminOnly: true },
  { href: "/admin/domains", label: "Domains", icon: "target-03", adminOnly: true },
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
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-border/60 bg-sidebar transition-all duration-200 ease-in-out md:flex",
          collapsed ? "w-[60px]" : "w-[228px]"
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

      {/* Collapse toggle — floats on the sidebar edge */}
      <button
        onClick={toggleCollapsed}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className={cn(
          "fixed top-[22px] z-50 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-background shadow-sm transition-all duration-200 ease-in-out hover:bg-accent md:flex",
          "h-5 w-5",
          collapsed ? "left-[49px]" : "left-[217px]"
        )}
      >
        {collapsed ? (
          <ChevronRight className="size-3 text-muted-foreground" />
        ) : (
          <ChevronLeft className="size-3 text-muted-foreground" />
        )}
      </button>

      {/* Desktop Topbar */}
      <header
        className={cn(
          "sticky top-0 z-30 hidden h-[52px] items-center justify-between gap-2 border-b border-border/60 bg-background/95 px-5 backdrop-blur transition-[margin] duration-200 md:flex",
          collapsed ? "ml-[60px]" : "ml-[228px]"
        )}
      >
        {/* Breadcrumb / page title area — optional slot */}
        <div className="flex-1" />
        <div className="flex items-center gap-1.5">
          <ThemeToggle compact />
          <UserMenu session={session} />
        </div>
      </header>

      {/* Mobile Topbar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 px-4 py-2.5 backdrop-blur md:hidden">
        <div className="flex items-center gap-3">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Open navigation" className="shrink-0">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="h-screen w-[280px] p-0">
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

          <Link
            href={homeHref}
            className="flex min-w-0 flex-1 items-center gap-2 font-semibold tracking-tight"
          >
            <CrewcastMark className="h-7 w-7 shrink-0 rounded-md bg-transparent p-0" />
            <span className="truncate text-sm">Crewcast</span>
          </Link>

          <div className="flex items-center gap-1">
            <ThemeToggle compact />
            <UserMenu session={session} compact />
          </div>
        </div>
      </header>

      {/* Page content */}
      <main
        className={cn(
          "min-h-[calc(100vh-52px)] pb-20 transition-[padding] duration-200 md:pb-0",
          collapsed ? "md:pl-[60px]" : "md:pl-[228px]"
        )}
      >
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-4 rounded-2xl border border-border/60 bg-card/95 p-1 shadow-md backdrop-blur md:hidden">
        {visibleNavItems
          .filter((item) => mobileNavHrefs.includes(item.href))
          .map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[10px] font-medium transition-colors",
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <HugeIcon name={item.icon} className="size-[17px]" />
                <span className="truncate leading-none">{item.label}</span>
              </Link>
            );
          })}
      </nav>
    </div>
  );
}

// ─── Sidebar Content ──────────────────────────────────────────────────────────

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
  const displayName = session?.user?.name ?? (isAdmin ? "Admin" : "Crewcast");
  const email = session?.user?.email;

  return (
    <div className={cn("flex h-full flex-col gap-1", collapsed ? "px-2 py-4" : "px-3 py-4")}>
      {/* Logo / workspace */}
      <Link
        href={homeHref}
        className={cn(
          "mb-4 flex min-w-0 items-center gap-2.5 rounded-lg px-2 py-2 transition-colors hover:bg-accent/50",
          collapsed && "justify-center px-0"
        )}
      >
        <CrewcastMark className="h-7 w-7 shrink-0 rounded-md bg-transparent p-0" />
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold leading-tight text-sidebar-foreground">
              {displayName}
            </p>
            {email && (
              <p className="truncate text-[11px] leading-tight text-muted-foreground">{email}</p>
            )}
          </div>
        )}
      </Link>

      {/* Nav section label */}
      {!collapsed && (
        <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
          {isAdmin ? "Admin" : "Workspace"}
        </p>
      )}

      {/* Primary nav */}
      <nav className="flex flex-col gap-0.5">
        {primary.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            active={isActivePath(pathname, item.href)}
            collapsed={collapsed}
            mobile={mobile}
          />
        ))}
      </nav>

      {/* Secondary nav with divider */}
      {secondary.length > 0 && (
        <>
          <div className={cn("my-2 border-t border-border/50", collapsed ? "mx-1" : "mx-2")} />
          {!collapsed && (
            <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
              Account
            </p>
          )}
          <nav className="flex flex-col gap-0.5">
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
        </>
      )}

      {/* Bottom: user row (mobile only needs this; desktop uses topbar UserMenu) */}
      {mobile && (
        <div className="mt-auto border-t border-border/50 pt-3">
          <div className="flex items-center gap-2.5 rounded-lg px-2 py-2">
            <UserAvatar
              image={session?.user?.image}
              name={session?.user?.name || session?.user?.email || "U"}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium leading-tight">
                {session?.user?.name || "Recruiter"}
              </p>
              {session?.user?.email && (
                <p className="truncate text-[11px] leading-tight text-muted-foreground">
                  {session.user.email}
                </p>
              )}
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="shrink-0 rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              aria-label="Logout"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Nav Link ─────────────────────────────────────────────────────────────────

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
        "group flex items-center rounded-lg text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        collapsed ? "h-9 w-9 justify-center" : "h-9 gap-2.5 px-2.5",
        active
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
        mobile && "h-11"
      )}
    >
      <HugeIcon name={item.icon} className="size-[17px] shrink-0" />
      {!collapsed && <span className="min-w-0 flex-1 truncate">{item.label}</span>}
      {!collapsed && active && (
        <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70" />
      )}
    </Link>
  );

  if (mobile) return <SheetClose asChild>{link}</SheetClose>;
  return link;
}

// ─── User Menu ────────────────────────────────────────────────────────────────

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
          variant="ghost"
          size={compact ? "icon-sm" : "sm"}
          className={cn(
            "h-8 rounded-lg",
            !compact && "gap-2 px-2 text-[13px] font-medium"
          )}
          aria-label="Open user menu"
        >
          <UserAvatar
            image={session?.user?.image}
            name={session?.user?.name || session?.user?.email || "U"}
          />
          {!compact && (
            <span className="max-w-[120px] truncate">
              {session?.user?.name || "Recruiter"}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-0.5">
            <span className="truncate text-[13px] font-semibold">
              {session?.user?.name || "Recruiter"}
            </span>
            {session?.user?.email && (
              <span className="truncate text-[11px] text-muted-foreground">
                {session.user.email}
              </span>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/recruiter/profile" className="gap-2 text-[13px]">
            <User className="size-3.5" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/" })}
          className="gap-2 text-[13px] text-destructive focus:text-destructive"
        >
          <LogOut className="size-3.5" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ─── User Avatar ──────────────────────────────────────────────────────────────

function UserAvatar({ image, name }: { image?: string | null; name: string }) {
  if (image) {
    return (
      <Image
        src={image}
        alt={name}
        width={24}
        height={24}
        className="size-6 rounded-md object-cover"
      />
    );
  }

  return (
    <span className="grid size-6 shrink-0 place-items-center rounded-md bg-muted text-[11px] font-bold uppercase">
      {name.charAt(0)}
    </span>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isActivePath(pathname: string, href: string) {
  if (href === "/dashboard" || href === "/admin") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}