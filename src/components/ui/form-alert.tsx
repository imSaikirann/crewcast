import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

type Variant = "error" | "success" | "info";

const ICON: Record<Variant, React.ComponentType<{ className?: string }>> = {
  error: AlertCircle,
  success: CheckCircle2,
  info: Info,
};

const STYLES: Record<Variant, string> = {
  error:
    "border-destructive/30 bg-destructive/10 text-destructive [&>svg]:text-destructive",
  success:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  info: "border-border bg-muted text-foreground",
};

export function FormAlert({
  variant = "error",
  title,
  children,
  className,
}: {
  variant?: Variant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const Icon = ICON[variant];
  return (
    <Alert className={cn("rounded-md", STYLES[variant], className)}>
      <Icon className="h-4 w-4" />
      {title && <AlertTitle className="text-[13px]">{title}</AlertTitle>}
      <AlertDescription className="text-[12px] leading-relaxed">
        {children}
      </AlertDescription>
    </Alert>
  );
}