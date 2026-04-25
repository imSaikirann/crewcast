import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecruiterFormIncludeObjectSchema as RecruiterFormIncludeObjectSchema } from './objects/RecruiterFormInclude.schema';
import { RecruiterFormOrderByWithRelationInputObjectSchema as RecruiterFormOrderByWithRelationInputObjectSchema } from './objects/RecruiterFormOrderByWithRelationInput.schema';
import { RecruiterFormWhereInputObjectSchema as RecruiterFormWhereInputObjectSchema } from './objects/RecruiterFormWhereInput.schema';
import { RecruiterFormWhereUniqueInputObjectSchema as RecruiterFormWhereUniqueInputObjectSchema } from './objects/RecruiterFormWhereUniqueInput.schema';
import { RecruiterFormScalarFieldEnumSchema } from './enums/RecruiterFormScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const RecruiterFormFindFirstOrThrowSelectSchema: z.ZodType<Prisma.RecruiterFormSelect> = z.object({
    id: z.boolean().optional(),
    recruiterId: z.boolean().optional(),
    recruiter: z.boolean().optional(),
    domainId: z.boolean().optional(),
    domain: z.boolean().optional(),
    publicId: z.boolean().optional(),
    title: z.boolean().optional(),
    description: z.boolean().optional(),
    specialization: z.boolean().optional(),
    roleType: z.boolean().optional(),
    experience: z.boolean().optional(),
    workMode: z.boolean().optional(),
    location: z.boolean().optional(),
    salaryMin: z.boolean().optional(),
    salaryMax: z.boolean().optional(),
    currency: z.boolean().optional(),
    techStack: z.boolean().optional(),
    openings: z.boolean().optional(),
    contractDurationMonths: z.boolean().optional(),
    showCompanyName: z.boolean().optional(),
    status: z.boolean().optional(),
    version: z.boolean().optional(),
    publishedAt: z.boolean().optional(),
    fields: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    applications: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    reportCount: z.boolean().optional(),
    isFlagged: z.boolean().optional(),
    viewCount: z.boolean().optional(),
    views: z.boolean().optional(),
    jobReport: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.RecruiterFormSelect>;

export const RecruiterFormFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    recruiterId: z.boolean().optional(),
    recruiter: z.boolean().optional(),
    domainId: z.boolean().optional(),
    domain: z.boolean().optional(),
    publicId: z.boolean().optional(),
    title: z.boolean().optional(),
    description: z.boolean().optional(),
    specialization: z.boolean().optional(),
    roleType: z.boolean().optional(),
    experience: z.boolean().optional(),
    workMode: z.boolean().optional(),
    location: z.boolean().optional(),
    salaryMin: z.boolean().optional(),
    salaryMax: z.boolean().optional(),
    currency: z.boolean().optional(),
    techStack: z.boolean().optional(),
    openings: z.boolean().optional(),
    contractDurationMonths: z.boolean().optional(),
    showCompanyName: z.boolean().optional(),
    status: z.boolean().optional(),
    version: z.boolean().optional(),
    publishedAt: z.boolean().optional(),
    fields: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    applications: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    reportCount: z.boolean().optional(),
    isFlagged: z.boolean().optional(),
    viewCount: z.boolean().optional(),
    views: z.boolean().optional(),
    jobReport: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const RecruiterFormFindFirstOrThrowSchema: z.ZodType<Prisma.RecruiterFormFindFirstOrThrowArgs> = z.object({ select: RecruiterFormFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => RecruiterFormIncludeObjectSchema.optional()), orderBy: z.union([RecruiterFormOrderByWithRelationInputObjectSchema, RecruiterFormOrderByWithRelationInputObjectSchema.array()]).optional(), where: RecruiterFormWhereInputObjectSchema.optional(), cursor: RecruiterFormWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([RecruiterFormScalarFieldEnumSchema, RecruiterFormScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.RecruiterFormFindFirstOrThrowArgs>;

export const RecruiterFormFindFirstOrThrowZodSchema = z.object({ select: RecruiterFormFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => RecruiterFormIncludeObjectSchema.optional()), orderBy: z.union([RecruiterFormOrderByWithRelationInputObjectSchema, RecruiterFormOrderByWithRelationInputObjectSchema.array()]).optional(), where: RecruiterFormWhereInputObjectSchema.optional(), cursor: RecruiterFormWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([RecruiterFormScalarFieldEnumSchema, RecruiterFormScalarFieldEnumSchema.array()]).optional() }).strict();