export type FieldType = "text" | "email" | "number" | "textarea" | "select" | "checkbox" | "date" | "file";
export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; 
}

export interface FormPreviewProps {
  title: string;
  description: string;
  fields: FormField[];
}


export interface PreviewFieldProps {
  field: FormField;
}


export interface FieldEditorProps {
  field: FormField;
  onUpdate: (updates: Partial<FormField>) => void;
  onRemove: () => void;
  onAddOption: (option: string) => void;
  onRemoveOption: (index: number) => void;
}
