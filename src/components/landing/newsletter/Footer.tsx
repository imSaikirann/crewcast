import Link from "next/link";
import Image from "next/image";

const links = [
  { label: "How it works", href: "#features" },
  { label: "Open roles", href: "/jobs" },
  { label: "Privacy", href: "#" },
  { label: "Contact", href: "#" },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-neutral-100">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-6 py-12 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center"
          aria-label="Crewcast home"
        >
          <Image
            src="/logo.png"
            alt="Crewcast"
            width={28}
            height={28}
            className="h-7 w-7 rounded-md object-contain"
          />
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-sora text-sm text-neutral-500 transition-colors hover:text-neutral-900"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <p className="font-sora text-sm text-neutral-400">
          © {new Date().getFullYear()} Crewcast
        </p>
      </div>
    </footer>
  );
}
