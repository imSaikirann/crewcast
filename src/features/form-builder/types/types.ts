import { RoleType } from "@prisma/client";

export type FieldType = "text" | "email" | "number" | "textarea" | "select" | "checkbox" | "date" | "file" | "url";
export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; 
  locked?: boolean;
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


export interface JobFormDetails {
  formTitle: string
  formDescription: string
  expiresAt: string
  domainId: string
  roleType: string
  experience: string
  workMode: string
  location: string
  specialization: string
  techStack: string[]
  salaryMin: number
  salaryMax: number
  currency: string
  contractDurationMonths: number
}
