import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DefaultFormSchemaSelectObjectSchema as DefaultFormSchemaSelectObjectSchema } from './objects/DefaultFormSchemaSelect.schema';
import { DefaultFormSchemaIncludeObjectSchema as DefaultFormSchemaIncludeObjectSchema } from './objects/DefaultFormSchemaInclude.schema';
import { DefaultFormSchemaWhereUniqueInputObjectSchema as DefaultFormSchemaWhereUniqueInputObjectSchema } from './objects/DefaultFormSchemaWhereUniqueInput.schema';
import { DefaultFormSchemaCreateInputObjectSchema as DefaultFormSchemaCreateInputObjectSchema } from './objects/DefaultFormSchemaCreateInput.schema';
import { DefaultFormSchemaUncheckedCreateInputObjectSchema as DefaultFormSchemaUncheckedCreateInputObjectSchema } from './objects/DefaultFormSchemaUncheckedCreateInput.schema';
import { DefaultFormSchemaUpdateInputObjectSchema as DefaultFormSchemaUpdateInputObjectSchema } from './objects/DefaultFormSchemaUpdateInput.schema';
import { DefaultFormSchemaUncheckedUpdateInputObjectSchema as DefaultFormSchemaUncheckedUpdateInputObjectSchema } from './objects/DefaultFormSchemaUncheckedUpdateInput.schema';

export const DefaultFormSchemaUpsertOneSchema: z.ZodType<Prisma.DefaultFormSchemaUpsertArgs> = z.object({ select: DefaultFormSchemaSelectObjectSchema.optional(), include: DefaultFormSchemaIncludeObjectSchema.optional(), where: DefaultFormSchemaWhereUniqueInputObjectSchema, create: z.union([ DefaultFormSchemaCreateInputObjectSchema, DefaultFormSchemaUncheckedCreateInputObjectSchema ]), update: z.union([ DefaultFormSchemaUpdateInputObjectSchema, DefaultFormSchemaUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.DefaultFormSchemaUpsertArgs>;

export const DefaultFormSchemaUpsertOneZodSchema = z.object({ select: DefaultFormSchemaSelectObjectSchema.optional(), include: DefaultFormSchemaIncludeObjectSchema.optional(), where: DefaultFormSchemaWhereUniqueInputObjectSchema, create: z.union([ DefaultFormSchemaCreateInputObjectSchema, DefaultFormSchemaUncheckedCreateInputObjectSchema ]), update: z.union([ DefaultFormSchemaUpdateInputObjectSchema, DefaultFormSchemaUncheckedUpdateInputObjectSchema ]) }).strict();