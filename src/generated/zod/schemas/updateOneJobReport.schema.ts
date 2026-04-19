import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { JobReportSelectObjectSchema as JobReportSelectObjectSchema } from './objects/JobReportSelect.schema';
import { JobReportIncludeObjectSchema as JobReportIncludeObjectSchema } from './objects/JobReportInclude.schema';
import { JobReportUpdateInputObjectSchema as JobReportUpdateInputObjectSchema } from './objects/JobReportUpdateInput.schema';
import { JobReportUncheckedUpdateInputObjectSchema as JobReportUncheckedUpdateInputObjectSchema } from './objects/JobReportUncheckedUpdateInput.schema';
import { JobReportWhereUniqueInputObjectSchema as JobReportWhereUniqueInputObjectSchema } from './objects/JobReportWhereUniqueInput.schema';

export const JobReportUpdateOneSchema: z.ZodType<Prisma.JobReportUpdateArgs> = z.object({ select: JobReportSelectObjectSchema.optional(), include: JobReportIncludeObjectSchema.optional(), data: z.union([JobReportUpdateInputObjectSchema, JobReportUncheckedUpdateInputObjectSchema]), where: JobReportWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.JobReportUpdateArgs>;

export const JobReportUpdateOneZodSchema = z.object({ select: JobReportSelectObjectSchema.optional(), include: JobReportIncludeObjectSchema.optional(), data: z.union([JobReportUpdateInputObjectSchema, JobReportUncheckedUpdateInputObjectSchema]), where: JobReportWhereUniqueInputObjectSchema }).strict();