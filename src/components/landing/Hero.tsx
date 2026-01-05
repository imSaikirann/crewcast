"use client";

import { Button } from "@/components/ui/button";
import { HugeIcon } from "@/utils/hugeicons";
import Link from "next/link";

export default function Hero() {
  return (
    <main className="relative z-10 min-h-screen flex items-center justify-center px-6">
      <section className="max-w-4xl text-center space-y-6">
        <span className="inline-block -rotate-1 bg-neutral-900 dark:bg-white text-white dark:text-black px-4 py-2 text-xs font-semibold uppercase">
          Hiring made practical
        </span>

        <h1 className="text-4xl md:text-5xl font-bold">
          Stop screening.
          <br />
          Start interviewing the{" "}
          <span className="underline">right candidates</span>.
        </h1>

        <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
          Crewcast filters tech applications automatically so you talk only to qualified developers.
        </p>

        <Link href="/dashboard">
          <Button size="lg" className="px-10 gap-2">
            Start shortlisting
            <HugeIcon name="arrow-right" />
          </Button>
        </Link>
      </section>
    </main>
  );
}
