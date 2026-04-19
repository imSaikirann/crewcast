import * as z from 'zod';
export const RoleDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  name: z.string(),
  isActive: z.boolean(),
  fields: z.array(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date()
}));