export default function HowItWorks() {
  const steps = [
    "Verify your company",
    "Choose domain",
    "Customize form",
    "Share & shortlist",
  ];

  return (
    <section className="relative z-10 py-24 px-6 bg-zinc-50 dark:bg-neutral-950">
      <div className="max-w-4xl mx-auto space-y-10">
        {steps.map((step, i) => (
          <div key={step} className="flex gap-6">
            <div className="w-12 h-12 bg-black text-white flex items-center justify-center">
              {i + 1}
            </div>
            <h3 className="text-xl">{step}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
