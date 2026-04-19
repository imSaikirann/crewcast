import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecruiterIncludeObjectSchema as RecruiterIncludeObjectSchema } from './objects/RecruiterInclude.schema';
import { RecruiterOrderByWithRelationInputObjectSchema as RecruiterOrderByWithRelationInputObjectSchema } from './objects/RecruiterOrderByWithRelationInput.schema';
import { RecruiterWhereInputObjectSchema as RecruiterWhereInputObjectSchema } from './objects/RecruiterWhereInput.schema';
import { RecruiterWhereUniqueInputObjectSchema as RecruiterWhereUniqueInputObjectSchema } from './objects/RecruiterWhereUniqueInput.schema';
import { RecruiterScalarFieldEnumSchema } from './enums/RecruiterScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const RecruiterFindFirstOrThrowSelectSchema: z.ZodType<Prisma.RecruiterSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    companyName: z.boolean().optional(),
    companyEmail: z.boolean().optional(),
    website: z.boolean().optional(),
    linkedinLink: z.boolean().optional(),
    verified: z.boolean().optional(),
    plan: z.boolean().optional(),
    formLimit: z.boolean().optional(),
    activeFormCount: z.boolean().optional(),
    totalFormsCount: z.boolean().optional(),
    totalFormsLimit: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    recruiterForms: z.boolean().optional(),
    verification: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.RecruiterSelect>;

export const RecruiterFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    companyName: z.boolean().optional(),
    companyEmail: z.boolean().optional(),
    website: z.boolean().optional(),
    linkedinLink: z.boolean().optional(),
    verified: z.boolean().optional(),
    plan: z.boolean().optional(),
    formLimit: z.boolean().optional(),
    activeFormCount: z.boolean().optional(),
    totalFormsCount: z.boolean().optional(),
    totalFormsLimit: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    recruiterForms: z.boolean().optional(),
    verification: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const RecruiterFindFirstOrThrowSchema: z.ZodType<Prisma.RecruiterFindFirstOrThrowArgs> = z.object({ select: RecruiterFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => RecruiterIncludeObjectSchema.optional()), orderBy: z.union([RecruiterOrderByWithRelationInputObjectSchema, RecruiterOrderByWithRelationInputObjectSchema.array()]).optional(), where: RecruiterWhereInputObjectSchema.optional(), cursor: RecruiterWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([RecruiterScalarFieldEnumSchema, RecruiterScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.RecruiterFindFirstOrThrowArgs>;

export const RecruiterFindFirstOrThrowZodSchema = z.object({ select: RecruiterFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => RecruiterIncludeObjectSchema.optional()), orderBy: z.union([RecruiterOrderByWithRelationInputObjectSchema, RecruiterOrderByWithRelationInputObjectSchema.array()]).optional(), where: RecruiterWhereInputObjectSchema.optional(), cursor: RecruiterWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([RecruiterScalarFieldEnumSchema, RecruiterScalarFieldEnumSchema.array()]).optional() }).strict();