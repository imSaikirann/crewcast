"use client";

import { useState } from "react";
import { ArrowRightIcon, CheckIcon } from "./icons";

type EmailFormProps = {
  /** Visual size of the form. */
  size?: "md" | "lg";
  className?: string;
  buttonLabel?: string;
};

export function EmailForm({ size = "md", className = "", buttonLabel = "Get started" }: EmailFormProps) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  };

  const isLg = size === "lg";

  if (done) {
    return (
      <div
        className={`flex items-center justify-center gap-2 font-sora text-sm text-neutral-600 ${className}`}
      >
        <CheckIcon size={18} className="text-neutral-900" />
        Thanks — check your inbox to verify your work email.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full flex-col gap-3 sm:flex-row ${isLg ? "sm:gap-3" : "sm:gap-2"} ${className}`}
    >
      <label htmlFor={`email-${size}`} className="sr-only">
        Email address
      </label>
      <input
        id={`email-${size}`}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className={`font-sora w-full flex-1 rounded-full border border-neutral-200 bg-white text-neutral-900 placeholder:text-neutral-400 outline-none transition-colors focus:border-neutral-900 ${
          isLg ? "px-5 py-3.5 text-[15px]" : "px-4 py-3 text-sm"
        }`}
      />
      <button
        type="submit"
        className={`font-sora group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-neutral-900 font-medium text-white transition-colors hover:bg-neutral-700 ${
          isLg ? "px-6 py-3.5 text-[15px]" : "px-5 py-3 text-sm"
        }`}
      >
        {buttonLabel}
        <ArrowRightIcon
          size={16}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </button>
    </form>
  );
}
