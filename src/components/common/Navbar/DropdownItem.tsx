import Link from "next/link";

export function DropdownItem({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-2.5 w-full px-3 py-2 rounded-[5px] text-[12px] no-underline transition-colors"
      style={{ color: "var(--lc-text-2)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--lc-bg-2)";
        e.currentTarget.style.color      = "var(--lc-text)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color      = "var(--lc-text-2)";
      }}
    >
      {icon}
      {label}
    </Link>
  );
}

