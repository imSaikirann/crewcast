"use client";

import { Button } from "@/components/ui/button";
import { HugeIcon } from "@/utils/hugeicons";
import Link from "next/link";

export default function Hero() {
  return (
    <main className="relative z-10 min-h-screen flex items-center justify-center px-6 bg-white dark:bg-neutral-950">
      <section className="max-w-3xl text-center space-y-8">
        {/* Simple badge */}
        <span className="inline-block bg-black dark:bg-white text-white dark:text-black px-4 py-1.5 text-xs font-medium uppercase tracking-wide">
          Hiring made practical
        </span>

        {/* Clean headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-black dark:text-white">
          Stop screening.
          <br />
          Start interviewing the right candidates.
        </h1>

        {/* Simple description */}
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Crewcast filters tech applications automatically so you talk only to qualified developers.
        </p>

        {/* Clean CTA */}
        <div className="pt-2">
          <Link href="/dashboard">
            <Button 
              size="lg" 
              className="px-8 py-6 text-base gap-2 bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 dark:text-black transition-colors"
            >
              Start shortlisting
              <HugeIcon name="arrow-right" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}