"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const storageKey = "crewcast-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("dark");

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved === "light" || saved === "dark" || saved === "system") {
      setThemeState(saved);
      return;
    }

    setThemeState("system");
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const nextResolved: ResolvedTheme =
        theme === "system" ? (media.matches ? "dark" : "light") : theme;

      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(nextResolved);
      root.dataset.theme = theme;
      root.style.colorScheme = nextResolved;
      setResolvedTheme(nextResolved);
    };

    applyTheme();
    media.addEventListener("change", applyTheme);
    return () => media.removeEventListener("change", applyTheme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme(nextTheme: Theme) {
        window.localStorage.setItem(storageKey, nextTheme);
        setThemeState(nextTheme);
      },
    }),
    [theme, resolvedTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return value;
}
