import Link from "next/link";
import { signIn } from "next-auth/react";

export default function MobileMenu({ user, onClose }: any) {
  return (
    <div className="space-y-4 bg-background px-6 py-6 text-[15px] md:hidden">

      {[
        { label: "How it works", href: "/#how-it-works" },
        { label: "Product", href: "/#features" },
        { label: "Domains", href: "/domains" },
        { label: "Open roles", href: "/jobs" },
      ].map((l) => (
        <Link
          key={l.label}
          href={l.href}
          onClick={onClose}
          className="block text-foreground"
        >
          {l.label}
        </Link>
      ))}

      <div className="pt-4 border-t border-border" />

      {!user ? (
        <button
          onClick={() => signIn("google")}
          className="w-full text-left"
        >
          Sign in
        </button>
      ) : (
        <Link href="/dashboard" onClick={onClose}>
          Dashboard
        </Link>
      )}
    </div>
  );
}
