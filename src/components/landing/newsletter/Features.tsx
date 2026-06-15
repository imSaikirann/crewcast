import { CompassIcon, ClockIcon, PenIcon } from "./icons";

const features = [
  {
    icon: PenIcon,
    title: "Role-specific forms",
    body: "Start from a template or build your own. Define the stack, seniority, and screening questions, then publish a clean public link in minutes.",
  },
  {
    icon: CompassIcon,
    title: "GitHub-backed scoring",
    body: "Every application arrives with a 0–100 score and a clear breakdown — activity, repo quality, open-source signal, and stack match.",
  },
  {
    icon: ClockIcon,
    title: "From 200 to top 10",
    body: "Skip the spreadsheet triage. Ranked shortlists and side-by-side comparison take you from a pile of applicants to a decision in an afternoon.",
  },
];

export function Features() {
  return (
    <section id="features" className="w-full scroll-mt-20">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl">
            Proof of work beats keywords.
          </h2>
          <p className="font-sora mt-4 text-lg leading-relaxed text-neutral-500">
            Crewcast weighs real projects and open-source contributions over
            resume buzzwords — so the right work rises to the top faster.
          </p>
        </div>

        <div className="mt-12 grid gap-x-12 gap-y-10 sm:mt-16 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <Icon size={24} className="text-neutral-900" />
              <h3 className="font-heading mt-5 text-lg font-semibold text-neutral-900">
                {title}
              </h3>
              <p className="font-sora mt-2.5 text-[15px] leading-relaxed text-neutral-500">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
