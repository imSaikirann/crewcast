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

  // scroll behavior
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);


  const pathname = usePathname();

  const hideNavbar = pathname.startsWith("/form");

  if (hideNavbar) return null;


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHidden(true); // scrolling down
      } else {
        setHidden(false); // scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);



  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 bg-white/70 dark:bg-background/70 backdrop-blur-md font-inter transition-transform duration-300
      ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <h1 className="text-2xl font-bold tracking-tight group-hover:text-black transition font-mono">
            crewcast
          </h1>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground">
          <DarkModeToggle />

          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="text-sm text-muted-foreground hover:text-primary transition"
            >
              Admin
            </Link>
          )}

          {!user && (
            <button
              onClick={() => signIn("google")}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
            >
              Get Started
            </button>
          )}

          {user && (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition"
              >
                <Image
                  src={user.image || "/default-avatar.png"}
                  alt="profile"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 bg-card border border-border rounded-xl shadow-lg w-60 p-2 text-sm">
                  <p className="px-3 py-2 text-foreground">{user.name}</p>
                  <p className="px-3 pb-2 text-muted-foreground text-xs">
                    {user.email}
                  </p>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-3 py-2 text-destructive hover:bg-destructive/10 rounded-md transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE MENU ICON */}
        <div className="md:hidden flex items-center gap-2">
          <DarkModeToggle />
          <button onClick={() => setOpen(!open)}>
            {open ? (
              <HugeIcon name="cancel" className="w-6 h-6 text-foreground" />
            ) : (
              <HugeIcon name="menu" className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden bg-card/90 backdrop-blur-xl border-b border-border transition-all overflow-hidden
        ${open ? "max-h-64 py-4" : "max-h-0 py-0"}`}
      >
        <div className="flex flex-col gap-3 px-6 text-foreground font-medium">
          {!user && (
            <button
              onClick={() => signIn("google")}
              className="text-left hover:text-primary transition"
            >
              Login
            </button>
          )}

          {user && (
            <>
              <div className="flex items-center gap-3 mt-1">
                <Image
                  src={user.image || "/default-avatar.png"}
                  alt="profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <button
                onClick={() => signOut()}
                className="text-left text-destructive hover:text-destructive/80 transition"
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <button
              onClick={() => signIn("google")}
              className="mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
