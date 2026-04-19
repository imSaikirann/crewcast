import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DefaultFormSchemaWhereInputObjectSchema as DefaultFormSchemaWhereInputObjectSchema } from './objects/DefaultFormSchemaWhereInput.schema';

export const DefaultFormSchemaDeleteManySchema: z.ZodType<Prisma.DefaultFormSchemaDeleteManyArgs> = z.object({ where: DefaultFormSchemaWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.DefaultFormSchemaDeleteManyArgs>;

export const DefaultFormSchemaDeleteManyZodSchema = z.object({ where: DefaultFormSchemaWhereInputObjectSchema.optional() }).strict();