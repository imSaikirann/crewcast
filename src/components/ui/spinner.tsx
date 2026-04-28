import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export function Spinner({ size = 16, className, ...props }: SpinnerProps) {
  return (
    <Loader2
      width={size}
      height={size}
      className={cn("animate-spin", className)}
      aria-label="Loading"
      {...props}
    />
  );
}