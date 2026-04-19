import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ApplicationIncludeObjectSchema as ApplicationIncludeObjectSchema } from './objects/ApplicationInclude.schema';
import { ApplicationOrderByWithRelationInputObjectSchema as ApplicationOrderByWithRelationInputObjectSchema } from './objects/ApplicationOrderByWithRelationInput.schema';
import { ApplicationWhereInputObjectSchema as ApplicationWhereInputObjectSchema } from './objects/ApplicationWhereInput.schema';
import { ApplicationWhereUniqueInputObjectSchema as ApplicationWhereUniqueInputObjectSchema } from './objects/ApplicationWhereUniqueInput.schema';
import { ApplicationScalarFieldEnumSchema } from './enums/ApplicationScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ApplicationFindFirstOrThrowSelectSchema: z.ZodType<Prisma.ApplicationSelect> = z.object({
    id: z.boolean().optional(),
    jobId: z.boolean().optional(),
    job: z.boolean().optional(),
    fullName: z.boolean().optional(),
    email: z.boolean().optional(),
    responses: z.boolean().optional(),
    status: z.boolean().optional(),
    scores: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ApplicationSelect>;

export const ApplicationFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    jobId: z.boolean().optional(),
    job: z.boolean().optional(),
    fullName: z.boolean().optional(),
    email: z.boolean().optional(),
    responses: z.boolean().optional(),
    status: z.boolean().optional(),
    scores: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const ApplicationFindFirstOrThrowSchema: z.ZodType<Prisma.ApplicationFindFirstOrThrowArgs> = z.object({ select: ApplicationFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => ApplicationIncludeObjectSchema.optional()), orderBy: z.union([ApplicationOrderByWithRelationInputObjectSchema, ApplicationOrderByWithRelationInputObjectSchema.array()]).optional(), where: ApplicationWhereInputObjectSchema.optional(), cursor: ApplicationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ApplicationScalarFieldEnumSchema, ApplicationScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ApplicationFindFirstOrThrowArgs>;

export const ApplicationFindFirstOrThrowZodSchema = z.object({ select: ApplicationFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => ApplicationIncludeObjectSchema.optional()), orderBy: z.union([ApplicationOrderByWithRelationInputObjectSchema, ApplicationOrderByWithRelationInputObjectSchema.array()]).optional(), where: ApplicationWhereInputObjectSchema.optional(), cursor: ApplicationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ApplicationScalarFieldEnumSchema, ApplicationScalarFieldEnumSchema.array()]).optional() }).strict();