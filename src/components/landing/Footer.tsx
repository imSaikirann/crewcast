import Link from "next/link";
import { CrewcastWordmark } from "@/components/brand/CrewcastLogo";

const links = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Open roles", href: "/jobs" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Features", href: "/#features" },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.745 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--landing-border)] bg-[var(--landing-bg)]">
      {/* Subtle dot grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--landing-text) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Accent glow top-left */}
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-64 w-64 rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--landing-accent)" }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        {/* Big display headline */}
        <div className="overflow-hidden border-b border-[var(--landing-border)] py-12 sm:py-16">
          <p
            className="font-display font-semibold leading-none tracking-tight text-[var(--landing-accent)]"
            style={{ fontSize: "clamp(3.2rem,12vw,8.5rem)" }}
          >
            Hire your crew.
          </p>
          <p
            className="mt-1 font-display font-semibold leading-none tracking-tight opacity-20"
            style={{
              fontSize: "clamp(3.2rem,12vw,8.5rem)",
              color: "var(--landing-text)",
              WebkitTextStroke: "1px var(--landing-text)",
              WebkitTextFillColor: "transparent",
            }}
          >
            Ship faster.
          </p>
        </div>

        {/* Middle row: brand + nav + socials */}
        <div className="grid grid-cols-1 gap-10 py-10 sm:grid-cols-3 sm:gap-6">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <CrewcastWordmark />
            <p className="max-w-[18ch] font-body text-sm leading-relaxed text-[var(--landing-subtle)]">
              GitHub-first hiring forms for engineering teams.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-1">
            <p className="mb-2 font-body text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--landing-muted)]">
              Navigation
            </p>
            {links.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex w-fit items-center gap-1.5 font-body text-sm text-[var(--landing-muted)] transition-colors duration-150 hover:text-[var(--landing-text)]"
              >
                <span
                  className="inline-block h-px w-0 bg-[var(--landing-accent)] transition-all duration-200 group-hover:w-3"
                />
                {item.label}
              </Link>
            ))}
          </div>

          {/* Social + CTA */}
          <div className="flex flex-col gap-4">
            <p className="font-body text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--landing-muted)]">
              Connect
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--landing-border)] text-[var(--landing-muted)] transition-all duration-150 hover:border-[var(--landing-accent)] hover:text-[var(--landing-accent)]"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <a
              href="/jobs"
              className="mt-auto inline-flex w-fit items-center gap-2 rounded-md border border-[var(--landing-accent)] px-4 py-2 font-body text-sm font-medium text-[var(--landing-accent)] transition-all duration-150 hover:bg-[var(--landing-accent)] hover:text-[var(--landing-bg)]"
            >
              Browse open roles
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-2 border-t border-[var(--landing-border)] py-5 font-body text-xs text-[var(--landing-subtle)] sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Crewcast. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p>Public GitHub data only.</p>
            <span className="hidden h-3 w-px bg-[var(--landing-border)] sm:block" />
            <Link href="/privacy" className="hover:text-[var(--landing-text)] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[var(--landing-text)] transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}