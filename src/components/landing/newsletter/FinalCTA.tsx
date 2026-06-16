import { EmailForm } from "./EmailForm";

export function FinalCTA() {
  return (
    <section className="w-full border-t border-neutral-100 bg-neutral-50/40">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-32">
        <h2 className="font-heading text-balance text-4xl font-bold leading-[1.1] text-neutral-900 sm:text-5xl">
          Publish your first form today.
        </h2>
        <p className="font-sora mx-auto mt-5 max-w-lg text-base leading-relaxed text-neutral-500 sm:text-lg">
          Build a role-specific hiring form, share one link, and start reviewing
          GitHub-scored candidates. Free to start.
        </p>

        <div className="mx-auto mt-9 max-w-md">
          <EmailForm size="lg" buttonLabel="Get started free" />
        </div>
      </div>
    </section>
  );
}
