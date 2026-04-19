import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  formId: z.string(),
  reason: z.string(),
  message: z.string().optional().nullable(),
  ip: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const JobReportCreateManyInputObjectSchema: z.ZodType<Prisma.JobReportCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.JobReportCreateManyInput>;
export const JobReportCreateManyInputObjectZodSchema = makeSchema();
