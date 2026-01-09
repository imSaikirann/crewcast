"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { HugeIcon } from "@/utils/hugeicons";
import { DarkModeToggle } from "@/components/marketing/DarkModeToggle";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const pathname = usePathname();
  const hideNavbar = pathname.startsWith("/form");

  // ✅ Hooks must ALWAYS run
  useEffect(() => {
    if (hideNavbar) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, hideNavbar]);

  // ✅ Only JSX is conditional, not hooks
  if (hideNavbar) return null;

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 bg-white/70 dark:bg-background/70 backdrop-blur-md transition-transform duration-300
      ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="max-w-7xl mx-auto px-6  h-16 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-3 group">
          <h1 className="text-2xl font-bold tracking-tight group-hover:text-black transition font-mono">
            crewcast
          </h1>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground">
          <DarkModeToggle />

          {user?.role === "admin" && (
            <Link href="/admin" className="text-muted-foreground hover:text-primary transition">
              Admin
            </Link>
          )}

          {!user && (
            <button
              onClick={() => signIn("google")}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Get Started
            </button>
          )}

          {user && (
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)}>
                <Image
                  src={user.image || "/default-avatar.png"}
                  alt="profile"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 bg-card border border-border rounded-xl shadow-lg w-60 p-2">
                  <p className="px-3 py-2">{user.name}</p>
                  <p className="px-3 pb-2 text-xs text-muted-foreground">{user.email}</p>
                  
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-3 py-2 text-destructive hover:bg-destructive/10 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center gap-2">
          <DarkModeToggle />
          <button onClick={() => setOpen(!open)}>
            {open ? <HugeIcon name="cancel" /> : <HugeIcon name="menu" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
