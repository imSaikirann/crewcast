import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FormFieldOrderByWithRelationInputObjectSchema as FormFieldOrderByWithRelationInputObjectSchema } from './objects/FormFieldOrderByWithRelationInput.schema';
import { FormFieldWhereInputObjectSchema as FormFieldWhereInputObjectSchema } from './objects/FormFieldWhereInput.schema';
import { FormFieldWhereUniqueInputObjectSchema as FormFieldWhereUniqueInputObjectSchema } from './objects/FormFieldWhereUniqueInput.schema';
import { FormFieldCountAggregateInputObjectSchema as FormFieldCountAggregateInputObjectSchema } from './objects/FormFieldCountAggregateInput.schema';

export const FormFieldCountSchema: z.ZodType<Prisma.FormFieldCountArgs> = z.object({ orderBy: z.union([FormFieldOrderByWithRelationInputObjectSchema, FormFieldOrderByWithRelationInputObjectSchema.array()]).optional(), where: FormFieldWhereInputObjectSchema.optional(), cursor: FormFieldWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), FormFieldCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.FormFieldCountArgs>;

export const FormFieldCountZodSchema = z.object({ orderBy: z.union([FormFieldOrderByWithRelationInputObjectSchema, FormFieldOrderByWithRelationInputObjectSchema.array()]).optional(), where: FormFieldWhereInputObjectSchema.optional(), cursor: FormFieldWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), FormFieldCountAggregateInputObjectSchema ]).optional() }).strict();