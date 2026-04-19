import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { JobReportSelectObjectSchema as JobReportSelectObjectSchema } from './objects/JobReportSelect.schema';
import { JobReportIncludeObjectSchema as JobReportIncludeObjectSchema } from './objects/JobReportInclude.schema';
import { JobReportWhereUniqueInputObjectSchema as JobReportWhereUniqueInputObjectSchema } from './objects/JobReportWhereUniqueInput.schema';
import { JobReportCreateInputObjectSchema as JobReportCreateInputObjectSchema } from './objects/JobReportCreateInput.schema';
import { JobReportUncheckedCreateInputObjectSchema as JobReportUncheckedCreateInputObjectSchema } from './objects/JobReportUncheckedCreateInput.schema';
import { JobReportUpdateInputObjectSchema as JobReportUpdateInputObjectSchema } from './objects/JobReportUpdateInput.schema';
import { JobReportUncheckedUpdateInputObjectSchema as JobReportUncheckedUpdateInputObjectSchema } from './objects/JobReportUncheckedUpdateInput.schema';

export const JobReportUpsertOneSchema: z.ZodType<Prisma.JobReportUpsertArgs> = z.object({ select: JobReportSelectObjectSchema.optional(), include: JobReportIncludeObjectSchema.optional(), where: JobReportWhereUniqueInputObjectSchema, create: z.union([ JobReportCreateInputObjectSchema, JobReportUncheckedCreateInputObjectSchema ]), update: z.union([ JobReportUpdateInputObjectSchema, JobReportUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.JobReportUpsertArgs>;

export const JobReportUpsertOneZodSchema = z.object({ select: JobReportSelectObjectSchema.optional(), include: JobReportIncludeObjectSchema.optional(), where: JobReportWhereUniqueInputObjectSchema, create: z.union([ JobReportCreateInputObjectSchema, JobReportUncheckedCreateInputObjectSchema ]), update: z.union([ JobReportUpdateInputObjectSchema, JobReportUncheckedUpdateInputObjectSchema ]) }).strict();