import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { RecruiterFormOrderByWithRelationInputObjectSchema as RecruiterFormOrderByWithRelationInputObjectSchema } from './RecruiterFormOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  formId: SortOrderSchema.optional(),
  ip: SortOrderSchema.optional(),
  userAgent: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  form: z.lazy(() => RecruiterFormOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const FormViewOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.FormViewOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.FormViewOrderByWithRelationInput>;
export const FormViewOrderByWithRelationInputObjectZodSchema = makeSchema();
