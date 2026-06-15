const readers = ["Stripe", "Notion", "Linear", "Figma", "Vercel", "Airbnb"];

export function SocialProof() {
  return (
    <section className="w-full border-y border-neutral-100">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <p className="font-sora text-center text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
          Trusted by hiring teams at
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 sm:gap-x-14">
          {readers.map((name) => (
            <span
              key={name}
              className="font-heading text-lg font-semibold tracking-tight text-neutral-400 transition-colors hover:text-neutral-700 sm:text-xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
