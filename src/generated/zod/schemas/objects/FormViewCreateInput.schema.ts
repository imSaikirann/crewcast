import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormCreateNestedOneWithoutViewsInputObjectSchema as RecruiterFormCreateNestedOneWithoutViewsInputObjectSchema } from './RecruiterFormCreateNestedOneWithoutViewsInput.schema'

const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  ip: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  form: z.lazy(() => RecruiterFormCreateNestedOneWithoutViewsInputObjectSchema)
}).strict();
export const FormViewCreateInputObjectSchema: z.ZodType<Prisma.FormViewCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.FormViewCreateInput>;
export const FormViewCreateInputObjectZodSchema = makeSchema();
