import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { LayoutDashboard, LogOut } from "lucide-react";

export function MobileUserSection({
  user,
  onClose,
}: {
  user: NonNullable<ReturnType<typeof useSession>["data"]>["user"];
  onClose: () => void;
}) {
  return (
    <div className="space-y-0.5">
      <div className="flex items-center gap-3 px-3 py-2">
        {user?.image ? (
          <Image
            src={user.image}
            alt="profile"
            width={28}
            height={28}
            className="rounded-[6px]"
          />
        ) : (
          <div
            className="w-7 h-7 rounded-[6px] flex items-center justify-center text-[11px] font-bold"
            style={{ background: "var(--lc-bg-3)", color: "var(--lc-text-2)" }}
          >
            {user?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
        )}

        <div>
          <p
            className="text-[12px] font-semibold"
            style={{ color: "var(--lc-text)" }}
          >
            {user?.name}
          </p>
          <p
            className="text-[10px] mt-0.5 truncate"
            style={{ color: "var(--lc-text-3)" }}
          >
            {user?.email}
          </p>
        </div>
      </div>

      <Link
        href="/dashboard"
        onClick={onClose}
        className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-[6px] text-[13px] no-underline transition-colors"
        style={{ color: "var(--lc-text-2)" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--lc-text)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "var(--lc-text-2)")
        }
      >
        <LayoutDashboard size={13} /> Dashboard
      </Link>

      <button
        onClick={() => signOut()}
        className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-[6px] text-[13px] transition-colors"
        style={{ color: "var(--lc-danger)" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(204,51,51,0.08)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "transparent")
        }
      >
        <LogOut size={13} /> Sign out
      </button>
    </div>
  );
}
