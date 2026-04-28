import Link from "next/link";

const navLinks = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Product", href: "/#features" },
  { label: "Domains", href: "/domains" },
  { label: "Open roles", href: "/jobs" },
];

export default function NavbarLinks({ user }: any) {
  return (
    <>
      {navLinks.map((l) => (
        <Link key={l.label} href={l.href} className="px-3 py-2 text-sm">
          {l.label}
        </Link>
      ))}

      {user?.role === "admin" && (
        <Link href="/admin" className="px-3 py-2 text-sm">
          Admin
        </Link>
      )}
    </>
  );
}