import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  trackingToken: z.literal(true).optional(),
  jobId: z.literal(true).optional(),
  fullName: z.literal(true).optional(),
  email: z.literal(true).optional(),
  status: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const ApplicationMinAggregateInputObjectSchema: z.ZodType<Prisma.ApplicationMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationMinAggregateInputType>;
export const ApplicationMinAggregateInputObjectZodSchema = makeSchema();
