import * as z from 'zod';
export const FormViewFindUniqueResultSchema = z.nullable(z.object({
  id: z.string(),
  formId: z.string(),
  form: z.unknown(),
  ip: z.string().optional(),
  userAgent: z.string().optional(),
  createdAt: z.date()
}));