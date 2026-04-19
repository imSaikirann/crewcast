import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DefaultFormSchemaUpdateManyMutationInputObjectSchema as DefaultFormSchemaUpdateManyMutationInputObjectSchema } from './objects/DefaultFormSchemaUpdateManyMutationInput.schema';
import { DefaultFormSchemaWhereInputObjectSchema as DefaultFormSchemaWhereInputObjectSchema } from './objects/DefaultFormSchemaWhereInput.schema';

export const DefaultFormSchemaUpdateManySchema: z.ZodType<Prisma.DefaultFormSchemaUpdateManyArgs> = z.object({ data: DefaultFormSchemaUpdateManyMutationInputObjectSchema, where: DefaultFormSchemaWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.DefaultFormSchemaUpdateManyArgs>;

export const DefaultFormSchemaUpdateManyZodSchema = z.object({ data: DefaultFormSchemaUpdateManyMutationInputObjectSchema, where: DefaultFormSchemaWhereInputObjectSchema.optional() }).strict();