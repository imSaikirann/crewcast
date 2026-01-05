import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="relative z-10 py-24 text-center">
      <h2 className="text-4xl font-bold">Ready to hire smarter?</h2>
      <Link href="/dashboard">
        <Button size="lg" className="mt-6">Get started</Button>
      </Link>
    </section>
  );
}
