"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DarkModeToggle } from "@/components/marketing/DarkModeToggle";
import { HugeIcon } from "@/utils/hugeicons";

const GitHubMark = () => (
  <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current text-[var(--landing-text)]" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const hideNavbar =
    pathname.startsWith("/form") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin");

  useEffect(() => {
    if (hideNavbar) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
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

  if (hideNavbar) return null;

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        {/* Border bottom appears on scroll */}
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? "border-b border-[var(--landing-border)] bg-[color-mix(in_srgb,var(--landing-bg)_90%,transparent)] backdrop-blur-md"
              : "bg-transparent"
          }`}
        >
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2.5">
              <GitHubMark />
              <span className="nav-mono text-lg font-bold tracking-tight text-[var(--landing-text)]">
                crewcast<span className="cursor-blink text-[var(--landing-muted)]">▋</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden items-center gap-1 md:flex">
              <Link
                href="/jobs"
                className="nav-mono rounded-sm px-3 py-2 text-xs text-[var(--landing-muted)] transition-colors hover:bg-[var(--landing-panel)] hover:text-[var(--landing-text)]"
              >
                browse jobs
              </Link>

              {user?.role === "admin" && (
                <Link
                  href="/admin"
                  className="nav-mono rounded-sm px-3 py-2 text-xs text-[var(--landing-muted)] transition-colors hover:bg-[var(--landing-panel)] hover:text-[var(--landing-text)]"
                >
                  admin
                </Link>
              )}

              <div className="mx-3 h-4 w-px bg-[var(--landing-border)]" />

              <DarkModeToggle />

              {!user && (
                <button
                  onClick={() => signIn("google")}
                  className="nav-mono ml-2 rounded-sm bg-[var(--landing-accent)] px-4 py-2 text-xs font-bold text-[var(--landing-bg)] transition-colors hover:bg-[var(--landing-accent-strong)]"
                >
                  get started →
                </button>
              )}

              {user && (
                <div className="relative ml-2">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 rounded-sm border border-[var(--landing-border)] bg-[var(--landing-panel)] px-3 py-1.5 transition-colors hover:border-[var(--landing-muted)]"
                  >
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt="profile"
                        width={22}
                        height={22}
                        className="rounded-sm"
                      />
                    ) : (
                      <div className="flex h-[22px] w-[22px] items-center justify-center rounded-sm bg-[var(--landing-accent-soft)] nav-mono text-[10px] font-bold text-[var(--landing-text)]">
                        {user.name?.[0]?.toUpperCase() ?? "U"}
                      </div>
                    )}
                    <span className="nav-mono text-xs text-[var(--landing-muted)]">
                      {user.name?.split(" ")[0]?.toLowerCase()}
                    </span>
                    <span className="nav-mono text-[10px] text-[var(--landing-subtle)]">▾</span>
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-1 w-56 rounded-sm border border-[var(--landing-border)] bg-[var(--landing-panel)] shadow-lg">
                      <div className="border-b border-[var(--landing-border)] px-4 py-3">
                        <p className="nav-mono text-xs font-semibold text-[var(--landing-text)]">{user.name}</p>
                        <p className="nav-mono mt-0.5 text-[10px] text-[var(--landing-subtle)]">{user.email}</p>
                      </div>
                      <div className="p-1">
                        <Link
                          href="/dashboard"
                          className="nav-mono flex w-full items-center gap-2 rounded-sm px-3 py-2 text-xs text-[var(--landing-muted)] transition-colors hover:bg-[var(--landing-panel-strong)] hover:text-[var(--landing-text)]"
                          onClick={() => setProfileOpen(false)}
                        >
                          dashboard →
                        </Link>
                        <button
                          onClick={() => signOut()}
                          className="nav-mono flex w-full items-center gap-2 rounded-sm px-3 py-2 text-xs text-[var(--landing-danger)] transition-colors hover:bg-[var(--landing-accent-soft)]"
                        >
                          sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile controls */}
            <div className="flex items-center gap-2 md:hidden">
              <DarkModeToggle />
              <button
                onClick={() => setOpen(!open)}
                className="rounded-sm border border-[var(--landing-border)] bg-[var(--landing-panel)] p-2 text-[var(--landing-muted)] transition-colors hover:border-[var(--landing-muted)]"
                aria-label="Toggle menu"
              >
                {open ? <HugeIcon name="cancel" /> : <HugeIcon name="menu" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-b border-[var(--landing-border)] bg-[color-mix(in_srgb,var(--landing-bg)_95%,transparent)] backdrop-blur-md md:hidden">
            <div className="mx-auto max-w-7xl space-y-1 px-6 py-4">
              <Link
                href="/jobs"
                className="nav-mono flex w-full rounded-sm px-3 py-2.5 text-sm text-[var(--landing-muted)] transition-colors hover:bg-[var(--landing-panel)] hover:text-[var(--landing-text)]"
                onClick={() => setOpen(false)}
              >
                browse jobs
              </Link>

              {user?.role === "admin" && (
                <Link
                  href="/admin"
                  className="nav-mono flex w-full rounded-sm px-3 py-2.5 text-sm text-[var(--landing-muted)] transition-colors hover:bg-[var(--landing-panel)] hover:text-[var(--landing-text)]"
                  onClick={() => setOpen(false)}
                >
                  admin panel
                </Link>
              )}

              <div className="pt-2">
                {!user ? (
                  <button
                    onClick={() => signIn("google")}
                    className="nav-mono w-full rounded-sm bg-[var(--landing-accent)] px-4 py-3 text-sm font-bold text-[var(--landing-bg)] transition-colors hover:bg-[var(--landing-accent-strong)]"
                  >
                    get started →
                  </button>
                ) : (
                  <div className="space-y-1 border-t border-[var(--landing-border)] pt-3">
                    <div className="flex items-center gap-3 px-3 py-2">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt="profile"
                          width={28}
                          height={28}
                          className="rounded-sm"
                        />
                      ) : (
                        <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-[var(--landing-accent-soft)] nav-mono text-xs font-bold text-[var(--landing-text)]">
                          {user.name?.[0]?.toUpperCase() ?? "U"}
                        </div>
                      )}
                      <div>
                        <p className="nav-mono text-xs font-semibold text-[var(--landing-text)]">{user.name}</p>
                        <p className="nav-mono text-[10px] text-[var(--landing-subtle)]">{user.email}</p>
                      </div>
                    </div>
                    <Link
                      href="/dashboard"
                      className="nav-mono flex w-full rounded-sm px-3 py-2.5 text-sm text-[var(--landing-muted)] transition-colors hover:bg-[var(--landing-panel)] hover:text-[var(--landing-text)]"
                      onClick={() => setOpen(false)}
                    >
                      dashboard →
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="nav-mono flex w-full rounded-sm px-3 py-2.5 text-sm text-[var(--landing-danger)] transition-colors hover:bg-[var(--landing-accent-soft)]"
                    >
                      sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
