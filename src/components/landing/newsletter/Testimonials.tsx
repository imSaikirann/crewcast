import { QuoteIcon } from "./icons";

const testimonials = [
  {
    quote:
      "We went from 200 applicants to a confident top 10 in an afternoon. The GitHub scoring surfaced people we'd have missed in a resume stack.",
    name: "Maya Adeyemi",
    role: "Head of Talent, Figma",
  },
  {
    quote:
      "Finally, screening that rewards what engineers actually build. One link, structured answers, real signal, and no more spreadsheet chaos.",
    name: "Daniel Cho",
    role: "Founder, Arc Labs",
  },
  {
    quote:
      "Candidates love that it takes two minutes and they always know where they stand. Our pipeline has never been cleaner.",
    name: "Priya Nair",
    role: "Engineering Manager, Linear",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="w-full scroll-mt-20">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <h2 className="font-heading max-w-2xl text-3xl font-bold leading-tight text-foreground sm:text-4xl">
          Teams hire with confidence.
        </h2>

        <div className="mt-12 grid gap-x-12 gap-y-12 sm:mt-16 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="flex flex-col">
              <QuoteIcon size={24} className="text-muted-foreground/50" />
              <blockquote className="font-sora mt-4 flex-1 text-[15px] leading-relaxed text-foreground">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6">
                <p className="font-heading text-sm font-semibold text-foreground">
                  {t.name}
                </p>
                <p className="font-sora mt-0.5 text-sm text-muted-foreground">
                  {t.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}


