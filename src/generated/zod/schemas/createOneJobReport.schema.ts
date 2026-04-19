import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { JobReportSelectObjectSchema as JobReportSelectObjectSchema } from './objects/JobReportSelect.schema';
import { JobReportIncludeObjectSchema as JobReportIncludeObjectSchema } from './objects/JobReportInclude.schema';
import { JobReportCreateInputObjectSchema as JobReportCreateInputObjectSchema } from './objects/JobReportCreateInput.schema';
import { JobReportUncheckedCreateInputObjectSchema as JobReportUncheckedCreateInputObjectSchema } from './objects/JobReportUncheckedCreateInput.schema';

export const JobReportCreateOneSchema: z.ZodType<Prisma.JobReportCreateArgs> = z.object({ select: JobReportSelectObjectSchema.optional(), include: JobReportIncludeObjectSchema.optional(), data: z.union([JobReportCreateInputObjectSchema, JobReportUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.JobReportCreateArgs>;

export const JobReportCreateOneZodSchema = z.object({ select: JobReportSelectObjectSchema.optional(), include: JobReportIncludeObjectSchema.optional(), data: z.union([JobReportCreateInputObjectSchema, JobReportUncheckedCreateInputObjectSchema]) }).strict();