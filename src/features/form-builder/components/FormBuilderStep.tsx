"use client";

import { useEffect, useState } from "react";
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
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppSelect } from "@/components/ui/app-select";
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
  const [activeId, setActiveId] = useState<string | null>(null);
  const [previousCount, setPreviousCount] = useState(fields.length);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      // A small drag threshold keeps clicks (expand/collapse) from starting a drag.
      activationConstraint: { distance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (fields.length > previousCount) {
      setEditingId(fields[fields.length - 1]?.id ?? null);
    }
    setPreviousCount(fields.length);
    if (!editingId && fields[0]) setEditingId(fields[0].id);
  }, [editingId, fields, previousCount]);

  const activeField = activeId
    ? fields.find((field) => field.id === activeId) ?? null
    : null;

  function onDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
    // Collapse any open editor so the dragged card reads cleanly.
    setEditingId(null);
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    if (over && active.id !== over.id) {
      handleReorderField(String(active.id), String(over.id));
    }
  }

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
          <header className="flex items-center justify-between gap-3 border-b border-border pb-3">
            <div className="min-w-0">
              <h2 className="font-display text-base font-semibold tracking-tight">
                Application fields
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {fields.length} field{fields.length === 1 ? "" : "s"} candidates will
                complete
              </p>
            </div>
            <span className="hidden shrink-0 items-center gap-1.5 rounded-md border border-border bg-secondary/40 px-2.5 py-1 text-xs text-muted-foreground sm:inline-flex">
              <GripVertical className="size-3.5" />
              Drag to reorder
            </span>
          </header>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragCancel={() => setActiveId(null)}
          >
            <SortableContext
              items={fields.map((field) => field.id)}
              strategy={verticalListSortingStrategy}
            >
              <ul className="space-y-2">
                {fields.map((field) => (
                  <SortableFieldRow
                    key={field.id}
                    field={field}
                    editing={editingId === field.id}
                    isOverlayActive={activeId === field.id}
                    onToggleEdit={() =>
                      setEditingId((current) =>
                        current === field.id ? null : field.id
                      )
                    }
                    onUpdate={(u) => handleUpdateField(field.id, u)}
                    onRemove={() => handleRemoveField(field.id)}
                    onAddOption={(o) => handleAddOption(field.id, o)}
                    onRemoveOption={(i) => handleRemoveOption(field.id, i)}
                    onDoneEditing={() => setEditingId(null)}
                  />
                ))}
              </ul>
            </SortableContext>

            <DragOverlay dropAnimation={{ duration: 200, easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)" }}>
              {activeField ? <FieldRowGhost field={activeField} /> : null}
            </DragOverlay>
          </DndContext>

          {/* Add field */}
          <div className="relative">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowTypes((v) => !v)}
              aria-expanded={showTypes}
              className="h-12 w-full justify-center gap-1.5 border-dashed border-border bg-transparent text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/30 hover:text-foreground"
              data-testid="add-field-btn"
            >
              <Plus
                className={`size-4 transition-transform duration-200 ${
                  showTypes ? "rotate-45" : ""
                }`}
              />
              {showTypes ? "Close" : "Add field"}
            </Button>

            {showTypes && (
              <>
                <button
                  type="button"
                  aria-label="Close field picker"
                  className="fixed inset-0 z-10 cursor-default"
                  onClick={() => setShowTypes(false)}
                />
                <div className="absolute bottom-full z-20 mb-2 w-full origin-bottom rounded-lg border border-border bg-popover p-1.5 shadow-lg duration-150 animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-1">
                  <p className="px-2.5 pb-1.5 pt-1 text-xs font-medium text-muted-foreground">
                    Choose a field type
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
                          className="group flex items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-colors hover:bg-secondary"
                        >
                          <span className="grid size-7 shrink-0 place-items-center rounded-md border border-border bg-background text-muted-foreground transition-colors group-hover:border-foreground/20 group-hover:text-foreground">
                            <Icon className="size-3.5" strokeWidth={1.75} />
                          </span>
                          {type.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Preview */}
        <aside className={view === "builder" ? "hidden lg:block" : ""}>
          <div className="sticky top-6 max-h-[calc(100vh-9rem)] overflow-y-auto rounded-lg border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between gap-2 border-b border-border pb-3">
              <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <Eye className="size-3.5 text-muted-foreground" strokeWidth={1.75} />
                Live preview
              </span>
              <span className="rounded-full border border-border bg-secondary/40 px-2 py-0.5 text-[11px] text-muted-foreground">
                Candidate view
              </span>
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

/* ------------------------------------------------------------------ */
/*  Sortable field row                                                 */
/* ------------------------------------------------------------------ */

function SortableFieldRow({
  field,
  editing,
  isOverlayActive,
  onToggleEdit,
  onUpdate,
  onRemove,
  onAddOption,
  onRemoveOption,
  onDoneEditing,
}: {
  field: FormField;
  editing: boolean;
  isOverlayActive: boolean;
  onToggleEdit: () => void;
  onUpdate: (u: Partial<FormField>) => void;
  onRemove: () => void;
  onAddOption: (o: string) => void;
  onRemoveOption: (i: number) => void;
  onDoneEditing: () => void;
}) {
  const locked = field.locked || isGitHubField(field);
  const Icon = ICON_BY_TYPE[field.type] || Type;

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id, disabled: locked });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`group/row overflow-hidden rounded-lg border bg-card transition-[border-color,box-shadow,opacity] ${
        isDragging
          ? "z-10 border-dashed border-foreground/30 opacity-40"
          : editing
          ? "border-foreground/30 shadow-sm"
          : "border-border hover:border-foreground/20"
      } ${isOverlayActive ? "opacity-40" : ""}`}
    >
      <div className="flex items-center gap-1.5 px-2 py-2.5 sm:gap-3 sm:px-3 sm:py-3">
        {/* Drag handle */}
        <button
          type="button"
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          aria-label={locked ? "Field locked" : `Reorder ${field.label || "field"}`}
          disabled={locked}
          className={`grid size-7 shrink-0 touch-none place-items-center rounded-md text-muted-foreground transition-colors ${
            locked
              ? "cursor-not-allowed opacity-40"
              : "cursor-grab hover:bg-secondary hover:text-foreground active:cursor-grabbing"
          }`}
        >
          <GripVertical className="size-4" />
        </button>

        {/* Expand / summary */}
        <button
          type="button"
          onClick={onToggleEdit}
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
          aria-expanded={editing}
        >
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
        </button>

        {/* Actions */}
        <span className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={onToggleEdit}
            aria-label="Edit field"
            className={`grid size-7 place-items-center rounded transition-colors ${
              editing
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Pencil className="size-3.5" />
          </button>
          <button
            type="button"
            disabled={locked}
            onClick={() => {
              if (!locked) onRemove();
            }}
            aria-label="Remove field"
            className={`grid size-7 place-items-center rounded transition-colors ${
              locked
                ? "cursor-not-allowed text-muted-foreground/40"
                : "text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            }`}
          >
            <Trash2 className="size-3.5" />
          </button>
        </span>
      </div>

      {editing && (
        <InlineEditor
          field={field}
          onUpdate={onUpdate}
          onAddOption={onAddOption}
          onRemoveOption={onRemoveOption}
          onDone={onDoneEditing}
        />
      )}
    </li>
  );
}

/* A lightweight floating copy of the row shown under the cursor while dragging. */
function FieldRowGhost({ field }: { field: FormField }) {
  const locked = field.locked || isGitHubField(field);
  const Icon = ICON_BY_TYPE[field.type] || Type;

  return (
    <div className="flex items-center gap-3 rounded-lg border border-foreground/30 bg-card px-3 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.18)] ring-1 ring-foreground/5">
      <span className="grid size-7 shrink-0 place-items-center rounded-md text-foreground">
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
        <span className="mt-0.5 block text-[11px] text-muted-foreground">
          {labelize(field.type)}
        </span>
      </span>
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
        <AppSelect
          label="Field type"
          value={field.type}
          disabled={locked}
          onValueChange={(value) => onUpdate({ type: value as FieldType })}
          options={FIELD_TYPES.map((type) => ({
            value: type.value,
            label: type.label,
          }))}
        />
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
          <Label className="text-xs font-medium text-muted-foreground">
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
      <Label className="text-xs font-medium text-muted-foreground">
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
