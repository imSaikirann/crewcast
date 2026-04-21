import Link from "next/link";

export function PublicFormSuccess({ trackingUrl }: { trackingUrl?: string }) {
  return (
    <div className="rounded-xl border bg-card px-6 py-20 text-center">
      <svg className="mx-auto mb-5 h-16 w-16 text-[#4CAF82]" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="2" />
        <path d="M21 33.5 28.5 41 44 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <h2 className="font-display text-[22px] font-semibold">Application submitted!</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
        Your application was received. You can track review progress and see the final decision from your status page.
      </p>
      {trackingUrl && (
        <div className="mt-6">
          <Link
            href={trackingUrl}
            className="inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            Track application status
          </Link>
          <p className="mt-3 break-all text-xs text-muted-foreground">
            Save this private link: {trackingUrl}
          </p>
        </div>
      )}
    </div>
  );
}
