import { EmailForm } from "./EmailForm";

export function Hero() {
  return (
    <section className="relative w-full">
      <div className="mx-auto max-w-3xl px-6 pt-20 pb-16 text-center sm:pt-32 sm:pb-28">
        <p className="font-sora mb-6 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-neutral-500">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inset-0 inline-flex animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative m-auto inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          GitHub-first hiring forms
        </p>

        <h1 className="font-heading text-balance text-4xl font-bold leading-[1.08] text-neutral-900 sm:text-6xl sm:leading-[1.05] md:text-7xl">
          Hire for proof
          <br className="hidden sm:block" /> of work.
        </h1>

        <p className="font-sora mx-auto mt-7 max-w-xl text-pretty text-base leading-relaxed text-neutral-500 sm:text-lg">
          Crewcast turns role-specific forms into ranked shortlists. Publish one
          link, collect structured applications, and review candidates with
          GitHub-backed scoring that's fair to candidates and fast for recruiters.
        </p>

        <div id="get-started" className="mx-auto mt-10 max-w-md scroll-mt-24">
          <EmailForm size="lg" buttonLabel="Get started" />
          <p className="font-sora mt-4 text-sm text-neutral-400">
            Free to start. Set up your first form in minutes.
          </p>
        </div>
      </div>
    </section>
  );
}
