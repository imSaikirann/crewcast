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
    <div className="min-h-screen w-full relative bg-white dark:bg-neutral-900">
      <BackgroundGrid />
      <Hero />
      <StatsBento/>
      <Benefits />
      <HowItWorks />
      <DevelopersShowcase/>
      <Testimonials/>

      <FinalCTA />
      <Footer />
    </div>
  );
}
