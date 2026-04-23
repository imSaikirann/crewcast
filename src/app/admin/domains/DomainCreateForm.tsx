"use client";

import { useActionState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DomainSubmitButton from "../DomainSubmitButton";
import {
  createDomainAction,
  type DomainActionState,
} from "./actions";

const initialState: DomainActionState = { status: "idle" };

export default function DomainCreateForm({
  defaultFields,
}: {
  defaultFields: unknown[];
}) {
  const [state, formAction] = useActionState(createDomainAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      {state.status === "error" && state.message && (
        <Alert variant="destructive">
          <AlertTitle>Domain not saved</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      {state.status === "success" && state.message && (
        <Alert variant="success">
          <AlertTitle>Domain saved</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Domain title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Software Engineering"
          aria-invalid={Boolean(state.fieldErrors?.title)}
          required
        />
        {state.fieldErrors?.title && (
          <p className="text-sm text-destructive">
            {state.fieldErrors.title}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Engineering roles scored by GitHub activity and relevant project signals."
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
          defaultChecked
          className="accent-primary"
        />
        Active
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="createDefaultForm"
          defaultChecked
          className="accent-primary"
        />
        Create default GitHub hiring form
      </label>

      <div className="space-y-2">
        <Label htmlFor="fieldsJson">Default fields JSON</Label>
        <Textarea
          id="fieldsJson"
          name="fieldsJson"
          className="min-h-56 text-xs"
          aria-invalid={Boolean(state.fieldErrors?.fieldsJson)}
          defaultValue={JSON.stringify(defaultFields, null, 2)}
        />
        {state.fieldErrors?.fieldsJson && (
          <p className="text-sm text-destructive">
            {state.fieldErrors.fieldsJson}
          </p>
        )}
      </div>

      <DomainSubmitButton />
    </form>
  );
}
