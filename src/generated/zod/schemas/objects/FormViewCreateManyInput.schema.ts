import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  formId: z.string().max(24),
  ip: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const FormViewCreateManyInputObjectSchema: z.ZodType<Prisma.FormViewCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.FormViewCreateManyInput>;
export const FormViewCreateManyInputObjectZodSchema = makeSchema();
