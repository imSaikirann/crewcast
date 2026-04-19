import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DefaultFormSchemaSelectObjectSchema as DefaultFormSchemaSelectObjectSchema } from './objects/DefaultFormSchemaSelect.schema';
import { DefaultFormSchemaIncludeObjectSchema as DefaultFormSchemaIncludeObjectSchema } from './objects/DefaultFormSchemaInclude.schema';
import { DefaultFormSchemaWhereUniqueInputObjectSchema as DefaultFormSchemaWhereUniqueInputObjectSchema } from './objects/DefaultFormSchemaWhereUniqueInput.schema';

export const DefaultFormSchemaFindUniqueOrThrowSchema: z.ZodType<Prisma.DefaultFormSchemaFindUniqueOrThrowArgs> = z.object({ select: DefaultFormSchemaSelectObjectSchema.optional(), include: DefaultFormSchemaIncludeObjectSchema.optional(), where: DefaultFormSchemaWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.DefaultFormSchemaFindUniqueOrThrowArgs>;

export const DefaultFormSchemaFindUniqueOrThrowZodSchema = z.object({ select: DefaultFormSchemaSelectObjectSchema.optional(), include: DefaultFormSchemaIncludeObjectSchema.optional(), where: DefaultFormSchemaWhereUniqueInputObjectSchema }).strict();