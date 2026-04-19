import * as z from 'zod';
export const FormFieldFindManyResultSchema = z.object({
  data: z.array(z.object({
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
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});