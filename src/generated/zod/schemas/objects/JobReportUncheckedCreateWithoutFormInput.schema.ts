import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  reason: z.string(),
  message: z.string().optional().nullable(),
  ip: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const JobReportUncheckedCreateWithoutFormInputObjectSchema: z.ZodType<Prisma.JobReportUncheckedCreateWithoutFormInput> = makeSchema() as unknown as z.ZodType<Prisma.JobReportUncheckedCreateWithoutFormInput>;
export const JobReportUncheckedCreateWithoutFormInputObjectZodSchema = makeSchema();
