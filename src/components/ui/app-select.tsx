"use client";

import type { ComponentType } from "react";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type AppSelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

const EMPTY_VALUE = "__crewcast_empty_value__";

type AppSelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  options: readonly AppSelectOption[];
  label: string;
  icon?: ComponentType<{ className?: string }>;
  placeholder?: string;
  disabled?: boolean;
  compact?: boolean;
  showLabel?: boolean;
  size?: "sm" | "default" | "lg";
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  testId?: string;
};

/**
 * The canonical Crewcast single-select control.
 *
 * It keeps context visible in compact toolbars, gives menus a descriptive
 * heading, and prevents vague repeated values such as several adjacent “All”
 * buttons. Use native selects only inside externally controlled document forms.
 */
export function AppSelect({
  value,
  onValueChange,
  options,
  label,
  icon: Icon,
  placeholder,
  disabled,
  compact = false,
  showLabel = false,
  size = "default",
  className,
  triggerClassName,
  contentClassName,
  testId,
}: AppSelectProps) {
  const height = size === "lg" ? "h-11" : size === "sm" ? "h-8" : "h-9";

  const control = (
    <Select
      value={value || EMPTY_VALUE}
      onValueChange={(nextValue) =>
        onValueChange(nextValue === EMPTY_VALUE ? "" : nextValue)
      }
      disabled={disabled}
    >
      <SelectTrigger
        data-testid={testId}
        aria-label={label}
        className={cn(
          height,
          "w-full bg-background font-medium",
          compact && "min-w-[132px] max-w-[172px] gap-2 px-3",
          triggerClassName
        )}
      >
        {Icon ? <Icon className="size-4 shrink-0 text-muted-foreground" /> : null}
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        position="popper"
        align="start"
        sideOffset={6}
        className={cn(
          "min-w-[180px] max-w-[280px]",
          "w-[var(--radix-select-trigger-width)]",
          contentClassName
        )}
      >
        <SelectGroup>
          <SelectLabel className="px-2 py-1.5 text-[11px] font-semibold text-muted-foreground">
            {label}
          </SelectLabel>
          <SelectSeparator />
          {options.map((option) => (
            <SelectItem
              key={option.value || "__empty"}
              value={option.value || EMPTY_VALUE}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );

  if (!showLabel) return <div className={className}>{control}</div>;

  return (
    <label className={cn("grid gap-1.5", className)}>
      <span className="text-xs font-medium text-foreground">{label}</span>
      {control}
    </label>
  );
}
