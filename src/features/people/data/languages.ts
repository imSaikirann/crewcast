/**
 * Programming languages used for the "Find People" GitHub search filter.
 * `value` must match the language name GitHub recognises in its
 * `language:` search qualifier.
 */
export type LanguageOption = {
  value: string;
  label: string;
};

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: "JavaScript", label: "JavaScript" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "Python", label: "Python" },
  { value: "Go", label: "Go" },
  { value: "Rust", label: "Rust" },
  { value: "Java", label: "Java" },
  { value: "Kotlin", label: "Kotlin" },
  { value: "Swift", label: "Swift" },
  { value: "C", label: "C" },
  { value: "C++", label: "C++" },
  { value: "C#", label: "C#" },
  { value: "PHP", label: "PHP" },
  { value: "Ruby", label: "Ruby" },
  { value: "Dart", label: "Dart" },
  { value: "Scala", label: "Scala" },
  { value: "Elixir", label: "Elixir" },
  { value: "Erlang", label: "Erlang" },
  { value: "Haskell", label: "Haskell" },
  { value: "Clojure", label: "Clojure" },
  { value: "Lua", label: "Lua" },
  { value: "Perl", label: "Perl" },
  { value: "R", label: "R" },
  { value: "Julia", label: "Julia" },
  { value: "Objective-C", label: "Objective-C" },
  { value: "Shell", label: "Shell" },
  { value: "PowerShell", label: "PowerShell" },
  { value: "HTML", label: "HTML" },
  { value: "CSS", label: "CSS" },
  { value: "Vue", label: "Vue" },
  { value: "Svelte", label: "Svelte" },
  { value: "Solidity", label: "Solidity" },
  { value: "Zig", label: "Zig" },
  { value: "Nim", label: "Nim" },
  { value: "Crystal", label: "Crystal" },
  { value: "OCaml", label: "OCaml" },
  { value: "F#", label: "F#" },
  { value: "Groovy", label: "Groovy" },
  { value: "MATLAB", label: "MATLAB" },
  { value: "Assembly", label: "Assembly" },
  { value: "Vala", label: "Vala" },
  { value: "CoffeeScript", label: "CoffeeScript" },
  { value: "TeX", label: "TeX" },
  { value: "Jupyter Notebook", label: "Jupyter Notebook" },
  { value: "Dockerfile", label: "Dockerfile" },
  { value: "HCL", label: "HCL (Terraform)" },
  { value: "GDScript", label: "GDScript" },
  { value: "Verilog", label: "Verilog" },
  { value: "VHDL", label: "VHDL" },
  { value: "WebAssembly", label: "WebAssembly" },
  { value: "PLpgSQL", label: "PL/pgSQL" },
];

const LANGUAGE_LABELS = new Map(
  LANGUAGE_OPTIONS.map((option) => [option.value, option.label])
);

export function languageLabel(value: string): string {
  return LANGUAGE_LABELS.get(value) ?? value;
}
