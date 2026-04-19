import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  email: z.literal(true).optional(),
  company: z.literal(true).optional(),
  plan: z.literal(true).optional(),
  status: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const UpgradeRequestCountAggregateInputObjectSchema: z.ZodType<Prisma.UpgradeRequestCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.UpgradeRequestCountAggregateInputType>;
export const UpgradeRequestCountAggregateInputObjectZodSchema = makeSchema();
