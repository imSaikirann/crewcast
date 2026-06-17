import Link from "next/link";
import { ArrowRightIcon } from "./icons";

type EmailFormProps = {
  /** Visual size of the form. */
  size?: "md" | "lg";
  className?: string;
  buttonLabel?: string;
};

export function EmailForm({ size = "md", className = "", buttonLabel = "Get started" }: EmailFormProps) {
  const isLg = size === "lg";

  return (
    <div className={`flex w-full justify-center ${className}`}>
      <Link
        href="/login"
        className={`font-sora group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-neutral-900 font-medium text-white shadow-sm ring-1 ring-neutral-900/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 active:translate-y-0 ${
          isLg ? "px-5 py-3 text-sm sm:px-6 sm:py-3.5 sm:text-[15px]" : "px-5 py-2.5 text-sm sm:py-3"
        }`}
      >
        {buttonLabel}
       
      </Link>
    </div>
  );
}
