import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FormViewOrderByWithRelationInputObjectSchema as FormViewOrderByWithRelationInputObjectSchema } from './objects/FormViewOrderByWithRelationInput.schema';
import { FormViewWhereInputObjectSchema as FormViewWhereInputObjectSchema } from './objects/FormViewWhereInput.schema';
import { FormViewWhereUniqueInputObjectSchema as FormViewWhereUniqueInputObjectSchema } from './objects/FormViewWhereUniqueInput.schema';
import { FormViewCountAggregateInputObjectSchema as FormViewCountAggregateInputObjectSchema } from './objects/FormViewCountAggregateInput.schema';
import { FormViewMinAggregateInputObjectSchema as FormViewMinAggregateInputObjectSchema } from './objects/FormViewMinAggregateInput.schema';
import { FormViewMaxAggregateInputObjectSchema as FormViewMaxAggregateInputObjectSchema } from './objects/FormViewMaxAggregateInput.schema';

export const FormViewAggregateSchema: z.ZodType<Prisma.FormViewAggregateArgs> = z.object({ orderBy: z.union([FormViewOrderByWithRelationInputObjectSchema, FormViewOrderByWithRelationInputObjectSchema.array()]).optional(), where: FormViewWhereInputObjectSchema.optional(), cursor: FormViewWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), FormViewCountAggregateInputObjectSchema ]).optional(), _min: FormViewMinAggregateInputObjectSchema.optional(), _max: FormViewMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.FormViewAggregateArgs>;

export const FormViewAggregateZodSchema = z.object({ orderBy: z.union([FormViewOrderByWithRelationInputObjectSchema, FormViewOrderByWithRelationInputObjectSchema.array()]).optional(), where: FormViewWhereInputObjectSchema.optional(), cursor: FormViewWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), FormViewCountAggregateInputObjectSchema ]).optional(), _min: FormViewMinAggregateInputObjectSchema.optional(), _max: FormViewMaxAggregateInputObjectSchema.optional() }).strict();