import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DomainsIncludeObjectSchema as DomainsIncludeObjectSchema } from './objects/DomainsInclude.schema';
import { DomainsOrderByWithRelationInputObjectSchema as DomainsOrderByWithRelationInputObjectSchema } from './objects/DomainsOrderByWithRelationInput.schema';
import { DomainsWhereInputObjectSchema as DomainsWhereInputObjectSchema } from './objects/DomainsWhereInput.schema';
import { DomainsWhereUniqueInputObjectSchema as DomainsWhereUniqueInputObjectSchema } from './objects/DomainsWhereUniqueInput.schema';
import { DomainsScalarFieldEnumSchema } from './enums/DomainsScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const DomainsFindManySelectSchema: z.ZodType<Prisma.DomainsSelect> = z.object({
    id: z.boolean().optional(),
    title: z.boolean().optional(),
    description: z.boolean().optional(),
    jobCount: z.boolean().optional(),
    haveDefaultForm: z.boolean().optional(),
    isActive: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    recruiterForms: z.boolean().optional(),
    defaultFormSchemas: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.DomainsSelect>;

export const DomainsFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    title: z.boolean().optional(),
    description: z.boolean().optional(),
    jobCount: z.boolean().optional(),
    haveDefaultForm: z.boolean().optional(),
    isActive: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    recruiterForms: z.boolean().optional(),
    defaultFormSchemas: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const DomainsFindManySchema: z.ZodType<Prisma.DomainsFindManyArgs> = z.object({ select: DomainsFindManySelectSchema.optional(), include: z.lazy(() => DomainsIncludeObjectSchema.optional()), orderBy: z.union([DomainsOrderByWithRelationInputObjectSchema, DomainsOrderByWithRelationInputObjectSchema.array()]).optional(), where: DomainsWhereInputObjectSchema.optional(), cursor: DomainsWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([DomainsScalarFieldEnumSchema, DomainsScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.DomainsFindManyArgs>;

export const DomainsFindManyZodSchema = z.object({ select: DomainsFindManySelectSchema.optional(), include: z.lazy(() => DomainsIncludeObjectSchema.optional()), orderBy: z.union([DomainsOrderByWithRelationInputObjectSchema, DomainsOrderByWithRelationInputObjectSchema.array()]).optional(), where: DomainsWhereInputObjectSchema.optional(), cursor: DomainsWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([DomainsScalarFieldEnumSchema, DomainsScalarFieldEnumSchema.array()]).optional() }).strict();