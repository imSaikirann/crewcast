import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  roleId: z.literal(true).optional(),
  label: z.literal(true).optional(),
  name: z.literal(true).optional(),
  type: z.literal(true).optional(),
  required: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const FormFieldMinAggregateInputObjectSchema: z.ZodType<Prisma.FormFieldMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.FormFieldMinAggregateInputType>;
export const FormFieldMinAggregateInputObjectZodSchema = makeSchema();
