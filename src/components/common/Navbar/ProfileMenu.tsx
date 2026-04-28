import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function ProfileMenu({ user }: any) {
  return (
    <div className="relative group">

      <button className="flex items-center gap-2">
        <Image
          src={user.image}
          alt=""
          width={24}
          height={24}
          className="rounded-full"
        />
      </button>

      {/* Minimal dropdown */}
      <div className="absolute right-0 mt-2 w-44 bg-white border border-neutral-200 opacity-0 group-hover:opacity-100 transition">

        <div className="px-4 py-3 text-[12px] text-neutral-500">
          {user.email}
        </div>

        <Link href="/dashboard" className="block px-4 py-2 text-[13px] hover:bg-neutral-100">
          Dashboard
        </Link>

        <button
          onClick={() => signOut()}
          className="w-full text-left px-4 py-2 text-[13px] hover:bg-neutral-100"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}