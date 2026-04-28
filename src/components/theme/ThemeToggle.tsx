"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { useTheme } from "./ThemeProvider";

const options = [
  { value: "system", label: "System", icon: Monitor },
  { value: "light",  label: "Light",  icon: Sun     },
  { value: "dark",   label: "Dark",   icon: Moon    },
] as const;

type ThemeValue = (typeof options)[number]["value"];

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Avoid hydration mismatch — fall back to "system" until mounted
  const active: ThemeValue = (mounted ? (theme as ThemeValue) : "system") ?? "system";

  // Sizing tokens
  const sizes = compact
    ? { wrapper: "p-0.5",  btn: "size-6",  icon: "size-3.5" }
    : { wrapper: "p-[3px]", btn: "size-7", icon: "size-4"   };

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-background",
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
            aria-label={label}
            title={label}
            onClick={() => setTheme(value)}
            className={cn(
              "flex items-center justify-center rounded-full transition-all duration-150",
              "text-muted-foreground hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              sizes.btn,
              selected &&
                "bg-muted text-foreground shadow-sm ring-1 ring-border"
            )}
            data-testid={`theme-toggle-${value}`}
          >
            <Icon className={sizes.icon} strokeWidth={2} />
          </button>
        );
      })}
    </div>
  );
}