import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  formId: z.literal(true).optional(),
  ip: z.literal(true).optional(),
  userAgent: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const FormViewCountAggregateInputObjectSchema: z.ZodType<Prisma.FormViewCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.FormViewCountAggregateInputType>;
export const FormViewCountAggregateInputObjectZodSchema = makeSchema();
