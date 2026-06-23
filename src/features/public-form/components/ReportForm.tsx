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
      <div className="space-y-3 bg-card p-6 text-center text-card-foreground">
        <p className="text-lg font-semibold text-primary">
          Report submitted
        </p>
        <p className="text-sm text-muted-foreground">
          Our moderation system will review this form.
        </p>
        {onClose && (
          <button
            onClick={onClose}
            className="mt-4 text-sm text-primary underline"
          >
            Close
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-5 bg-card p-6 text-card-foreground">
      <h3 className="text-lg font-semibold">Report this job</h3>

      {/* Reason */}
      <div className="space-y-2">
        {REASONS.map((r) => (
          <label
            key={r}
            className="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground"
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
          border border-border
          bg-background
          text-foreground
          placeholder:text-muted-foreground
          focus:outline-none focus:ring-2 focus:ring-red-600"
        placeholder="Explain why this job is suspicious..."
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {error && (
        <p className="text-sm text-destructive">{error}</p>
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

