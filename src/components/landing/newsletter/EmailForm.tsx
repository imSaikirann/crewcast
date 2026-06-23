import Link from "next/link";

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
        className={`inline-flex shrink-0 items-center justify-center rounded-md bg-primary font-medium text-primary-foreground transition-colors duration-150 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25 ${
          isLg ? "h-10 px-6 text-[15px]" : "h-9 px-5 text-sm"
        }`}
      >
        {buttonLabel}
       
      </Link>
    </div>
  );
}


