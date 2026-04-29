"use client";

import { useState } from "react";
import Link from "next/link";
import { Flag, Shield, Lock, X } from "lucide-react";
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
      <footer className="mt-12 border-t border-border pt-6 pb-8">
        <div className="flex flex-col items-start justify-between gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <CrewcastWordmark markClassName="size-6 rounded-md" />

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <ThemeToggle compact />

            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-1.5 transition hover:text-foreground"
              data-testid="report-form-btn"
            >
              <Flag className="size-3.5" strokeWidth={1.75} />
              Report
            </button>

            <Link
              href="/trust"
              className="inline-flex items-center gap-1.5 transition hover:text-foreground"
            >
              <Shield className="size-3.5" strokeWidth={1.75} />
              Trust & Safety
            </Link>

            <Link
              href="/privacy"
              className="inline-flex items-center gap-1.5 transition hover:text-foreground"
            >
              <Lock className="size-3.5" strokeWidth={1.75} />
              Privacy
            </Link>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-lg border border-border bg-card shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 rounded-md p-1 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              data-testid="close-report-modal-btn"
            >
              <X className="size-4" />
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