import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FormViewWhereInputObjectSchema as FormViewWhereInputObjectSchema } from './objects/FormViewWhereInput.schema';
import { FormViewOrderByWithAggregationInputObjectSchema as FormViewOrderByWithAggregationInputObjectSchema } from './objects/FormViewOrderByWithAggregationInput.schema';
import { FormViewScalarWhereWithAggregatesInputObjectSchema as FormViewScalarWhereWithAggregatesInputObjectSchema } from './objects/FormViewScalarWhereWithAggregatesInput.schema';
import { FormViewScalarFieldEnumSchema } from './enums/FormViewScalarFieldEnum.schema';
import { FormViewCountAggregateInputObjectSchema as FormViewCountAggregateInputObjectSchema } from './objects/FormViewCountAggregateInput.schema';
import { FormViewMinAggregateInputObjectSchema as FormViewMinAggregateInputObjectSchema } from './objects/FormViewMinAggregateInput.schema';
import { FormViewMaxAggregateInputObjectSchema as FormViewMaxAggregateInputObjectSchema } from './objects/FormViewMaxAggregateInput.schema';

export const FormViewGroupBySchema: z.ZodType<Prisma.FormViewGroupByArgs> = z.object({ where: FormViewWhereInputObjectSchema.optional(), orderBy: z.union([FormViewOrderByWithAggregationInputObjectSchema, FormViewOrderByWithAggregationInputObjectSchema.array()]).optional(), having: FormViewScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(FormViewScalarFieldEnumSchema), _count: z.union([ z.literal(true), FormViewCountAggregateInputObjectSchema ]).optional(), _min: FormViewMinAggregateInputObjectSchema.optional(), _max: FormViewMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.FormViewGroupByArgs>;

export const FormViewGroupByZodSchema = z.object({ where: FormViewWhereInputObjectSchema.optional(), orderBy: z.union([FormViewOrderByWithAggregationInputObjectSchema, FormViewOrderByWithAggregationInputObjectSchema.array()]).optional(), having: FormViewScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(FormViewScalarFieldEnumSchema), _count: z.union([ z.literal(true), FormViewCountAggregateInputObjectSchema ]).optional(), _min: FormViewMinAggregateInputObjectSchema.optional(), _max: FormViewMaxAggregateInputObjectSchema.optional() }).strict();