"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Plus, Search, X } from "lucide-react";

import { cn } from "@/lib/utils";

export type MultiSelectOption = {
  value: string;
  label: string;
  /** Optional grouping heading shown above the option. */
  group?: string;
};

type MultiSelectProps = {
  /** Accessible label for the control. */
  label: string;
  options: readonly MultiSelectOption[];
  /** Currently selected values (controlled). */
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  /** Allow adding free-text values that are not in `options`. */
  allowCustom?: boolean;
  /** Maximum number of chips to render before collapsing to "+N more". */
  maxVisibleChips?: number;
  size?: "sm" | "default" | "lg";
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
  testId?: string;
};

/**
 * Global multi-select control: a searchable popover with checkbox options and
 * inline chips for the current selection. Supports optional custom entries.
 */
export function MultiSelect({
  label,
  options,
  selected,
  onChange,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyText = "No matches",
  allowCustom = false,
  maxVisibleChips = 6,
  size = "default",
  disabled,
  className,
  contentClassName,
  testId,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  const height = size === "lg" ? "min-h-11" : size === "sm" ? "min-h-8" : "min-h-9";

  // Close on outside click + Escape.
  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => searchRef.current?.focus(), 10);
      return () => window.clearTimeout(id);
    }
    setQuery("");
  }, [open]);

  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(q) ||
        option.value.toLowerCase().includes(q)
    );
  }, [options, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, MultiSelectOption[]>();
    for (const option of filtered) {
      const key = option.group ?? "";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(option);
    }
    return Array.from(map.entries());
  }, [filtered]);

  const labelByValue = useMemo(() => {
    const map = new Map<string, string>();
    for (const option of options) map.set(option.value, option.label);
    return map;
  }, [options]);

  const trimmedQuery = query.trim();
  const canAddCustom =
    allowCustom &&
    trimmedQuery.length > 0 &&
    !options.some(
      (option) => option.value.toLowerCase() === trimmedQuery.toLowerCase()
    ) &&
    !selected.some((value) => value.toLowerCase() === trimmedQuery.toLowerCase());

  const toggle = (value: string) => {
    if (selectedSet.has(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const addCustom = () => {
    if (!canAddCustom) return;
    onChange([...selected, trimmedQuery]);
    setQuery("");
    searchRef.current?.focus();
  };

  const visibleChips = selected.slice(0, maxVisibleChips);
  const overflowCount = selected.length - visibleChips.length;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        disabled={disabled}
        data-testid={testId}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "flex w-full items-center gap-2 rounded-md border border-input bg-background px-2.5 py-1.5 text-left text-sm transition-[border-color,box-shadow] outline-none",
          "hover:border-(--border-strong) focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20",
          "disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60",
          height
        )}
      >
        <span className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
          {selected.length === 0 ? (
            <span className="px-0.5 text-muted-foreground">{placeholder}</span>
          ) : (
            <>
              {visibleChips.map((value) => (
                <span
                  key={value}
                  className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary/50 px-2 py-0.5 text-xs font-medium"
                >
                  {labelByValue.get(value) ?? value}
                  <span
                    role="button"
                    tabIndex={-1}
                    aria-label={`Remove ${labelByValue.get(value) ?? value}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      onChange(selected.filter((item) => item !== value));
                    }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-3" />
                  </span>
                </span>
              ))}
              {overflowCount > 0 && (
                <span className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  +{overflowCount} more
                </span>
              )}
            </>
          )}
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div
          id={listboxId}
          role="listbox"
          aria-multiselectable
          className={cn(
            "absolute z-50 mt-1.5 w-full overflow-hidden rounded-md border border-border bg-popover shadow-[0_12px_32px_rgba(0,0,0,0.12)] duration-150 animate-in fade-in-0 zoom-in-95",
            contentClassName
          )}
        >
          <div className="flex items-center gap-2 border-b border-border px-2.5">
            <Search className="size-3.5 shrink-0 text-muted-foreground" />
            <input
              ref={searchRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  if (canAddCustom) addCustom();
                  else if (filtered.length === 1) toggle(filtered[0].value);
                }
              }}
              placeholder={searchPlaceholder}
              className="h-9 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div className="max-h-64 overflow-y-auto p-1">
            {grouped.length === 0 && !canAddCustom && (
              <p className="px-2.5 py-6 text-center text-sm text-muted-foreground">
                {emptyText}
              </p>
            )}

            {grouped.map(([groupName, groupOptions]) => (
              <div key={groupName || "__ungrouped"}>
                {groupName && (
                  <p className="px-2.5 pb-1 pt-2 text-xs font-medium text-muted-foreground">
                    {groupName}
                  </p>
                )}
                {groupOptions.map((option) => {
                  const isSelected = selectedSet.has(option.value);
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => toggle(option.value)}
                      className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-colors hover:bg-secondary"
                    >
                      <span
                        className={cn(
                          "grid size-4 shrink-0 place-items-center rounded border transition-colors",
                          isSelected
                            ? "border-foreground bg-foreground text-background"
                            : "border-border bg-background"
                        )}
                      >
                        {isSelected && <Check className="size-3" strokeWidth={3} />}
                      </span>
                      <span className="truncate">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            ))}

            {canAddCustom && (
              <button
                type="button"
                onClick={addCustom}
                className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-colors hover:bg-secondary"
              >
                <span className="grid size-4 shrink-0 place-items-center rounded border border-dashed border-border">
                  <Plus className="size-3" />
                </span>
                Add &ldquo;{trimmedQuery}&rdquo;
              </button>
            )}
          </div>

          {selected.length > 0 && (
            <div className="flex items-center justify-between border-t border-border px-2.5 py-2">
              <span className="text-xs text-muted-foreground">
                {selected.length} selected
              </span>
              <button
                type="button"
                onClick={() => onChange([])}
                className="text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
