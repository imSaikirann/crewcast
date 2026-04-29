"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  GripVertical,
  Lock,
  Pencil,
  Trash2,
  Plus,
  Check,
  X,
  Eye,
  Type,
  Mail,
  Hash,
  AlignLeft,
  ListChecks,
  CheckSquare,
  Calendar,
  FileUp,
  Link2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { isGitHubField } from "@/lib/formFields";
import { FieldType, FormField, JobFormDetails } from "../types/types";
import { FormPreview } from "./FormPreview";

const FIELD_TYPES: { value: FieldType; label: string; icon: any }[] = [
  { value: "text", label: "Short text", icon: Type },
  { value: "textarea", label: "Long text", icon: AlignLeft },
  { value: "email", label: "Email", icon: Mail },
  { value: "number", label: "Number", icon: Hash },
  { value: "select", label: "Dropdown", icon: ListChecks },
  { value: "checkbox", label: "Checkbox", icon: CheckSquare },
  { value: "date", label: "Date", icon: Calendar },
  { value: "file", label: "File", icon: FileUp },
  { value: "url", label: "URL", icon: Link2 },
];

const ICON_BY_TYPE = Object.fromEntries(
  FIELD_TYPES.map((t) => [t.value, t.icon])
);

interface Props {
  details: JobFormDetails;
  fields: FormField[];
  selectedFieldType: FieldType;
  setSelectedFieldType: (type: FieldType) => void;
  handleAddField: (index?: number, typeOverride?: FieldType) => void;
  handleUpdateField: (id: string, updates: Partial<FormField>) => void;
  handleRemoveField: (id: string) => void;
  handleReorderField: (fromId: string, toId: string) => void;
  handleAddOption: (id: string, option: string) => void;
  handleRemoveOption: (id: string, index: number) => void;
}

export function FormBuilderStep({
  details,
  fields,
  selectedFieldType,
  setSelectedFieldType,
  handleAddField,
  handleUpdateField,
  handleRemoveField,
  handleReorderField,
  handleAddOption,
  handleRemoveOption,
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(fields[0]?.id ?? null);
  const [showTypes, setShowTypes] = useState(false);
  const [view, setView] = useState<"builder" | "preview">("builder");
  const draggedId = useRef<string | null>(null);
  const previousCount = useRef(fields.length);

  useEffect(() => {
    if (fields.length > previousCount.current) {
      setEditingId(fields[fields.length - 1]?.id ?? null);
    }
    previousCount.current = fields.length;
    if (!editingId && fields[0]) setEditingId(fields[0].id);
  }, [editingId, fields]);

  return (
    <div className="space-y-5">
      {/* Mobile tabs */}
      <div className="inline-flex w-full gap-1 rounded-md border border-border bg-secondary/30 p-1 lg:hidden">
        <TabBtn active={view === "builder"} onClick={() => setView("builder")}>
          Builder
        </TabBtn>
        <TabBtn active={view === "preview"} onClick={() => setView("preview")}>
          <Eye className="mr-1.5 size-3.5" />
          Preview
        </TabBtn>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
        {/* Builder */}
        <section
          className={view === "preview" ? "hidden lg:block" : "space-y-5"}
        >
          <header className="flex items-end justify-between border-b border-border pb-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Application
              </p>
              <h2 className="mt-1 font-display text-base font-semibold tracking-tight">
                {fields.length} candidate field{fields.length === 1 ? "" : "s"}
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">Drag to reorder</p>
          </header>

          <ul className="space-y-2">
            {fields.map((field) => {
              const locked = field.locked || isGitHubField(field);
              const editing = editingId === field.id;
              const Icon = ICON_BY_TYPE[field.type] || Type;

              return (
                <li
                  key={field.id}
                  draggable={!locked}
                  onDragStart={(e) => {
                    draggedId.current = field.id;
                    e.dataTransfer.effectAllowed = "move";
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = "move";
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (draggedId.current) {
                      handleReorderField(draggedId.current, field.id);
                      draggedId.current = null;
                    }
                  }}
                  onDragEnd={() => (draggedId.current = null)}
                  className={`overflow-hidden rounded-lg border bg-card transition ${
                    editing
                      ? "border-foreground/30 shadow-sm"
                      : "border-border hover:border-foreground/20"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setEditingId(editing ? null : field.id)}
                    className="flex w-full items-center gap-3 px-3 py-3 text-left"
                  >
                    <span
                      className="cursor-grab text-muted-foreground active:cursor-grabbing"
                      aria-hidden
                    >
                      <GripVertical className="size-4" />
                    </span>
                    <span className="grid size-7 shrink-0 place-items-center rounded-md border border-border bg-background">
                      {locked ? (
                        <Lock className="size-3.5 text-muted-foreground" />
                      ) : (
                        <Icon className="size-3.5" strokeWidth={1.75} />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">
                        {field.label || "Untitled field"}
                      </span>
                      <span className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                        <span>{labelize(field.type)}</span>
                        {field.required && (
                          <>
                            <span>·</span>
                            <span>Required</span>
                          </>
                        )}
                        {locked && (
                          <>
                            <span>·</span>
                            <span>AI scoring</span>
                          </>
                        )}
                      </span>
                    </span>

                    <span className="flex items-center gap-0.5">
                      <span
                        className="grid size-7 place-items-center rounded text-muted-foreground hover:bg-secondary hover:text-foreground"
                        aria-hidden
                      >
                        <Pencil className="size-3.5" />
                      </span>
                      <span
                        role="button"
                        tabIndex={locked ? -1 : 0}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!locked) handleRemoveField(field.id);
                        }}
                        className={`grid size-7 place-items-center rounded ${
                          locked
                            ? "cursor-not-allowed text-muted-foreground/40"
                            : "text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        }`}
                      >
                        <Trash2 className="size-3.5" />
                      </span>
                    </span>
                  </button>

                  {editing && (
                    <InlineEditor
                      field={field}
                      onUpdate={(u) => handleUpdateField(field.id, u)}
                      onAddOption={(o) => handleAddOption(field.id, o)}
                      onRemoveOption={(i) => handleRemoveOption(field.id, i)}
                      onDone={() => setEditingId(null)}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Add field */}
          <div className="relative">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowTypes((v) => !v)}
              className="h-12 w-full justify-center gap-1.5 border-dashed border-border bg-transparent text-sm font-medium text-muted-foreground hover:bg-secondary/30 hover:text-foreground"
              data-testid="add-field-btn"
            >
              <Plus className="size-4" />
              Add field
            </Button>

            {showTypes && (
              <div className="absolute bottom-full z-20 mb-2 w-full rounded-lg border border-border bg-popover p-1.5 shadow-lg">
                <p className="px-2.5 pb-1.5 pt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  Choose field type
                </p>
                <div className="grid gap-0.5 sm:grid-cols-2">
                  {FIELD_TYPES.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => {
                          setSelectedFieldType(type.value);
                          handleAddField(undefined, type.value);
                          setShowTypes(false);
                        }}
                        className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm hover:bg-secondary"
                      >
                        <Icon className="size-3.5 text-muted-foreground" strokeWidth={1.75} />
                        {type.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Preview */}
        <aside className={view === "builder" ? "hidden lg:block" : ""}>
          <div className="sticky top-6 max-h-[calc(100vh-9rem)] overflow-y-auto rounded-lg border border-border bg-card p-5">
            <div className="mb-4 flex items-center gap-1.5 border-b border-border pb-3">
              <Eye className="size-3.5 text-muted-foreground" strokeWidth={1.75} />
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Live preview
              </p>
            </div>
            <FormPreview
              title={details.formTitle || "Untitled job form"}
              description={details.formDescription}
              fields={fields}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}

function InlineEditor({
  field,
  onUpdate,
  onAddOption,
  onRemoveOption,
  onDone,
}: {
  field: FormField;
  onUpdate: (u: Partial<FormField>) => void;
  onAddOption: (o: string) => void;
  onRemoveOption: (i: number) => void;
  onDone: () => void;
}) {
  const [option, setOption] = useState("");
  const locked = field.locked || isGitHubField(field);

  return (
    <div
      className="grid gap-4 border-t border-border bg-secondary/20 p-4 sm:grid-cols-2"
      onClick={(e) => e.stopPropagation()}
    >
      <Mini label="Label">
        <Input
          className="h-9"
          value={field.label}
          readOnly={locked}
          onChange={(e) => onUpdate({ label: e.target.value })}
        />
      </Mini>

      <Mini label="Type">
        <Select
          value={field.type}
          disabled={locked}
          onValueChange={(value) => onUpdate({ type: value as FieldType })}
        >
          <SelectTrigger className="h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FIELD_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Mini>

      <Mini label="Placeholder">
        <Input
          className="h-9"
          value={field.placeholder || ""}
          readOnly={locked}
          onChange={(e) => onUpdate({ placeholder: e.target.value })}
        />
      </Mini>

      <Mini label="Settings">
        <label className="inline-flex h-9 items-center gap-2 text-xs text-foreground">
          <input
            type="checkbox"
            checked={locked || field.required}
            disabled={locked}
            onChange={(e) => onUpdate({ required: e.target.checked })}
            className="size-3.5 rounded border-border"
          />
          Required field
        </label>
      </Mini>

      {field.type === "select" && (
        <div className="space-y-2 sm:col-span-2">
          <Label className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Options
          </Label>
          <div className="flex gap-2">
            <Input
              className="h-9"
              value={option}
              onChange={(e) => setOption(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (!option.trim()) return;
                  onAddOption(option.trim());
                  setOption("");
                }
              }}
              placeholder="Add option and press Enter"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-9 gap-1"
              onClick={() => {
                if (!option.trim()) return;
                onAddOption(option.trim());
                setOption("");
              }}
            >
              <Plus className="size-3.5" />
              Add
            </Button>
          </div>
          {field.options && field.options.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {field.options.map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-0.5 text-xs"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => onRemoveOption(index)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end sm:col-span-2">
        <Button
          type="button"
          size="sm"
          onClick={onDone}
          className="h-8 gap-1 px-3 text-xs"
        >
          <Check className="size-3.5" />
          Done
        </Button>
      </div>
    </div>
  );
}

function Mini({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-9 flex-1 items-center justify-center rounded text-xs font-medium transition ${
        active
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function labelize(value: string) {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}