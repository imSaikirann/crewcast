import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { JobReportWhereInputObjectSchema as JobReportWhereInputObjectSchema } from './objects/JobReportWhereInput.schema';

export const JobReportDeleteManySchema: z.ZodType<Prisma.JobReportDeleteManyArgs> = z.object({ where: JobReportWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.JobReportDeleteManyArgs>;

export const JobReportDeleteManyZodSchema = z.object({ where: JobReportWhereInputObjectSchema.optional() }).strict();