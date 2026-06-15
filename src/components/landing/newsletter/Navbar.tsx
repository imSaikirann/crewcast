"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { label: "How it works", href: "#features" },
  { label: "Why Crewcast", href: "#benefits" },
  { label: "Stories", href: "#testimonials" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md transition-colors duration-200 ${
        scrolled ? "border-b border-neutral-100" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="inline-flex items-center"
          aria-label="Crewcast home"
        >
          <Image
            src="/logo.png"
            alt="Crewcast"
            width={32}
            height={32}
            priority
            className="h-8 w-8 rounded-md object-contain"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-sora text-sm text-neutral-500 transition-colors hover:text-neutral-900"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#get-started"
          className="font-sora inline-flex items-center rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
        >
          Get started
        </a>
      </nav>
    </header>
  );
}
