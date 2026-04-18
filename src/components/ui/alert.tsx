import * as React from "react";

import { cn } from "@/lib/utils";

type AlertVariant = "default" | "destructive" | "success" | "warning";

const variantClasses: Record<AlertVariant, string> = {
  default: "border-border bg-muted/40 text-foreground",
  destructive:
    "border-destructive/30 bg-destructive/10 text-destructive",
  success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700",
  warning: "border-amber-500/30 bg-amber-500/10 text-amber-700",
};

function Alert({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & { variant?: AlertVariant }) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-md border px-4 py-3 text-sm",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("font-semibold", className)} {...props} />;
}

function AlertDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("mt-1 opacity-90", className)} {...props} />;
}

export { Alert, AlertDescription, AlertTitle };
