"use client";

import { useState } from "react";
import { Menu, LayoutDashboard, LogOut, Settings, Shield } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { navLinks } from "./nav-config";
import { NavLink } from "./nav-link";
import { CTAButton } from "./cta-button";
import { UserAvatar } from "./user-avatar";

type SessionUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
} | null;

export function MobileNav({ user }: { user: SessionUser }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button
          variant="outline"
          size="icon"
          className="size-9 rounded-md"
          aria-label="Open menu"
          data-testid="mobile-menu-trigger"
        >
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[300px] border-l border-border bg-background p-0 sm:w-[340px]"
      >
        <SheetHeader className="border-b border-border px-5 py-4 text-left">
          <SheetTitle className="text-[15px] font-bold tracking-tight">
            Menu
          </SheetTitle>
        </SheetHeader>

        <div className="flex h-[calc(100%-56px)] flex-col">
          {/* Links */}
          <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
            {navLinks.map((l) => (
              <NavLink
                key={l.href}
                href={l.href}
                onClick={close}
                className="block w-full px-3 py-2.5 text-[14px]"
              >
                {l.label}
              </NavLink>
            ))}

            {user?.role === "admin" && (
              <NavLink
                href="/admin"
                onClick={close}
                className="block w-full px-3 py-2.5 text-[14px]"
              >
                Admin
              </NavLink>
            )}
          </nav>

          <Separator />

          {/* Theme toggle row */}
          {/* <div className="flex items-center justify-between px-5 py-3">
            <span className="text-[12px] font-medium text-muted-foreground">
              Theme
            </span>
            <ThemeToggle />
          </div> */}

          <Separator />

          {/* Auth section */}
          <div className="px-4 py-4">
            {!user ? (
              <CTAButton className="w-full" />
            ) : (
              <div className="space-y-1">
                <div className="flex items-center gap-3 rounded-md px-2 py-2">
                  <UserAvatar user={user} className="size-9" />
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-semibold text-foreground">
                      {user.name}
                    </p>
                    <p className="truncate text-[11px] text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>

                <MobileItem href="/dashboard" onClick={close}>
                  <LayoutDashboard className="size-4" />
                  Dashboard
                </MobileItem>
                <MobileItem href="/settings" onClick={close}>
                  <Settings className="size-4" />
                  Settings
                </MobileItem>
                {user.role === "admin" && (
                  <MobileItem href="/admin" onClick={close}>
                    <Shield className="size-4" />
                    Admin
                  </MobileItem>
                )}

                <button
                  onClick={() => signOut()}
                  className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-[13px] text-destructive transition-colors hover:bg-destructive/10"
                  data-testid="mobile-signout"
                >
                  <LogOut className="size-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function MobileItem({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-[13px] text-foreground/80 no-underline transition-colors hover:bg-muted hover:text-foreground"
    >
      {children}
    </a>
  );
}
