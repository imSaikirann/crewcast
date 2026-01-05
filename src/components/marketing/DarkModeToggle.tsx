"use client";

import { useTheme } from "../ThemeProvider";
import { HugeIcon } from "@/utils/hugeicons";

export function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <HugeIcon name="sun" className="w-5 h-5 text-foreground" />
      ) : (
        <HugeIcon name="moon" className="w-5 h-5 text-foreground" />
      )}
    </button>
  );
}

