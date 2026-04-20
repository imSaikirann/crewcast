"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function JobFormActionsMenu({ publicId }: { publicId: string }) {
  const copyLink = async () => {
    const url = `${window.location.origin}/form/${publicId}`;
    await navigator.clipboard.writeText(url);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <span className="text-lg leading-none">...</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem disabled>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={copyLink}>Copy link</DropdownMenuItem>
        <DropdownMenuItem disabled>Toggle status</DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={`/dashboard/submissions/${publicId}`}>Submissions</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={`/form/${publicId}`}>View public form</Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="text-destructive" disabled>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
