import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FormFieldIncludeObjectSchema as FormFieldIncludeObjectSchema } from './objects/FormFieldInclude.schema';
import { FormFieldOrderByWithRelationInputObjectSchema as FormFieldOrderByWithRelationInputObjectSchema } from './objects/FormFieldOrderByWithRelationInput.schema';
import { FormFieldWhereInputObjectSchema as FormFieldWhereInputObjectSchema } from './objects/FormFieldWhereInput.schema';
import { FormFieldWhereUniqueInputObjectSchema as FormFieldWhereUniqueInputObjectSchema } from './objects/FormFieldWhereUniqueInput.schema';
import { FormFieldScalarFieldEnumSchema } from './enums/FormFieldScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const FormFieldFindFirstOrThrowSelectSchema: z.ZodType<Prisma.FormFieldSelect> = z.object({
    id: z.boolean().optional(),
    roleId: z.boolean().optional(),
    role: z.boolean().optional(),
    label: z.boolean().optional(),
    name: z.boolean().optional(),
    type: z.boolean().optional(),
    required: z.boolean().optional(),
    options: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.FormFieldSelect>;

export const FormFieldFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    roleId: z.boolean().optional(),
    role: z.boolean().optional(),
    label: z.boolean().optional(),
    name: z.boolean().optional(),
    type: z.boolean().optional(),
    required: z.boolean().optional(),
    options: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const FormFieldFindFirstOrThrowSchema: z.ZodType<Prisma.FormFieldFindFirstOrThrowArgs> = z.object({ select: FormFieldFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => FormFieldIncludeObjectSchema.optional()), orderBy: z.union([FormFieldOrderByWithRelationInputObjectSchema, FormFieldOrderByWithRelationInputObjectSchema.array()]).optional(), where: FormFieldWhereInputObjectSchema.optional(), cursor: FormFieldWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([FormFieldScalarFieldEnumSchema, FormFieldScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.FormFieldFindFirstOrThrowArgs>;

export const FormFieldFindFirstOrThrowZodSchema = z.object({ select: FormFieldFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => FormFieldIncludeObjectSchema.optional()), orderBy: z.union([FormFieldOrderByWithRelationInputObjectSchema, FormFieldOrderByWithRelationInputObjectSchema.array()]).optional(), where: FormFieldWhereInputObjectSchema.optional(), cursor: FormFieldWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([FormFieldScalarFieldEnumSchema, FormFieldScalarFieldEnumSchema.array()]).optional() }).strict();