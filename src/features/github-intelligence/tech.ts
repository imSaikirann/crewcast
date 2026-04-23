const TECH_ALIASES: Record<string, string> = {
  js: "javascript",
  jsx: "javascript",
  node: "javascript",
  nodejs: "javascript",
  "node.js": "javascript",
  react: "javascript",
  reactjs: "javascript",
  "react.js": "javascript",
  ts: "typescript",
  tsx: "typescript",
  next: "typescript",
  nextjs: "typescript",
  "next.js": "typescript",
  vue: "javascript",
  "vue.js": "javascript",
  angular: "typescript",
  py: "python",
  golang: "go",
  postgres: "sql",
  postgresql: "sql",
  mysql: "sql",
  sqlite: "sql",
  mongo: "javascript",
  mongodb: "javascript",
  tailwind: "css",
  "tailwind css": "css",
  html5: "html",
  css3: "css",
  csharp: "c#",
  dotnet: "c#",
  ".net": "c#",
};

export function normalizeTech(value: string) {
  const normalized = value.trim().toLowerCase();
  if (!normalized) return null;
  return TECH_ALIASES[normalized] ?? normalized;
}

export function normalizeTechStack(values: string[] = []) {
  return Array.from(
    new Set(
      values
        .map((value) => normalizeTech(value))
        .filter((value): value is string => Boolean(value))
    )
  );
}

export function displayTech(value: string) {
  const normalized = normalizeTech(value) ?? value.trim().toLowerCase();
  const labels: Record<string, string> = {
    javascript: "JavaScript",
    typescript: "TypeScript",
    python: "Python",
    go: "Go",
    sql: "SQL",
    css: "CSS",
    html: "HTML",
    "c#": "C#",
  };

  return labels[normalized] ?? normalized.replace(/\b\w/g, (char) => char.toUpperCase());
}
