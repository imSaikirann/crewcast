import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  jobCount: z.literal(true).optional()
}).strict();
export const DomainsSumAggregateInputObjectSchema: z.ZodType<Prisma.DomainsSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.DomainsSumAggregateInputType>;
export const DomainsSumAggregateInputObjectZodSchema = makeSchema();
