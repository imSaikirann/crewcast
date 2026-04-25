"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DomainSubmitButton from "../DomainSubmitButton";
import { type DomainActionState, updateDomainAction } from "./actions";

type DomainForEdit = {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  haveDefaultForm: boolean;
  defaultFieldsJson?: string | null;
};

const initialState: DomainActionState = { status: "idle" };

export default function DomainEditDialog({
  domain,
  fallbackDefaultFields,
}: {
  domain: DomainForEdit;
  fallbackDefaultFields: unknown[];
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(updateDomainAction, initialState);
  const router = useRouter();

  const fieldsJsonDefaultValue = useMemo(() => {
    if (domain.defaultFieldsJson && domain.defaultFieldsJson.trim()) {
      return domain.defaultFieldsJson;
    }
    return JSON.stringify(fallbackDefaultFields, null, 2);
  }, [domain.defaultFieldsJson, fallbackDefaultFields]);

  const hasAnyError =
    state.status === "error" && (state.message || state.fieldErrors);
  const hasAnySuccess = state.status === "success" && state.message;

  useEffect(() => {
    if (state.status !== "success") return;
    router.refresh();
    setOpen(false);
  }, [router, state.status]);

  return (
    <>
      <Button type="button" size="sm" variant="outline" onClick={() => setOpen(true)}>
        Edit
      </Button>

      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);
        }}
      >
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit domain</DialogTitle>
            <DialogDescription>
              Update the domain settings recruiters see.
            </DialogDescription>
          </DialogHeader>

          <form
            action={formAction}
            className="space-y-5"
          >
            <input type="hidden" name="domainId" value={domain.id} />

            {hasAnyError && state.message && (
              <Alert variant="destructive">
                <AlertTitle>Domain not updated</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}

            {hasAnySuccess && state.message && (
              <Alert variant="success">
                <AlertTitle>Domain updated</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor={`title-${domain.id}`}>Domain title</Label>
              <Input
                id={`title-${domain.id}`}
                name="title"
                defaultValue={domain.title}
                aria-invalid={Boolean(state.fieldErrors?.title)}
                required
              />
              {state.fieldErrors?.title && (
                <p className="text-sm text-destructive">{state.fieldErrors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`description-${domain.id}`}>Description</Label>
              <Textarea
                id={`description-${domain.id}`}
                name="description"
                defaultValue={domain.description}
                aria-invalid={Boolean(state.fieldErrors?.description)}
                required
              />
              {state.fieldErrors?.description && (
                <p className="text-sm text-destructive">
                  {state.fieldErrors.description}
                </p>
              )}
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="isActive"
                defaultChecked={domain.isActive}
                className="accent-primary"
              />
              Active
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="createDefaultForm"
                defaultChecked={domain.haveDefaultForm}
                className="accent-primary"
              />
              Default GitHub hiring form enabled
            </label>

            <div className="space-y-2">
              <Label htmlFor={`fieldsJson-${domain.id}`}>Default fields JSON</Label>
              <Textarea
                id={`fieldsJson-${domain.id}`}
                name="fieldsJson"
                className="min-h-56 text-xs"
                aria-invalid={Boolean(state.fieldErrors?.fieldsJson)}
                defaultValue={fieldsJsonDefaultValue}
              />
              {state.fieldErrors?.fieldsJson && (
                <p className="text-sm text-destructive">
                  {state.fieldErrors.fieldsJson}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
              <div className="sm:w-56">
                <DomainSubmitButton
                  idleLabel="Save changes"
                  pendingLabel="Saving..."
                />
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

