"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, LayoutDashboard, LogOut, ArrowRight } from "lucide-react";
import { CrewcastMark } from "@/components/brand/CrewcastLogo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const navLinks = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Product",      href: "/#features"     },
  { label: "Domains",      href: "/domains"        },
  { label: "Open roles",   href: "/jobs"           },
];

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;

  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [hidden,      setHidden]      = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled,    setScrolled]    = useState(false);

  const pathname    = usePathname();
  const hideNavbar  =
    pathname.startsWith("/form")      ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin");

  useEffect(() => {
    if (hideNavbar) return;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > lastScrollY && y > 80);
      setLastScrollY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY, hideNavbar]);

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

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 transition-transform duration-300"
      style={{ transform: hidden ? "translateY(-100%)" : "translateY(0)" }}
    >
      {/* â”€â”€ Main bar â”€â”€ */}
      <div
        style={{
          borderBottom:      scrolled ? "0.5px solid var(--lc-border)" : "0.5px solid transparent",
          background:        scrolled ? "color-mix(in srgb, var(--lc-bg) 92%, transparent)" : "transparent",
          backdropFilter:    scrolled ? "blur(12px)"                   : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)"                : "none",
          transition: "border-color 0.2s, background 0.2s",
        }}
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-3 md:px-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <CrewcastMark className="size-7 rounded-[5px] bg-transparent p-0" />
            <span
              className="text-[16px] font-bold"
              style={{ fontFamily: "var(--lc-sans)", color: "var(--lc-text)" }}
            >
              Crewcast
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="px-3.5 py-2 rounded-[6px] text-[13px] font-medium no-underline transition-colors duration-150"
                style={{ fontFamily: "var(--lc-sans)", color: "var(--lc-text-2)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lc-text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--lc-text-2)")}
              >
                {l.label}
              </Link>
            ))}

            {(user as any)?.role === "admin" && (
              <Link
                href="/admin"
                className="px-3.5 py-2 rounded-[6px] text-[13px] font-medium no-underline transition-colors duration-150"
                style={{ color: "var(--lc-text-3)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lc-text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--lc-text-3)")}
              >
                Admin
              </Link>
            )}

            <ThemeToggle compact />

            <div className="mx-3 h-4 w-px" style={{ background: "var(--lc-border)" }} />

            {!user ? (
              <button
                onClick={() => signIn("google")}
                className="lc-btn-primary flex items-center gap-2 !py-2 !px-4 !text-[13px]"
              >
                Start hiring <ArrowRight size={13} />
              </button>
            ) : (
              <ProfileMenu
                user={user}
                open={profileOpen}
                onToggle={() => setProfileOpen((v) => !v)}
                onClose={() => setProfileOpen(false)}
              />
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-[6px] border transition-colors"
            style={{
              border:     "0.5px solid var(--lc-border)",
              background: "var(--lc-bg-1)",
              color:      "var(--lc-text-2)",
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </div>

      {/* â”€â”€ Mobile menu â”€â”€ */}
      {mobileOpen && (
        <div
          className="md:hidden border-b"
          style={{
            background:           "color-mix(in srgb, var(--lc-bg) 97%, transparent)",
            backdropFilter:       "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderColor:          "var(--lc-border)",
          }}
        >
          <div className="mx-auto max-w-[1100px] space-y-0.5 px-6 py-4">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="flex w-full px-3 py-2.5 rounded-[6px] text-[13px] no-underline transition-colors"
                style={{ color: "var(--lc-text-3)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lc-text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--lc-text-3)")}
              >
                {l.label}
              </Link>
            ))}

            {(user as any)?.role === "admin" && (
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className="flex w-full px-3 py-2.5 rounded-[6px] text-[13px] no-underline"
                style={{ color: "var(--lc-text-3)" }}
              >
                Admin
              </Link>
            )}

            <div className="pt-3 mt-1 border-t" style={{ borderColor: "var(--lc-border)" }}>
              <div className="mb-3 flex items-center justify-between px-3">
                <span className="text-[12px] font-medium" style={{ color: "var(--lc-text-2)" }}>
                  Theme
                </span>
                <ThemeToggle compact />
              </div>

              {!user ? (
                <button
                  onClick={() => signIn("google")}
                  className="lc-btn-primary flex items-center justify-center gap-2 w-full !py-3 !text-[13px]"
                >
                  Start hiring <ArrowRight size={13} />
                </button>
              ) : (
                <MobileUserSection user={user} onClose={() => setMobileOpen(false)} />
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

/* â”€â”€â”€ Profile dropdown (desktop) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function ProfileMenu({
  user,
  open,
  onToggle,
  onClose,
}: {
  user: NonNullable<ReturnType<typeof useSession>["data"]>["user"];
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  return (
    <div className="relative" data-profile-menu>
      <button
        onClick={onToggle}
        className="flex items-center gap-2 rounded-[6px] border px-3 py-2 transition-colors"
        style={{ border: "0.5px solid var(--lc-border)", background: "var(--lc-bg-1)" }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--lc-border-hover)")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--lc-border)")}
      >
        {user?.image ? (
          <Image src={user.image} alt="profile" width={22} height={22} className="rounded-[4px]" />
        ) : (
          <div
            className="flex size-[22px] items-center justify-center rounded-[4px] text-[10px] font-bold"
            style={{ background: "var(--lc-bg-3)", color: "var(--lc-text-2)" }}
          >
            {user?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
        )}
        <span
          className="text-[12px] font-medium"
          style={{ color: "var(--lc-text-2)" }}
        >
          {user?.name?.split(" ")[0]?.toLowerCase()}
        </span>
        <ChevronDown
          size={11}
          style={{
            color:      "var(--lc-text-3)",
            transform:  open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.15s",
          }}
        />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-1.5 w-52 rounded-[8px] border overflow-hidden"
          style={{
            background:  "var(--lc-bg-1)",
            border:      "0.5px solid var(--lc-border)",
            boxShadow:   "0 8px 40px rgba(0,0,0,0.7)",
          }}
        >
          {/* User info */}
          <div className="px-4 py-3 border-b" style={{ borderColor: "var(--lc-border)" }}>
            <p className="text-[12px] font-semibold" style={{ color: "var(--lc-text)" }}>
              {user?.name}
            </p>
            <p className="text-[11px] mt-0.5 truncate" style={{ color: "var(--lc-text-3)" }}>
              {user?.email}
            </p>
          </div>

          {/* Items */}
          <div className="p-1">
            <DropdownItem
              href="/dashboard"
              icon={<LayoutDashboard size={12} />}
              label="Dashboard"
              onClick={onClose}
            />
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2.5 w-full px-3 py-2 rounded-[5px] text-[12px] transition-colors"
              style={{ color: "var(--lc-danger)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(204,51,51,0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <LogOut size={12} /> Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* â”€â”€â”€ Mobile user section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function MobileUserSection({
  user,
  onClose,
}: {
  user: NonNullable<ReturnType<typeof useSession>["data"]>["user"];
  onClose: () => void;
}) {
  return (
    <div className="space-y-0.5">
      <div className="flex items-center gap-3 px-3 py-2">
        {user?.image ? (
          <Image src={user.image} alt="profile" width={28} height={28} className="rounded-[6px]" />
        ) : (
          <div
            className="w-7 h-7 rounded-[6px] flex items-center justify-center text-[11px] font-bold"
            style={{ background: "var(--lc-bg-3)", color: "var(--lc-text-2)" }}
          >
            {user?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
        )}
        <div>
          <p className="text-[12px] font-semibold" style={{ color: "var(--lc-text)" }}>
            {user?.name}
          </p>
          <p className="text-[10px] mt-0.5 truncate" style={{ color: "var(--lc-text-3)" }}>
            {user?.email}
          </p>
        </div>
      </div>

      <Link
        href="/dashboard"
        onClick={onClose}
        className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-[6px] text-[13px] no-underline transition-colors"
        style={{ color: "var(--lc-text-2)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lc-text)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--lc-text-2)")}
      >
        <LayoutDashboard size={13} /> Dashboard
      </Link>

      <button
        onClick={() => signOut()}
        className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-[6px] text-[13px] transition-colors"
        style={{ color: "var(--lc-danger)" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(204,51,51,0.08)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <LogOut size={13} /> Sign out
      </button>
    </div>
  );
}

/* â”€â”€â”€ Dropdown link item â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
      className="flex items-center gap-2.5 w-full px-3 py-2 rounded-[5px] text-[12px] no-underline transition-colors"
      style={{ color: "var(--lc-text-2)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--lc-bg-2)";
        e.currentTarget.style.color      = "var(--lc-text)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color      = "var(--lc-text-2)";
      }}
    >
      {icon}
      {label}
    </Link>
  );
}

