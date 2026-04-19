import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  salaryMin: z.literal(true).optional(),
  salaryMax: z.literal(true).optional(),
  contractDurationMonths: z.literal(true).optional(),
  version: z.literal(true).optional(),
  reportCount: z.literal(true).optional(),
  viewCount: z.literal(true).optional()
}).strict();
export const RecruiterFormSumAggregateInputObjectSchema: z.ZodType<Prisma.RecruiterFormSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormSumAggregateInputType>;
export const RecruiterFormSumAggregateInputObjectZodSchema = makeSchema();
