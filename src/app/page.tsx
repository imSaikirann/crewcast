import BackgroundGrid from "@/components/landing/BackgroundGrid";
import Hero from "@/components/landing/Hero";
import Benefits from "@/components/landing/Benefits";
import HowItWorks from "@/components/landing/HowItWorks";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import DevelopersShowcase from "@/components/landing/Devs";
import Testimonials from "@/components/landing/Reviews";
import StatsBento from "@/components/landing/StatsBento";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[var(--landing-bg)] text-[var(--landing-text)]">
      <BackgroundGrid />
      <div className="relative z-10">
        <Hero />
        <StatsBento />
        <Benefits />
        <HowItWorks />
        <DevelopersShowcase />
        <Testimonials />
        <FinalCTA />
        <Footer />
      </div>
    </main>
  );
}
