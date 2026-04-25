import Link from "next/link";
import { CrewcastMark } from "@/components/brand/CrewcastLogo";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.745 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t border-[var(--lc-border)]"
      style={{ background: "var(--lc-bg)" }}
    >
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--lc-grid) 1px, transparent 1px), linear-gradient(90deg, var(--lc-grid) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative mx-auto max-w-[1100px] px-6">

        {/* Hero CTA */}
        <div className="border-b border-[var(--lc-border)] py-16 text-center">
          <p
            className="font-extrabold leading-none text-[var(--lc-text)]"
            style={{
              fontFamily: "var(--lc-sans)",
              fontSize: "clamp(3rem, 10vw, 7.5rem)",
            }}
          >
            Hire with{" "}
            <em style={{ fontStyle: "italic", fontWeight: 300 }}>
              real signals.
            </em>
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/dashboard"
              className="lc-btn-primary inline-flex items-center gap-2"
            >
              Start hiring 
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center gap-5 py-8 sm:flex-row sm:justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <CrewcastMark className="size-6 rounded-[4px]" />
            <span className="text-[15px] font-bold text-[var(--lc-text)]">
              Crewcast
            </span>
          </div>

          {/* Copyright + Credit */}
          <div className="text-center sm:text-left order-last sm:order-none space-y-1">
            {/* <p className="text-[11px] text-[var(--lc-text-3)]">
              &copy; {new Date().getFullYear()} Crewcast. Public GitHub data only.
            </p> */}

            <p className="text-sm text-[var(--lc-text-4)]">
              Built by{" "}
              <a
                href="https://imsaikirann.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--lc-text-4)] hover:text-[var(--lc-text)] transition-colors underline-offset-2 hover:underline"
              >
                Sai Kiran
              </a>
            </p>
          </div>

          {/* Socials */}
          <div className="flex gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-[4px] border border-[var(--lc-border)] text-[var(--lc-text-3)] transition-all hover:border-[var(--lc-border-hover)] hover:text-[var(--lc-text)]"
              >
                {s.icon}
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}