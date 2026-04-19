import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ApplicationScoreIncludeObjectSchema as ApplicationScoreIncludeObjectSchema } from './objects/ApplicationScoreInclude.schema';
import { ApplicationScoreOrderByWithRelationInputObjectSchema as ApplicationScoreOrderByWithRelationInputObjectSchema } from './objects/ApplicationScoreOrderByWithRelationInput.schema';
import { ApplicationScoreWhereInputObjectSchema as ApplicationScoreWhereInputObjectSchema } from './objects/ApplicationScoreWhereInput.schema';
import { ApplicationScoreWhereUniqueInputObjectSchema as ApplicationScoreWhereUniqueInputObjectSchema } from './objects/ApplicationScoreWhereUniqueInput.schema';
import { ApplicationScoreScalarFieldEnumSchema } from './enums/ApplicationScoreScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ApplicationScoreFindManySelectSchema: z.ZodType<Prisma.ApplicationScoreSelect> = z.object({
    id: z.boolean().optional(),
    applicationId: z.boolean().optional(),
    application: z.boolean().optional(),
    totalScore: z.boolean().optional(),
    breakdown: z.boolean().optional(),
    evaluatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ApplicationScoreSelect>;

export const ApplicationScoreFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    applicationId: z.boolean().optional(),
    application: z.boolean().optional(),
    totalScore: z.boolean().optional(),
    breakdown: z.boolean().optional(),
    evaluatedAt: z.boolean().optional()
  }).strict();

export const ApplicationScoreFindManySchema: z.ZodType<Prisma.ApplicationScoreFindManyArgs> = z.object({ select: ApplicationScoreFindManySelectSchema.optional(), include: z.lazy(() => ApplicationScoreIncludeObjectSchema.optional()), orderBy: z.union([ApplicationScoreOrderByWithRelationInputObjectSchema, ApplicationScoreOrderByWithRelationInputObjectSchema.array()]).optional(), where: ApplicationScoreWhereInputObjectSchema.optional(), cursor: ApplicationScoreWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ApplicationScoreScalarFieldEnumSchema, ApplicationScoreScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ApplicationScoreFindManyArgs>;

export const ApplicationScoreFindManyZodSchema = z.object({ select: ApplicationScoreFindManySelectSchema.optional(), include: z.lazy(() => ApplicationScoreIncludeObjectSchema.optional()), orderBy: z.union([ApplicationScoreOrderByWithRelationInputObjectSchema, ApplicationScoreOrderByWithRelationInputObjectSchema.array()]).optional(), where: ApplicationScoreWhereInputObjectSchema.optional(), cursor: ApplicationScoreWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ApplicationScoreScalarFieldEnumSchema, ApplicationScoreScalarFieldEnumSchema.array()]).optional() }).strict();