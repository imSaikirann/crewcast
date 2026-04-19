import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FormViewOrderByWithRelationInputObjectSchema as FormViewOrderByWithRelationInputObjectSchema } from './objects/FormViewOrderByWithRelationInput.schema';
import { FormViewWhereInputObjectSchema as FormViewWhereInputObjectSchema } from './objects/FormViewWhereInput.schema';
import { FormViewWhereUniqueInputObjectSchema as FormViewWhereUniqueInputObjectSchema } from './objects/FormViewWhereUniqueInput.schema';
import { FormViewCountAggregateInputObjectSchema as FormViewCountAggregateInputObjectSchema } from './objects/FormViewCountAggregateInput.schema';

export const FormViewCountSchema: z.ZodType<Prisma.FormViewCountArgs> = z.object({ orderBy: z.union([FormViewOrderByWithRelationInputObjectSchema, FormViewOrderByWithRelationInputObjectSchema.array()]).optional(), where: FormViewWhereInputObjectSchema.optional(), cursor: FormViewWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), FormViewCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.FormViewCountArgs>;

export const FormViewCountZodSchema = z.object({ orderBy: z.union([FormViewOrderByWithRelationInputObjectSchema, FormViewOrderByWithRelationInputObjectSchema.array()]).optional(), where: FormViewWhereInputObjectSchema.optional(), cursor: FormViewWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), FormViewCountAggregateInputObjectSchema ]).optional() }).strict();