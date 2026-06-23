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
      <div className="absolute right-0 mt-2 w-44 rounded-md border border-border bg-popover p-1 text-popover-foreground opacity-0 shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition group-hover:opacity-100">

        <div className="border-b border-border px-3 py-2 text-[12px] text-muted-foreground">
          {user.email}
        </div>

        <Link href="/dashboard" className="block rounded-[4px] px-3 py-2 text-[13px] hover:bg-muted">
          Dashboard
        </Link>

        <button
          onClick={() => signOut()}
          className="w-full rounded-[4px] px-3 py-2 text-left text-[13px] hover:bg-muted"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
