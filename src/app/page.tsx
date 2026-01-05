import BackgroundGrid from "@/components/landing/BackgroundGrid";
import Hero from "@/components/landing/Hero";
import Benefits from "@/components/landing/Benefits";
import HowItWorks from "@/components/landing/HowItWorks";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full relative bg-white dark:bg-neutral-900">
      <BackgroundGrid />
      <Hero />
      <Benefits />
      <HowItWorks />
      <FinalCTA />
      <Footer />
    </div>
  );
}
