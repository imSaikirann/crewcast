"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DomainSubmitButton from "../DomainSubmitButton";
import { deleteDomainAction, type DomainActionState } from "./actions";

const initialState: DomainActionState = { status: "idle" };

export default function DomainDeleteDialog({
  domain,
}: {
  domain: { id: string; title: string; recruiterFormCount: number };
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(deleteDomainAction, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.status !== "success") return;
    router.refresh();
    setOpen(false);
  }, [router, state.status]);

  const destructiveHint =
    domain.recruiterFormCount > 0
      ? `This will also delete ${domain.recruiterFormCount} recruiter form(s) in this domain.`
      : "This cannot be undone.";

  return (
    <>
      <Button
        type="button"
        size="sm"
        variant="destructive"
        onClick={() => setOpen(true)}
      >
        Delete
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Delete domain</DialogTitle>
            <DialogDescription>
              You are about to permanently delete <span className="font-medium">{domain.title}</span>.
              {" "}
              {destructiveHint}
            </DialogDescription>
          </DialogHeader>

          <form action={formAction} className="space-y-4">
            <input type="hidden" name="domainId" value={domain.id} />
            <input type="hidden" name="title" value={domain.title} />

            {state.status === "error" && state.message && (
              <Alert variant="destructive">
                <AlertTitle>Domain not deleted</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <div className="sm:w-52">
                <DomainSubmitButton
                  idleLabel="Yes, delete"
                  pendingLabel="Deleting..."
                />
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

