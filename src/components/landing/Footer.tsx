import Link from "next/link";

const GitHubMark = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" className={`fill-current ${className}`} aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

const links = {
  Product: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Browse jobs", href: "/jobs" },
    { label: "How it works", href: "/#how-it-works" },
  ],
  Platform: [
    { label: "Admin panel", href: "/admin" },
    { label: "Domain setup", href: "/admin/domains" },
    { label: "Analytics", href: "/admin/analytics" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[var(--landing-border)] bg-[var(--landing-bg)] px-5 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <GitHubMark className="h-5 w-5 text-[var(--landing-text)]" />
              <span className="font-mono-hero text-lg font-bold text-[var(--landing-text)]">Crewcast</span>
            </div>
            <p className="font-body max-w-xs text-sm leading-6 text-[var(--landing-subtle)]">
              GitHub-first hiring forms for software teams. Score real engineering work, not just resumes.
            </p>
            <p className="font-mono-hero text-xs text-[var(--landing-border)]">
              // built for technical hiring
            </p>
          </div>

          {/* Link groups */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group} className="space-y-4">
              <p className="font-mono-hero text-[10px] uppercase tracking-widest text-[var(--landing-subtle)]">{group}</p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="font-body text-sm text-[var(--landing-muted)] transition-colors hover:text-[var(--landing-text)]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--landing-border)] pt-8 sm:flex-row">
          <p className="font-body text-xs text-[var(--landing-subtle)]">
            © {new Date().getFullYear()} Crewcast. All rights reserved.
          </p>
          <p className="font-mono-hero text-xs text-[var(--landing-border)]">
            GitHub data used is public only.
          </p>
        </div>
      </div>
    </footer>
  );
}
