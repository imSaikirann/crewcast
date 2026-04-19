import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  reason: z.string(),
  message: z.string().optional().nullable(),
  ip: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const JobReportCreateWithoutFormInputObjectSchema: z.ZodType<Prisma.JobReportCreateWithoutFormInput> = makeSchema() as unknown as z.ZodType<Prisma.JobReportCreateWithoutFormInput>;
export const JobReportCreateWithoutFormInputObjectZodSchema = makeSchema();
