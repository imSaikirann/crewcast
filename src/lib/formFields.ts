export const GITHUB_FIELD_ID = "github";

export const REQUIRED_GITHUB_FIELD = {
  id: GITHUB_FIELD_ID,
  label: "GitHub profile",
  type: "url",
  required: true,
  placeholder: "https://github.com/username",
  locked: true,
};

type FieldLike = {
  id?: unknown;
  label?: unknown;
  type?: unknown;
  required?: unknown;
  placeholder?: unknown;
  locked?: unknown;
};

const GITHUB_FIELD_HINTS = [
  "github",
  "git hub",
  "github username",
  "github profile",
];

export function isGitHubField(field: unknown) {
  const item = field as { id?: unknown; label?: unknown } | null;
  const id = String(item?.id ?? "").toLowerCase();
  const label = String(item?.label ?? "").toLowerCase();

  return GITHUB_FIELD_HINTS.some(
    (hint) => label.includes(hint) || id.includes(hint.replace(" ", ""))
  );
}

export function withRequiredGitHubField<T extends FieldLike>(fields: T[]): T[] {
  const normalized = fields.map((field) => {
    if (!isGitHubField(field)) return field;

    return {
      ...field,
      id: String(field.id || GITHUB_FIELD_ID),
      label: String(field.label || REQUIRED_GITHUB_FIELD.label),
      type: "url",
      required: true,
      placeholder: String(field.placeholder || REQUIRED_GITHUB_FIELD.placeholder),
      locked: true,
    } as T;
  });

  if (normalized.some(isGitHubField)) return normalized;

  return [REQUIRED_GITHUB_FIELD as unknown as T, ...normalized];
}
