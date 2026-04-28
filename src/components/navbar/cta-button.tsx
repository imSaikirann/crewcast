"use client";

import { ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CTAButton({ className }: { className?: string }) {
  return (
    <Button
      onClick={() => signIn("google")}
      size="sm"
      className={cn("h-9 gap-1.5 rounded-md px-4 text-[13px] font-bold", className)}
      data-testid="nav-cta-start-hiring"
    >
      Start hiring
      <ArrowRight className="size-3.5" />
    </Button>
  );
}