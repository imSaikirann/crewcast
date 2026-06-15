"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

import { CrewcastMark } from "@/components/brand/CrewcastLogo"; // ✅ YOUR LOGO
import { navLinks } from "./navLinks";
import ProfileMenu from "./ProfileMenu";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background text-foreground">

      <div className="mx-auto max-w-[1100px] px-5">

        {/* Top bar */}
        <div className="flex items-center justify-between h-16">

          {/* ✅ Logo (FIXED) */}
          <Link href="/" className="flex items-center gap-2.5">
            <CrewcastMark className="size-6" />
            <span className="text-[15px] font-semibold tracking-tight">
              Crewcast
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-[13px]">
            {navLinks.map((l) => {
              const active = pathname === l.href;

              return (
                <Link
                  key={l.label}
                  href={l.href}
                  className={`relative transition ${
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l.label}

                  {/* subtle underline */}
                  {active && (
                    <span className="absolute left-0 -bottom-1 h-[1px] w-full bg-foreground" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <button
                onClick={() => signIn("google")}
                className="text-[13px] font-medium text-foreground"
              >
                Sign in
              </button>
            ) : (
              <ProfileMenu user={user} />
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-1"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Clean divider (no glass) */}
        <div className="h-px bg-border" />
      </div>

      {/* Mobile */}
      {open && (
        <MobileMenu
          user={user}
          onClose={() => setOpen(false)}
        />
      )}
    </header>
  );
}
