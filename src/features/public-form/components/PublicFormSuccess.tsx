import Link from "next/link";
import { Check, ArrowUpRight, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PublicFormSuccess({ trackingUrl }: { trackingUrl?: string }) {
  return (
    <div className="flex flex-col items-center py-16 text-center sm:py-24">
      <div className="flex size-14 items-center justify-center rounded-full border border-border bg-secondary/40">
        <Check className="size-6" strokeWidth={2.25} />
      </div>

      <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Application submitted
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
        We've received your application. You can follow review progress and the final decision from your private status page.
      </p>

      {trackingUrl && (
        <div className="mt-8 w-full max-w-md space-y-3">
          <Link
            href={trackingUrl}
            className="group inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-md bg-foreground px-5 text-sm font-semibold text-background transition hover:opacity-90"
            data-testid="track-application-btn"
          >
            Track application status
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>

          <CopyLink url={trackingUrl} />
        </div>
      )}
    </div>
  );
}

function CopyLink({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-border bg-secondary/30 px-3 py-2 text-left">
      <code className="flex-1 truncate text-xs text-muted-foreground">{url}</code>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => navigator.clipboard?.writeText(url)}
        className="h-7 rounded px-2 text-xs"
        data-testid="copy-tracking-url-btn"
      >
        <Copy className="mr-1 size-3" />
        Copy
      </Button>
    </div>
  );
}