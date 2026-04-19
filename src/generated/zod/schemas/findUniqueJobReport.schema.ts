import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { JobReportSelectObjectSchema as JobReportSelectObjectSchema } from './objects/JobReportSelect.schema';
import { JobReportIncludeObjectSchema as JobReportIncludeObjectSchema } from './objects/JobReportInclude.schema';
import { JobReportWhereUniqueInputObjectSchema as JobReportWhereUniqueInputObjectSchema } from './objects/JobReportWhereUniqueInput.schema';

export const JobReportFindUniqueSchema: z.ZodType<Prisma.JobReportFindUniqueArgs> = z.object({ select: JobReportSelectObjectSchema.optional(), include: JobReportIncludeObjectSchema.optional(), where: JobReportWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.JobReportFindUniqueArgs>;

export const JobReportFindUniqueZodSchema = z.object({ select: JobReportSelectObjectSchema.optional(), include: JobReportIncludeObjectSchema.optional(), where: JobReportWhereUniqueInputObjectSchema }).strict();