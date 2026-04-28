"use client";

import { LayoutDashboard, LogOut, ChevronDown, Settings, Shield } from "lucide-react";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "./user-avatar";

type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
};

export function ProfileMenu({ user }: { user: User }) {
  const firstName = user?.name?.split(" ")[0] ?? "Account";
  const isAdmin = user?.role === "admin";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="group flex items-center gap-2 rounded-md border border-border bg-card px-2 py-1.5 outline-none transition-colors hover:border-foreground/20 focus-visible:ring-2 focus-visible:ring-ring"
        data-testid="nav-profile-trigger"
      >
        <UserAvatar user={user} className="size-6" />
        <span className="text-[12px] font-medium text-foreground/80 group-hover:text-foreground">
          {firstName.toLowerCase()}
        </span>
        <ChevronDown className="size-3 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-64 rounded-xl border-border/80 bg-popover/95 p-1.5 shadow-2xl backdrop-blur-xl"
      >
        {/* v0-style header */}
        <DropdownMenuLabel className="flex items-center gap-3 px-2.5 py-2.5">
          <UserAvatar user={user} className="size-9" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-foreground">
              {user?.name}
            </p>
            <p className="truncate text-[11px] font-normal text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="cursor-pointer rounded-md px-2.5 py-2 text-[12.5px]">
          <a href="/dashboard">
            <LayoutDashboard className="mr-2 size-3.5" />
            Dashboard
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer rounded-md px-2.5 py-2 text-[12.5px]">
          <a href="/settings">
            <Settings className="mr-2 size-3.5" />
            Settings
          </a>
        </DropdownMenuItem>

        {isAdmin && (
          <DropdownMenuItem asChild className="cursor-pointer rounded-md px-2.5 py-2 text-[12.5px]">
            <a href="/admin">
              <Shield className="mr-2 size-3.5" />
              Admin
            </a>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => signOut()}
          className="cursor-pointer rounded-md px-2.5 py-2 text-[12.5px] text-destructive focus:bg-destructive/10 focus:text-destructive"
          data-testid="nav-signout"
        >
          <LogOut className="mr-2 size-3.5" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}