import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function ProviderButton({
  label,
  icon,
  loading,
  disabled,
  onClick,
  testId,
}: {
  label: string;
  icon: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
  testId?: string;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      className="h-10 w-full justify-center gap-2.5 rounded-md border-border/60 text-sm font-medium"
      data-testid={testId}
    >
      {loading ? <Spinner /> : icon}
      {label}
    </Button>
  );
}
