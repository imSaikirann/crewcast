import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  jobCount: z.literal(true).optional()
}).strict();
export const DomainsAvgAggregateInputObjectSchema: z.ZodType<Prisma.DomainsAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.DomainsAvgAggregateInputType>;
export const DomainsAvgAggregateInputObjectZodSchema = makeSchema();
