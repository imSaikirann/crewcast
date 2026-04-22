// app/page.tsx  (or pages/index.tsx)

import Hero from "@/components/landing/Hero";
import { FinalCTA } from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import { StatsBar, HowItWorks, Features, Comparison } from "@/components/landing/Stats";

export default function Home() {
  return (
    <main
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{ background: "var(--lc-bg)", color: "var(--lc-text)", fontFamily: "var(--lc-sans)" }}
    >

      <Hero />
      <StatsBar />
      <HowItWorks />
      <Features />
      <Comparison />
      <FinalCTA />
      <Footer />
    </main>
  );
}
