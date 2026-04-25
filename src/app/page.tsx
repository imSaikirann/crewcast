// app/page.tsx  (or pages/index.tsx)

import Hero from "@/components/landing/Hero";
import { FinalCTA } from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import { StatsBar, Features } from "@/components/landing/Stats";
import { Comparison } from "@/components/landing/Comparison";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { WhyCrewcast } from "@/components/landing/WhyCrewcast";

export default function Home() {
  return (
    <main
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{ background: "var(--lc-bg)", color: "var(--lc-text)", fontFamily: "var(--lc-sans)" }}
    >

      <Hero />
      <StatsBar />
      <WhyCrewcast />
      <HowItWorks />
      <Features />
      <Comparison />
      <Footer />
    </main>
  );
}
