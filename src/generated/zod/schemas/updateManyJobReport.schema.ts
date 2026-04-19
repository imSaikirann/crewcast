import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { JobReportUpdateManyMutationInputObjectSchema as JobReportUpdateManyMutationInputObjectSchema } from './objects/JobReportUpdateManyMutationInput.schema';
import { JobReportWhereInputObjectSchema as JobReportWhereInputObjectSchema } from './objects/JobReportWhereInput.schema';

export const JobReportUpdateManySchema: z.ZodType<Prisma.JobReportUpdateManyArgs> = z.object({ data: JobReportUpdateManyMutationInputObjectSchema, where: JobReportWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.JobReportUpdateManyArgs>;

export const JobReportUpdateManyZodSchema = z.object({ data: JobReportUpdateManyMutationInputObjectSchema, where: JobReportWhereInputObjectSchema.optional() }).strict();