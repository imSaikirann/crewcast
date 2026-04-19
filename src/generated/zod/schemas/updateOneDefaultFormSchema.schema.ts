import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DefaultFormSchemaSelectObjectSchema as DefaultFormSchemaSelectObjectSchema } from './objects/DefaultFormSchemaSelect.schema';
import { DefaultFormSchemaIncludeObjectSchema as DefaultFormSchemaIncludeObjectSchema } from './objects/DefaultFormSchemaInclude.schema';
import { DefaultFormSchemaUpdateInputObjectSchema as DefaultFormSchemaUpdateInputObjectSchema } from './objects/DefaultFormSchemaUpdateInput.schema';
import { DefaultFormSchemaUncheckedUpdateInputObjectSchema as DefaultFormSchemaUncheckedUpdateInputObjectSchema } from './objects/DefaultFormSchemaUncheckedUpdateInput.schema';
import { DefaultFormSchemaWhereUniqueInputObjectSchema as DefaultFormSchemaWhereUniqueInputObjectSchema } from './objects/DefaultFormSchemaWhereUniqueInput.schema';

export const DefaultFormSchemaUpdateOneSchema: z.ZodType<Prisma.DefaultFormSchemaUpdateArgs> = z.object({ select: DefaultFormSchemaSelectObjectSchema.optional(), include: DefaultFormSchemaIncludeObjectSchema.optional(), data: z.union([DefaultFormSchemaUpdateInputObjectSchema, DefaultFormSchemaUncheckedUpdateInputObjectSchema]), where: DefaultFormSchemaWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.DefaultFormSchemaUpdateArgs>;

export const DefaultFormSchemaUpdateOneZodSchema = z.object({ select: DefaultFormSchemaSelectObjectSchema.optional(), include: DefaultFormSchemaIncludeObjectSchema.optional(), data: z.union([DefaultFormSchemaUpdateInputObjectSchema, DefaultFormSchemaUncheckedUpdateInputObjectSchema]), where: DefaultFormSchemaWhereUniqueInputObjectSchema }).strict();