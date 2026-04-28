import Link from "next/link";
import { CrewcastMark } from "@/components/brand/CrewcastLogo";

export function NavLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 no-underline outline-none"
      data-testid="nav-logo"
    >
      <CrewcastMark className="size-7" />
      <span className="text-[15px] font-bold tracking-[-0.02em] text-foreground">
        Crewcast
      </span>
    </Link>
  );
}