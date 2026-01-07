"use client";

import { useState } from "react";
import Link from "next/link";
import ReportForm from "./ReportForm";

type Props = {
  formPublicId: string;
};


export function PublicFormFooter({ formPublicId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <footer className="mt-10 border-t pt-6 mb-10 text-xs text-muted-foreground">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto px-4">
          {/* Branding */}
          <p>
            Made with{" "}
            <span className="font-medium text-foreground">
              Crewcast Forms
            </span>
          </p>

          {/* Trust & Safety */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen(true)}
              className="hover:text-foreground transition underline"
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
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-black"
            >
              ✕
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
