export function PublicFormSuccess() {
  return (
    <div className="rounded-xl border bg-card px-6 py-20 text-center">
      <svg className="mx-auto mb-5 h-16 w-16 text-[#4CAF82]" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="2" />
        <path d="M21 33.5 28.5 41 44 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <h2 className="font-display text-[22px] font-semibold">Application submitted!</h2>
      <p className="mt-2 text-sm text-muted-foreground">We'll be in touch soon.</p>
    </div>
  );
}
