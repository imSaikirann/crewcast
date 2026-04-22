"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, LayoutDashboard, LogOut, ArrowRight } from "lucide-react";
import { CrewcastMark } from "@/components/brand/CrewcastLogo";

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;

  const [mobileOpen, setMobileOpen] = useState(false);
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
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > lastScrollY && y > 80);
      setLastScrollY(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, hideNavbar]);

  // Close profile on outside click
  useEffect(() => {
    if (!profileOpen) return;
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-profile-menu]"))
        setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [profileOpen]);

  if (hideNavbar) return null;

  const navLinks = [
    { label: "How Crewcast works", href: "/#how-it-works" },
    { label: "Product", href: "/#features" },
    { label: "Open roles", href: "/jobs" },
  ];

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 transition-transform duration-300"
      style={{
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
      }}
    >
      {/* Bar */}
      <div
        style={{
          borderBottom: scrolled ? "1px solid var(--lc-border)" : "1px solid transparent",
          background: scrolled ? "rgba(10,10,10,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "border-color 0.2s, background 0.2s",
        }}
      >
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-6">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 no-underline">
            <CrewcastMark className="h-9 w-9 rounded-lg bg-transparent p-0" />
            <span className="font-display text-[17px] font-semibold tracking-tight" style={{ color: "var(--lc-text)" }}>
              Crewcast
            </span>
          </Link>

          {/* ── Desktop links ── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="rounded-lg px-3.5 py-2 text-[14px] font-medium transition-colors no-underline"
                style={{ color: "var(--lc-text-2)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lc-text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--lc-text-2)")}
              >
                {l.label}
              </Link>
            ))}

            {user?.role === "admin" && (
              <Link
                href="/admin"
                className="rounded-lg px-3.5 py-2 text-[14px] font-medium transition-colors no-underline"
                style={{ color: "var(--lc-text-2)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lc-text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--lc-text-2)")}
              >
                Admin
              </Link>
            )}

            <div className="mx-3 h-4 w-px" style={{ background: "var(--lc-border)" }} />

            {/* Auth state */}
            {!user ? (
              <button
                onClick={() => signIn("google")}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-[14px] font-semibold transition-opacity hover:opacity-90"
                style={{ background: "var(--lc-accent)", color: "var(--lc-accent-text)" }}
              >
                Start hiring <ArrowRight size={14} />
              </button>
            ) : (
              <div className="relative" data-profile-menu>
                <button
                  onClick={() => setProfileOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-lg border px-3 py-2 transition-colors"
                  style={{ border: "1px solid var(--lc-border)", background: "var(--lc-bg-1)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--lc-border-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--lc-border)")}
                >
                  {user.image ? (
                    <Image src={user.image} alt="profile" width={24} height={24} className="rounded-md" />
                  ) : (
                    <div
                      className="flex size-6 items-center justify-center rounded-md text-[11px] font-medium"
                      style={{ background: "var(--lc-accent-dim)", color: "var(--lc-accent)" }}
                    >
                      {user.name?.[0]?.toUpperCase() ?? "U"}
                    </div>
                  )}
                  <span className="text-[13px] font-medium" style={{ color: "var(--lc-text-2)" }}>
                    {user.name?.split(" ")[0]?.toLowerCase()}
                  </span>
                  <ChevronDown
                    size={12}
                    style={{
                      color: "var(--lc-text-3)",
                      transform: profileOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.15s",
                    }}
                  />
                </button>

                {profileOpen && (
                  <div
                    className="absolute right-0 mt-1.5 w-52 rounded-xl border overflow-hidden"
                    style={{
                      background: "var(--lc-bg-1)",
                      border: "1px solid var(--lc-border)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
                    }}
                  >
                    <div className="px-4 py-3 border-b" style={{ borderColor: "var(--lc-border)" }}>
                      <p className="text-[12px] font-medium" style={{ color: "var(--lc-text)" }}>
                        {user.name}
                      </p>
                      <p className="text-[11px] mt-0.5 truncate" style={{ color: "var(--lc-text-3)" }}>
                        {user.email}
                      </p>
                    </div>
                    <div className="p-1">
                      <DropdownItem
                        href="/dashboard"
                        icon={<LayoutDashboard size={13} />}
                        label="Dashboard"
                        onClick={() => setProfileOpen(false)}
                      />
                      <button
                        onClick={() => signOut()}
                        className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-[12px] transition-colors"
                        style={{ color: "var(--lc-danger)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,68,68,0.08)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <LogOut size={13} /> Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg border transition-colors"
            style={{ border: "1px solid var(--lc-border)", background: "var(--lc-bg-1)", color: "var(--lc-text-2)" }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div
          className="md:hidden border-b"
          style={{
            background: "rgba(10,10,10,0.96)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderColor: "var(--lc-border)",
          }}
        >
          <div className="mx-auto max-w-[1180px] space-y-1 px-6 py-4">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="flex w-full px-3 py-2.5 rounded-lg text-[13px] transition-colors no-underline"
                style={{ color: "var(--lc-text-2)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lc-text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--lc-text-2)")}
              >
                {l.label}
              </Link>
            ))}

            {user?.role === "admin" && (
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className="flex w-full px-3 py-2.5 rounded-lg text-[13px] no-underline"
                style={{ color: "var(--lc-text-2)" }}
              >
                Admin
              </Link>
            )}

            <div className="pt-3 mt-1 border-t" style={{ borderColor: "var(--lc-border)" }}>
              {!user ? (
                <button
                  onClick={() => signIn("google")}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-[13px] font-medium transition-opacity hover:opacity-90"
                  style={{ background: "var(--lc-accent)", color: "var(--lc-accent-text)" }}
                >
                  Start hiring <ArrowRight size={14} />
                </button>
              ) : (
                <div className="space-y-0.5">
                  {/* User info row */}
                  <div className="flex items-center gap-3 px-3 py-2">
                    {user.image ? (
                      <Image src={user.image} alt="profile" width={28} height={28} className="rounded-lg" />
                    ) : (
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-medium"
                        style={{ background: "var(--lc-accent-dim)", color: "var(--lc-accent)" }}
                      >
                        {user.name?.[0]?.toUpperCase() ?? "U"}
                      </div>
                    )}
                    <div>
                      <p className="text-[12px] font-medium" style={{ color: "var(--lc-text)" }}>
                        {user.name}
                      </p>
                      <p className="text-[10px] mt-0.5 truncate" style={{ color: "var(--lc-text-3)" }}>
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-[13px] no-underline transition-colors"
                    style={{ color: "var(--lc-text-2)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lc-text)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--lc-text-2)")}
                  >
                    <LayoutDashboard size={14} /> Dashboard
                  </Link>

                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-[13px] transition-colors"
                    style={{ color: "var(--lc-danger)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,68,68,0.08)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <LogOut size={14} /> Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Small helper ──────────────────────────────────────────────────────────
function DropdownItem({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-[12px] transition-colors no-underline"
      style={{ color: "var(--lc-text-2)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--lc-bg-2)";
        e.currentTarget.style.color = "var(--lc-text)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "var(--lc-text-2)";
      }}
    >
      {icon}
      {label}
    </Link>
  );
}
