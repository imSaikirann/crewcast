"use client";

import { useState } from "react";
import Link from "next/link";
import ReportForm from "./ReportForm";
import { CrewcastWordmark } from "@/components/brand/CrewcastLogo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

type Props = {
  formPublicId: string;
};


export function PublicFormFooter({ formPublicId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <footer className="mt-8 border-t py-5 text-xs text-muted-foreground">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Branding */}
          <CrewcastWordmark markClassName="size-7 rounded-md" />

          {/* Trust & Safety */}
          <div className="flex items-center gap-4">
            <ThemeToggle compact />

            <button
              onClick={() => setOpen(true)}
              className="transition hover:text-foreground hover:underline"
            >
              Report this form
            </button>

            <Link
              href="/trust"
              className="hover:text-foreground transition"
            >
              Trust & Safety
            </Link>

            <Link
              href="/privacy"
              className="hover:text-foreground transition"
            >
              Privacy
            </Link>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="relative w-full max-w-md overflow-hidden rounded-lg border border-border bg-card shadow-xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 z-10 text-muted-foreground transition hover:text-foreground"
            >
              x
            </button>

            <ReportForm
              formPublicId={formPublicId}
              onClose={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
