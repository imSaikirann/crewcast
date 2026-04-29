"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MoreHorizontal } from "lucide-react";

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
    await navigator.clipboard.writeText(`${window.location.origin}/form/${publicId}`);
    toast.success("Link copied");
  };

  const deleteForm = async () => {
    if (
      !window.confirm(
        "Delete this form and all of its applications, scores, views, and reports? This cannot be undone."
      )
    )
      return;

    setIsDeleting(true);
    try {
      await api.delete(`/api/recruiters/forms/${publicId}`);
      toast.success("Form deleted");
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

    if (
      nextStatus === "ARCHIVED" &&
      !window.confirm("Archive this form? Candidates will no longer be able to apply.")
    )
      return;

    setIsUpdatingStatus(true);
    try {
      await api.patch(`/api/recruiters/forms/${publicId}`, { status: nextStatus });
      toast.success(nextStatus === "PUBLISHED" ? "Form published" : "Form archived");
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
        <Button
          variant="ghost"
          size="icon-sm"
          className="size-8 text-muted-foreground"
          aria-label="Form actions"
        >
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={copyLink}>Copy link</DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/form/${publicId}`}>View public form</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/submissions/${publicId}`}>Submissions</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/submissions/${publicId}/analytics`}>Analytics</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={isUpdatingStatus || expired}
          onSelect={(e) => {
            e.preventDefault();
            void toggleStatus();
          }}
        >
          {isUpdatingStatus ? "Updating..." : isPublished ? "Archive form" : "Publish form"}
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          disabled={isDeleting}
          onSelect={(e) => {
            e.preventDefault();
            void deleteForm();
          }}
        >
          {isDeleting ? "Deleting..." : "Delete form"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}