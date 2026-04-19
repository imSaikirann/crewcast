import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DefaultFormSchemaIncludeObjectSchema as DefaultFormSchemaIncludeObjectSchema } from './objects/DefaultFormSchemaInclude.schema';
import { DefaultFormSchemaOrderByWithRelationInputObjectSchema as DefaultFormSchemaOrderByWithRelationInputObjectSchema } from './objects/DefaultFormSchemaOrderByWithRelationInput.schema';
import { DefaultFormSchemaWhereInputObjectSchema as DefaultFormSchemaWhereInputObjectSchema } from './objects/DefaultFormSchemaWhereInput.schema';
import { DefaultFormSchemaWhereUniqueInputObjectSchema as DefaultFormSchemaWhereUniqueInputObjectSchema } from './objects/DefaultFormSchemaWhereUniqueInput.schema';
import { DefaultFormSchemaScalarFieldEnumSchema } from './enums/DefaultFormSchemaScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const DefaultFormSchemaFindManySelectSchema: z.ZodType<Prisma.DefaultFormSchemaSelect> = z.object({
    id: z.boolean().optional(),
    domainId: z.boolean().optional(),
    domain: z.boolean().optional(),
    version: z.boolean().optional(),
    fields: z.boolean().optional(),
    isActive: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.DefaultFormSchemaSelect>;

export const DefaultFormSchemaFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    domainId: z.boolean().optional(),
    domain: z.boolean().optional(),
    version: z.boolean().optional(),
    fields: z.boolean().optional(),
    isActive: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const DefaultFormSchemaFindManySchema: z.ZodType<Prisma.DefaultFormSchemaFindManyArgs> = z.object({ select: DefaultFormSchemaFindManySelectSchema.optional(), include: z.lazy(() => DefaultFormSchemaIncludeObjectSchema.optional()), orderBy: z.union([DefaultFormSchemaOrderByWithRelationInputObjectSchema, DefaultFormSchemaOrderByWithRelationInputObjectSchema.array()]).optional(), where: DefaultFormSchemaWhereInputObjectSchema.optional(), cursor: DefaultFormSchemaWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([DefaultFormSchemaScalarFieldEnumSchema, DefaultFormSchemaScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.DefaultFormSchemaFindManyArgs>;

export const DefaultFormSchemaFindManyZodSchema = z.object({ select: DefaultFormSchemaFindManySelectSchema.optional(), include: z.lazy(() => DefaultFormSchemaIncludeObjectSchema.optional()), orderBy: z.union([DefaultFormSchemaOrderByWithRelationInputObjectSchema, DefaultFormSchemaOrderByWithRelationInputObjectSchema.array()]).optional(), where: DefaultFormSchemaWhereInputObjectSchema.optional(), cursor: DefaultFormSchemaWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([DefaultFormSchemaScalarFieldEnumSchema, DefaultFormSchemaScalarFieldEnumSchema.array()]).optional() }).strict();