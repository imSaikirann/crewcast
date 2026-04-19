import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  formLimit: z.literal(true).optional(),
  activeFormCount: z.literal(true).optional(),
  totalFormsCount: z.literal(true).optional(),
  totalFormsLimit: z.literal(true).optional()
}).strict();
export const RecruiterAvgAggregateInputObjectSchema: z.ZodType<Prisma.RecruiterAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterAvgAggregateInputType>;
export const RecruiterAvgAggregateInputObjectZodSchema = makeSchema();
