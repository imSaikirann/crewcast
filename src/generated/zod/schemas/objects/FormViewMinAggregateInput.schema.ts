import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  formId: z.literal(true).optional(),
  ip: z.literal(true).optional(),
  userAgent: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const FormViewMinAggregateInputObjectSchema: z.ZodType<Prisma.FormViewMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.FormViewMinAggregateInputType>;
export const FormViewMinAggregateInputObjectZodSchema = makeSchema();
