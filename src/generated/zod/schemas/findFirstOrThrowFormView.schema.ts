import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FormViewIncludeObjectSchema as FormViewIncludeObjectSchema } from './objects/FormViewInclude.schema';
import { FormViewOrderByWithRelationInputObjectSchema as FormViewOrderByWithRelationInputObjectSchema } from './objects/FormViewOrderByWithRelationInput.schema';
import { FormViewWhereInputObjectSchema as FormViewWhereInputObjectSchema } from './objects/FormViewWhereInput.schema';
import { FormViewWhereUniqueInputObjectSchema as FormViewWhereUniqueInputObjectSchema } from './objects/FormViewWhereUniqueInput.schema';
import { FormViewScalarFieldEnumSchema } from './enums/FormViewScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const FormViewFindFirstOrThrowSelectSchema: z.ZodType<Prisma.FormViewSelect> = z.object({
    id: z.boolean().optional(),
    formId: z.boolean().optional(),
    form: z.boolean().optional(),
    ip: z.boolean().optional(),
    userAgent: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.FormViewSelect>;

export const FormViewFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    formId: z.boolean().optional(),
    form: z.boolean().optional(),
    ip: z.boolean().optional(),
    userAgent: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict();

export const FormViewFindFirstOrThrowSchema: z.ZodType<Prisma.FormViewFindFirstOrThrowArgs> = z.object({ select: FormViewFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => FormViewIncludeObjectSchema.optional()), orderBy: z.union([FormViewOrderByWithRelationInputObjectSchema, FormViewOrderByWithRelationInputObjectSchema.array()]).optional(), where: FormViewWhereInputObjectSchema.optional(), cursor: FormViewWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([FormViewScalarFieldEnumSchema, FormViewScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.FormViewFindFirstOrThrowArgs>;

export const FormViewFindFirstOrThrowZodSchema = z.object({ select: FormViewFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => FormViewIncludeObjectSchema.optional()), orderBy: z.union([FormViewOrderByWithRelationInputObjectSchema, FormViewOrderByWithRelationInputObjectSchema.array()]).optional(), where: FormViewWhereInputObjectSchema.optional(), cursor: FormViewWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([FormViewScalarFieldEnumSchema, FormViewScalarFieldEnumSchema.array()]).optional() }).strict();