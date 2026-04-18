"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HugeIcon } from "@/utils/hugeicons";
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
          <HugeIcon name="more-vertical" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={copyLink}>
          <HugeIcon name="link" className="mr-2" />
          Copy link
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={`/dashboard/submissions/${publicId}`}>
            <HugeIcon name="menu" className="mr-2" />
            Submissions
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={`/form/${publicId}`}>
            <HugeIcon name="menu" className="mr-2" />
            View
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem disabled>
          <HugeIcon name="edit" className="mr-2" />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem className="text-destructive" disabled>
          <HugeIcon name="cancel" className="mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
