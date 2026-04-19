import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { JobReportIncludeObjectSchema as JobReportIncludeObjectSchema } from './objects/JobReportInclude.schema';
import { JobReportOrderByWithRelationInputObjectSchema as JobReportOrderByWithRelationInputObjectSchema } from './objects/JobReportOrderByWithRelationInput.schema';
import { JobReportWhereInputObjectSchema as JobReportWhereInputObjectSchema } from './objects/JobReportWhereInput.schema';
import { JobReportWhereUniqueInputObjectSchema as JobReportWhereUniqueInputObjectSchema } from './objects/JobReportWhereUniqueInput.schema';
import { JobReportScalarFieldEnumSchema } from './enums/JobReportScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const JobReportFindFirstSelectSchema: z.ZodType<Prisma.JobReportSelect> = z.object({
    id: z.boolean().optional(),
    formId: z.boolean().optional(),
    form: z.boolean().optional(),
    reason: z.boolean().optional(),
    message: z.boolean().optional(),
    ip: z.boolean().optional(),
    userAgent: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.JobReportSelect>;

export const JobReportFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    formId: z.boolean().optional(),
    form: z.boolean().optional(),
    reason: z.boolean().optional(),
    message: z.boolean().optional(),
    ip: z.boolean().optional(),
    userAgent: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict();

export const JobReportFindFirstSchema: z.ZodType<Prisma.JobReportFindFirstArgs> = z.object({ select: JobReportFindFirstSelectSchema.optional(), include: z.lazy(() => JobReportIncludeObjectSchema.optional()), orderBy: z.union([JobReportOrderByWithRelationInputObjectSchema, JobReportOrderByWithRelationInputObjectSchema.array()]).optional(), where: JobReportWhereInputObjectSchema.optional(), cursor: JobReportWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([JobReportScalarFieldEnumSchema, JobReportScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.JobReportFindFirstArgs>;

export const JobReportFindFirstZodSchema = z.object({ select: JobReportFindFirstSelectSchema.optional(), include: z.lazy(() => JobReportIncludeObjectSchema.optional()), orderBy: z.union([JobReportOrderByWithRelationInputObjectSchema, JobReportOrderByWithRelationInputObjectSchema.array()]).optional(), where: JobReportWhereInputObjectSchema.optional(), cursor: JobReportWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([JobReportScalarFieldEnumSchema, JobReportScalarFieldEnumSchema.array()]).optional() }).strict();