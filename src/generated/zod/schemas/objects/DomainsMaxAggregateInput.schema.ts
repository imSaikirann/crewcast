import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  title: z.literal(true).optional(),
  description: z.literal(true).optional(),
  jobCount: z.literal(true).optional(),
  haveDefaultForm: z.literal(true).optional(),
  isActive: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const DomainsMaxAggregateInputObjectSchema: z.ZodType<Prisma.DomainsMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.DomainsMaxAggregateInputType>;
export const DomainsMaxAggregateInputObjectZodSchema = makeSchema();
