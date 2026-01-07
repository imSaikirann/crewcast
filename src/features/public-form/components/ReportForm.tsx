"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type Props = {
  formPublicId: string;
  onClose?: () => void;
};

const REASONS = [
  "Fake job",
  "Scam / Asking money",
  "Spam",
  "Illegal hiring",
  "Other",
];

export default function ReportForm({ formPublicId, onClose }: Props) {
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!reason || !message.trim()) {
      setError("Select a reason and explain.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
     const id = formPublicId
      const res = await fetch(`/api/forms/${id}/report-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason, message }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setDone(true);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="p-6 text-center space-y-3 bg-white dark:bg-neutral-900">
        <p className="text-lg font-semibold text-green-600 dark:text-green-500">
          Report submitted ✔
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Our moderation system will review this form.
        </p>
        {onClose && (
          <button
            onClick={onClose}
            className="mt-4 text-sm text-blue-600 dark:text-blue-400 underline"
          >
            Close
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-5 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 ">
      <h3 className="text-lg font-semibold">Report this job</h3>

      {/* Reason */}
      <div className="space-y-2">
        {REASONS.map((r) => (
          <label
            key={r}
            className="flex items-center gap-3 text-sm cursor-pointer text-gray-700 dark:text-gray-300"
          >
            <Input
              type="radio"
              name="reason"
              value={r}
              checked={reason === r}
              onChange={() => setReason(r)}
              className="accent-red-600 size-3 cursor-pointer"
            />
            {r}
          </label>
        ))}
      </div>

      {/* Message */}
      <textarea
        className="w-full rounded-md p-3 text-sm resize-none
          border border-gray-300 dark:border-neutral-700
          bg-white dark:bg-neutral-800
          text-gray-900 dark:text-gray-100
          placeholder:text-gray-400 dark:placeholder:text-gray-500
          focus:outline-none focus:ring-2 focus:ring-red-600"
        placeholder="Explain why this job is suspicious..."
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {error && (
        <p className="text-sm text-red-600 dark:text-red-500">{error}</p>
      )}

      <Button
        onClick={submit}
        disabled={loading}
        className="w-full rounded-md py-2 font-medium
          bg-red-600 hover:bg-red-700
          text-white
          disabled:opacity-50 disabled:cursor-not-allowed
          transition cursor-pointer"
      >
        {loading ? "Submitting..." : "Submit report"}
      </Button>
    </div>
  );
}
