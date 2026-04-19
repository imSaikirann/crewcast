import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  formLimit: z.literal(true).optional(),
  activeFormCount: z.literal(true).optional(),
  totalFormsCount: z.literal(true).optional(),
  totalFormsLimit: z.literal(true).optional()
}).strict();
export const RecruiterSumAggregateInputObjectSchema: z.ZodType<Prisma.RecruiterSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterSumAggregateInputType>;
export const RecruiterSumAggregateInputObjectZodSchema = makeSchema();
