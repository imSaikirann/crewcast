import { HugeIcon } from "@/utils/hugeicons";

export default function Benefits() {
  return (
    <section className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {[
          ["time-quarter-pass", "Hours to minutes", "Automated filtering saves hours of manual screening."],
          ["analytics-up", "Data-driven scoring", "Objective scoring of developer profiles."],
          ["target-03", "Built for tech hiring", "Designed for engineering teams."],
        ].map(([icon, title, desc]) => (
          <div key={title} className="p-6 border bg-white dark:bg-neutral-900">
            <HugeIcon name={icon} />
            <h3 className="font-semibold mt-3">{title}</h3>
            <p className="text-zinc-600 dark:text-zinc-400">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
