"use client";

import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { navLinks } from "./nav-config";
import { NavLink } from "./nav-link";
import { CTAButton } from "./cta-button";
import { ProfileMenu } from "./profile-menu";

type SessionUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
} | null;

export function DesktopNav({ user }: { user: SessionUser }) {
  return (
    <div className="hidden items-center gap-0.5 md:flex">
      {navLinks.map((l) => (
        <NavLink key={l.href} href={l.href}>
          {l.label}
        </NavLink>
      ))}

      {user?.role === "admin" && (
        <NavLink href="/admin" className="text-muted-foreground/70">
          Admin
        </NavLink>
      )}

      {/* <ThemeToggle /> */}

      <Separator orientation="vertical" className="mx-2 h-4" />

      {!user ? <CTAButton /> : <ProfileMenu user={user} />}
    </div>
  );
}