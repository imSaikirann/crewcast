import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ApplicationOrderByWithRelationInputObjectSchema as ApplicationOrderByWithRelationInputObjectSchema } from './objects/ApplicationOrderByWithRelationInput.schema';
import { ApplicationWhereInputObjectSchema as ApplicationWhereInputObjectSchema } from './objects/ApplicationWhereInput.schema';
import { ApplicationWhereUniqueInputObjectSchema as ApplicationWhereUniqueInputObjectSchema } from './objects/ApplicationWhereUniqueInput.schema';
import { ApplicationCountAggregateInputObjectSchema as ApplicationCountAggregateInputObjectSchema } from './objects/ApplicationCountAggregateInput.schema';

export const ApplicationCountSchema: z.ZodType<Prisma.ApplicationCountArgs> = z.object({ orderBy: z.union([ApplicationOrderByWithRelationInputObjectSchema, ApplicationOrderByWithRelationInputObjectSchema.array()]).optional(), where: ApplicationWhereInputObjectSchema.optional(), cursor: ApplicationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ApplicationCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.ApplicationCountArgs>;

export const ApplicationCountZodSchema = z.object({ orderBy: z.union([ApplicationOrderByWithRelationInputObjectSchema, ApplicationOrderByWithRelationInputObjectSchema.array()]).optional(), where: ApplicationWhereInputObjectSchema.optional(), cursor: ApplicationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ApplicationCountAggregateInputObjectSchema ]).optional() }).strict();