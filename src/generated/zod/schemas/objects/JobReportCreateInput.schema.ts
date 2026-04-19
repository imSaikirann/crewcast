import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormCreateNestedOneWithoutJobReportInputObjectSchema as RecruiterFormCreateNestedOneWithoutJobReportInputObjectSchema } from './RecruiterFormCreateNestedOneWithoutJobReportInput.schema'

const makeSchema = () => z.object({
  id: z.string().max(24).optional(),
  reason: z.string(),
  message: z.string().optional().nullable(),
  ip: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  form: z.lazy(() => RecruiterFormCreateNestedOneWithoutJobReportInputObjectSchema)
}).strict();
export const JobReportCreateInputObjectSchema: z.ZodType<Prisma.JobReportCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.JobReportCreateInput>;
export const JobReportCreateInputObjectZodSchema = makeSchema();
