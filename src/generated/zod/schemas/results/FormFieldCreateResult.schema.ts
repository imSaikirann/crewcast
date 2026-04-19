import * as z from 'zod';
export const FormFieldCreateResultSchema = z.object({
  id: z.string(),
  roleId: z.string(),
  role: z.unknown(),
  label: z.string(),
  name: z.string(),
  type: z.string(),
  required: z.boolean(),
  options: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date()
});