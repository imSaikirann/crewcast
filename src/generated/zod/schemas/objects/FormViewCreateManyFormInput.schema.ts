import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  ip: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const FormViewCreateManyFormInputObjectSchema: z.ZodType<Prisma.FormViewCreateManyFormInput> = makeSchema() as unknown as z.ZodType<Prisma.FormViewCreateManyFormInput>;
export const FormViewCreateManyFormInputObjectZodSchema = makeSchema();
