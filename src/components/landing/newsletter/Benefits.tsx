import { BookIcon, ShieldIcon, SparkIcon, UsersIcon } from "./icons";

const benefits = [
  {
    icon: SparkIcon,
    title: "Signal over formatting",
    body: "Real commits and shipped projects, not keyword-stuffed resumes.",
  },
  {
    icon: ShieldIcon,
    title: "Less spam, better fit",
    body: "Candidates apply in two minutes — no logins, no CV uploads.",
  },
  {
    icon: BookIcon,
    title: "Clear status for everyone",
    body: "Candidates see where they stand; recruiters keep a clean pipeline.",
  },
  {
    icon: UsersIcon,
    title: "Built for fast teams",
    body: "One link to share anywhere, with branded forms on your domain.",
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="w-full scroll-mt-20 border-y border-neutral-100 bg-neutral-50/40">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="font-heading text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl">
              Hiring that&apos;s fair and fast.
            </h2>
            <p className="font-sora mt-4 max-w-md text-lg leading-relaxed text-neutral-500">
              Candidates shouldn&apos;t file a thousand applications to be seen,
              and recruiters shouldn&apos;t drown in spreadsheets. Crewcast fixes
              both ends of the funnel.
            </p>
          </div>

          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-4">
                <Icon size={22} className="mt-0.5 shrink-0 text-neutral-900" />
                <div>
                  <h3 className="font-heading text-base font-semibold text-neutral-900">
                    {title}
                  </h3>
                  <p className="font-sora mt-1.5 text-[15px] leading-relaxed text-neutral-500">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
