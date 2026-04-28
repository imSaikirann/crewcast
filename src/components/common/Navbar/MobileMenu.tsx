import Link from "next/link";
import { signIn } from "next-auth/react";

export default function MobileMenu({ user, onClose }: any) {
  return (
    <div className="md:hidden bg-white px-6 py-6 space-y-4 text-[15px]">

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
          className="block text-neutral-700"
        >
          {l.label}
        </Link>
      ))}

      <div className="pt-4 border-t border-neutral-200" />

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