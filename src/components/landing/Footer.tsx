
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CrewcastMark } from "@/components/brand/CrewcastLogo";
import { ThemeToggle } from "../theme/ThemeToggle";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.745 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const linkColumns = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Domains",      href: "/domains"       },
      { label: "Open roles",   href: "/jobs"          },
      { label: "Pricing",      href: "/pricing"       },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About",     href: "/about"   },
      { label: "Blog",      href: "/blog"    },
      { label: "Contact",   href: "/contact" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy",     href: "/privacy" },
      { label: "Terms",       href: "/terms"   },
      { label: "Security",    href: "/security" },
      { label: "Cookies",     href: "/cookies" },
    ],
  },
];


const WEEKS = 53;
const DAYS = 7;
const CELL = 12;
const GAP = 3;
const MOBILE_WEEKS = 52;
const MOBILE_DAYS = 28;
const MOBILE_CELL = 6;
const MOBILE_GAP = 2;
const COLORS = ["transparent", "#0e4429", "#006d32", "#26a641", "#39d353"];

const seeded = (i: number) => {
  const x = Math.sin(i * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};
const levelFor = (i: number) => {
  const r = seeded(i);
  if (r < 0.55) return 0;
  if (r < 0.78) return 1;
  if (r < 0.9)  return 2;
  if (r < 0.97) return 3;
  return 4;
};

const glowClassFor = (i: number) => {
  if ([87, 256, 693, 1210].includes(i)) return "cc-glow-cell cc-glow-cell-hot";
  if ([42, 198, 340, 912].includes(i)) return "cc-glow-cell cc-glow-cell-bright";
  return "cc-glow-cell";
};

function ContributionGraph() {
  const cells: React.ReactNode[] = [];
  const mobileCells: React.ReactNode[] = [];
  // Pick a few cells to "glow" â€” the active commits
  const glowCells = [42, 87, 134, 198, 256, 301, 340];

  for (let w = 0; w < WEEKS; w++) {
    for (let d = 0; d < DAYS; d++) {
      const i = w * DAYS + d;
      const lvl = levelFor(i);
      const bg = COLORS[lvl];
      const isGlow = glowCells.includes(i);
      cells.push(
        <rect
          key={i}
          x={w * (CELL + GAP)}
          y={d * (CELL + GAP)}
          width={CELL}
          height={CELL}
          rx={2.5}
          ry={2.5}
          fill={bg === "transparent" ? "none" : bg}
          stroke={lvl === 0 ? "hsl(var(--foreground) / 0.08)" : "none"}
          strokeWidth={1}
          className={isGlow ? glowClassFor(i) : ""}
          style={isGlow ? { animationDelay: `${(i % 7) * 0.42}s` } : undefined}
        />
      );
    }
  }

  for (let w = 0; w < MOBILE_WEEKS; w++) {
    for (let d = 0; d < MOBILE_DAYS; d++) {
      const i = w * MOBILE_DAYS + d;
      const lvl = levelFor(i);
      const bg = COLORS[lvl];
      const isGlow = glowCells.includes(i) || [478, 693, 912, 1210].includes(i);
      mobileCells.push(
        <rect
          key={i}
          x={w * (MOBILE_CELL + MOBILE_GAP)}
          y={d * (MOBILE_CELL + MOBILE_GAP)}
          width={MOBILE_CELL}
          height={MOBILE_CELL}
          rx={1.5}
          ry={1.5}
          fill={bg === "transparent" ? "none" : bg}
          stroke={lvl === 0 ? "hsl(var(--foreground) / 0.08)" : "none"}
          strokeWidth={1}
          className={isGlow ? glowClassFor(i) : ""}
          style={isGlow ? { animationDelay: `${(i % 9) * 0.34}s` } : undefined}
        />
      );
    }
  }

  const width = WEEKS * (CELL + GAP) - GAP;
  const height = DAYS * (CELL + GAP) - GAP;
  const mobileWidth = MOBILE_WEEKS * (MOBILE_CELL + MOBILE_GAP) - MOBILE_GAP;
  const mobileHeight = MOBILE_DAYS * (MOBILE_CELL + MOBILE_GAP) - MOBILE_GAP;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        opacity: 0.4,
        maskImage:
          "radial-gradient(ellipse 90% 80% at 50% 50%, var(--lc-bg) 40%, transparent 95%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 90% 80% at 50% 50%, var(--lc-bg) 40%, transparent 95%)",
      }}
    >
      <svg
        viewBox={`0 0 ${mobileWidth} ${mobileHeight}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full md:hidden"
      >
        {mobileCells}
      </svg>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 hidden h-full w-full md:block"
      >
        {cells}
      </svg>
    </div>
  );
}




export default function Footer() {
  return (
    <footer className="relative min-h-[420px] overflow-hidden border-t border-border bg-background">
      {/* Animation styles (scoped, no global CSS edits) */}
      <style jsx>{`
        :global(.cc-glow-cell) {
          transform-box: fill-box;
          transform-origin: center;
          animation: ccGlowCell 3.8s ease-in-out infinite;
          filter:
            drop-shadow(0 0 2px #39d35366)
            drop-shadow(0 0 8px #39d35333);
        }
        :global(.cc-glow-cell-bright) {
          animation-duration: 3.1s;
        }
        :global(.cc-glow-cell-hot) {
          animation-duration: 2.45s;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes ccGlowCell {
          0%,
          100% {
            fill: #0e4429;
            opacity: 0.72;
            filter:
              drop-shadow(0 0 0 #39d35300)
              drop-shadow(0 0 0 #39d35300);
          }
          35% {
            fill: #26a641;
            opacity: 0.9;
            filter:
              drop-shadow(0 0 4px #39d35388)
              drop-shadow(0 0 12px #39d35344);
          }
          50% {
            fill: #39d353;
            opacity: 1;
            filter:
              drop-shadow(0 0 7px #39d353dd)
              drop-shadow(0 0 18px #39d35366)
              drop-shadow(0 0 30px #39d35333);
          }
          68% {
            fill: #26a641;
            opacity: 0.9;
            filter:
              drop-shadow(0 0 4px #39d35388)
              drop-shadow(0 0 14px #39d35344);
          }
        }

        :global(.cc-glow-dot) {
          position: absolute;
          border-radius: 9999px;
          background: #39d353;
          box-shadow:
            0 0 8px #39d353aa,
            0 0 18px #39d35366,
            0 0 32px #39d35333;
          animation: ccGlowDot 3.2s ease-in-out infinite;
        }
        @keyframes ccGlowDot {
          0%, 100% { opacity: 0;   transform: scale(0.6); }
          50%      { opacity: 0.9; transform: scale(1);   }
        }
      `}</style>

      {/* Backgrounds */}
      <ContributionGraph />


 
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background/85"
      />

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-6">
    
        <div className="border-b border-border/70 py-14 text-center sm:py-20 md:py-24">
          {/* live status pill */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 backdrop-blur-md">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              Live Â· 1.2k commits indexed today
            </span>
          </div>

          <h2
            className="font-extrabold leading-[0.95] tracking-[-0.04em] text-foreground"
            style={{ fontSize: "clamp(2.25rem, 9vw, 7rem)" }}
          >
            Hire with{" "}
            <em className="font-light italic text-foreground/80">real signals.</em>
          </h2>

          <p className="mx-auto mt-5 max-w-[480px] text-[13.5px] leading-relaxed text-muted-foreground sm:text-[14px]">
  
            See what candidates actually ship -  every PR, every test, every refactor.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-2.5 text-[13px] font-bold tracking-[0.02em] text-background transition-all hover:-translate-y-0.5 hover:shadow-lg"
              data-testid="footer-cta-primary"
            >
              Start hiring
              <ArrowRight className="size-3.5" />
            </Link>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background/60 px-5 py-2.5 text-[13px] font-bold text-foreground/80 backdrop-blur-md transition-colors hover:bg-muted hover:text-foreground"
              data-testid="footer-cta-secondary"
            >
              Browse open roles
            </Link>
          </div>
        </div>

        <div className="grid gap-8 py-12 sm:grid-cols-2 sm:gap-10 md:grid-cols-4">
          {/* Brand block */}
          <div className="md:pr-6">
            <div className="flex items-center gap-2.5">
              <CrewcastMark className="size-15" />
              <span className="text-[15px] font-bold tracking-[-0.02em] text-foreground">
                Crewcast
              </span>
            </div>
            <p className="mt-3 text-[12.5px] leading-relaxed text-muted-foreground">
              Hiring infrastructure built on public GitHub signals.

            </p>
          </div>

          {linkColumns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[13px] text-foreground/75 no-underline transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

   
        <div className="flex flex-col items-center gap-5 border-t border-border/70 py-6 sm:flex-row sm:justify-between sm:gap-4">
          <p className="text-center text-[11.5px] text-muted-foreground sm:text-left">
            Â© {new Date().getFullYear()} Crewcast. Built by{" "}
            <a
              href="https://imsaikirann.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground/80 underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Sai Kiran
            </a>
            .
          </p>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="h-5 w-px bg-border" />
            <div className="flex gap-1.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex size-7 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:bg-muted hover:text-foreground"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

