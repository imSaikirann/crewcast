import { ShieldCheck } from "lucide-react";

export function TrustLine() {
  return (
    <div className="flex items-start gap-2.5">
      <ShieldCheck
        className="mt-0.5 size-3.5 shrink-0 text-muted-foreground"
        aria-hidden
      />
      <p className="text-[11px] leading-[1.6] text-muted-foreground">
        We only read public GitHub data. No write access. No private repo access.
        Ever.
      </p>
    </div>
  );
}
