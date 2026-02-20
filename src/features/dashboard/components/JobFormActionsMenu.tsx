"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HugeIcon } from "@/utils/hugeicons";

export function JobFormActionsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <HugeIcon name="more-vertical" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <HugeIcon name="link" className="mr-2" />
          Copy link
        </DropdownMenuItem>

        <DropdownMenuItem>
          <HugeIcon name="edit" className="mr-2" />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem>
          <HugeIcon name="menu" className="mr-2" />
          View
        </DropdownMenuItem>

        <DropdownMenuItem className="text-destructive">
          <HugeIcon name="cancel" className="mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
