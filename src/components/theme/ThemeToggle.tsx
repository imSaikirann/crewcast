"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { useTheme } from "./ThemeProvider";

const options = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
] as const;

type ThemeValue = (typeof options)[number]["value"];

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const active: ThemeValue = mounted ? theme : "light";
  const sizes = compact
    ? { wrapper: "p-0.5", btn: "size-6", icon: "size-3.5" }
    : { wrapper: "p-0.5", btn: "size-7", icon: "size-4" };

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-background",
        sizes.wrapper
      )}
      data-testid="theme-toggle"
    >
      {options.map(({ value, label, icon: Icon }) => {
        const selected = active === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={`Use ${label.toLowerCase()} theme`}
            title={`${label} theme`}
            onClick={() => setTheme(value)}
            className={cn(
              "flex items-center justify-center rounded-[4px] text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
              sizes.btn,
              selected && "bg-primary text-primary-foreground"
            )}
            data-testid={`theme-toggle-${value}`}
          >
            <Icon className={sizes.icon} strokeWidth={1.8} />
          </button>
        );
      })}
    </div>
  );
}

