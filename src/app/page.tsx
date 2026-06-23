import { Navbar } from "@/components/landing/newsletter/Navbar";
import { Hero } from "@/components/landing/newsletter/Hero";
import { SocialProof } from "@/components/landing/newsletter/SocialProof";
import { Features } from "@/components/landing/newsletter/Features";
import { Benefits } from "@/components/landing/newsletter/Benefits";
import { StartupBenefits } from "@/components/landing/newsletter/StartupBenefits";
import { Testimonials } from "@/components/landing/newsletter/Testimonials";
import { FinalCTA } from "@/components/landing/newsletter/FinalCTA";
import { Footer } from "@/components/landing/newsletter/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background text-foreground antialiased">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Features />
        <Benefits />
        <StartupBenefits />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}


