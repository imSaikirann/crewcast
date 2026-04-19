import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  formId: z.literal(true).optional(),
  reason: z.literal(true).optional(),
  message: z.literal(true).optional(),
  ip: z.literal(true).optional(),
  userAgent: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const JobReportMinAggregateInputObjectSchema: z.ZodType<Prisma.JobReportMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.JobReportMinAggregateInputType>;
export const JobReportMinAggregateInputObjectZodSchema = makeSchema();
