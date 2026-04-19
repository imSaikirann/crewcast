import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  roleId: z.literal(true).optional(),
  label: z.literal(true).optional(),
  name: z.literal(true).optional(),
  type: z.literal(true).optional(),
  required: z.literal(true).optional(),
  options: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const FormFieldCountAggregateInputObjectSchema: z.ZodType<Prisma.FormFieldCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.FormFieldCountAggregateInputType>;
export const FormFieldCountAggregateInputObjectZodSchema = makeSchema();
