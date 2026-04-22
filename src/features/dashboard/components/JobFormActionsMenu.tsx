"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/lib/api";
import { toast } from "@/lib/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  publicId: string;
  status: string;
  expired: boolean;
};

export function JobFormActionsMenu({ publicId, status, expired }: Props) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const isPublished = status === "PUBLISHED";

  const copyLink = async () => {
    const url = `${window.location.origin}/form/${publicId}`;
    await navigator.clipboard.writeText(url);
    toast.success("Form link copied");
  };

  const deleteForm = async () => {
    const confirmed = window.confirm(
      "Delete this form and all of its applications, scores, views, and reports? This cannot be undone."
    );

    if (!confirmed) return;

    setIsDeleting(true);
    try {
      await api.delete(`/api/recruiters/forms/${publicId}`);
      toast.success("Form deleted", {
        description: "The form and its submissions were removed.",
      });
      router.refresh();
    } catch (error: any) {
      toast.error("Could not delete form", {
        description: error?.response?.data?.message || "Please try again.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleStatus = async () => {
    const nextStatus = isPublished ? "ARCHIVED" : "PUBLISHED";

    if (nextStatus === "ARCHIVED") {
      const confirmed = window.confirm(
        "Archive this form? Candidates will no longer be able to apply from the public link."
      );

      if (!confirmed) return;
    }

    setIsUpdatingStatus(true);
    try {
      await api.patch(`/api/recruiters/forms/${publicId}`, { status: nextStatus });
      toast.success(nextStatus === "PUBLISHED" ? "Form published" : "Form archived", {
        description:
          nextStatus === "PUBLISHED"
            ? "The public application link is live again."
            : "The public application link is now closed.",
      });
      router.refresh();
    } catch (error: any) {
      toast.error("Could not update form", {
        description: error?.response?.data?.message || "Please try again.",
      });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <span className="text-lg leading-none">...</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={copyLink}>Copy link</DropdownMenuItem>
        <DropdownMenuItem
          disabled={isUpdatingStatus || expired}
          onSelect={(event) => {
            event.preventDefault();
            void toggleStatus();
          }}
        >
          {isUpdatingStatus
            ? "Updating..."
            : isPublished
              ? "Archive form"
              : "Publish form"}
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={`/dashboard/submissions/${publicId}`}>Submissions</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={`/dashboard/submissions/${publicId}/analytics`}>Analytics</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={`/form/${publicId}`}>View public form</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          disabled={isDeleting}
          onSelect={(event) => {
            event.preventDefault();
            void deleteForm();
          }}
        >
          {isDeleting ? "Deleting..." : "Delete form"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
