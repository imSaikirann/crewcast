import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FormFieldOrderByWithRelationInputObjectSchema as FormFieldOrderByWithRelationInputObjectSchema } from './objects/FormFieldOrderByWithRelationInput.schema';
import { FormFieldWhereInputObjectSchema as FormFieldWhereInputObjectSchema } from './objects/FormFieldWhereInput.schema';
import { FormFieldWhereUniqueInputObjectSchema as FormFieldWhereUniqueInputObjectSchema } from './objects/FormFieldWhereUniqueInput.schema';
import { FormFieldCountAggregateInputObjectSchema as FormFieldCountAggregateInputObjectSchema } from './objects/FormFieldCountAggregateInput.schema';
import { FormFieldMinAggregateInputObjectSchema as FormFieldMinAggregateInputObjectSchema } from './objects/FormFieldMinAggregateInput.schema';
import { FormFieldMaxAggregateInputObjectSchema as FormFieldMaxAggregateInputObjectSchema } from './objects/FormFieldMaxAggregateInput.schema';

export const FormFieldAggregateSchema: z.ZodType<Prisma.FormFieldAggregateArgs> = z.object({ orderBy: z.union([FormFieldOrderByWithRelationInputObjectSchema, FormFieldOrderByWithRelationInputObjectSchema.array()]).optional(), where: FormFieldWhereInputObjectSchema.optional(), cursor: FormFieldWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), FormFieldCountAggregateInputObjectSchema ]).optional(), _min: FormFieldMinAggregateInputObjectSchema.optional(), _max: FormFieldMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.FormFieldAggregateArgs>;

export const FormFieldAggregateZodSchema = z.object({ orderBy: z.union([FormFieldOrderByWithRelationInputObjectSchema, FormFieldOrderByWithRelationInputObjectSchema.array()]).optional(), where: FormFieldWhereInputObjectSchema.optional(), cursor: FormFieldWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), FormFieldCountAggregateInputObjectSchema ]).optional(), _min: FormFieldMinAggregateInputObjectSchema.optional(), _max: FormFieldMaxAggregateInputObjectSchema.optional() }).strict();