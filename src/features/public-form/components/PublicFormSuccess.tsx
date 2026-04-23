import Link from "next/link";

export function PublicFormSuccess({ trackingUrl }: { trackingUrl?: string }) {
  return (
    <div className="rounded-lg border bg-card px-5 py-16 text-center shadow-sm sm:px-8">
      <svg className="mx-auto mb-5 h-16 w-16 text-[#4CAF82]" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="2" />
        <path d="M21 33.5 28.5 41 44 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <h2 className="font-display text-3xl font-semibold tracking-tight">Application submitted</h2>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
        Your application was received. You can track review progress and see the final decision from your status page.
      </p>
      {trackingUrl && (
        <div className="mt-6">
          <Link
            href={trackingUrl}
            className="inline-flex h-12 items-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Track application status
          </Link>
          <p className="mx-auto mt-3 max-w-md break-all text-xs text-muted-foreground">
            Save this private link: {trackingUrl}
          </p>
        </div>
      )}
    </div>
  );
}
