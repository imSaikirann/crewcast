import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DefaultFormSchemaSelectObjectSchema as DefaultFormSchemaSelectObjectSchema } from './objects/DefaultFormSchemaSelect.schema';
import { DefaultFormSchemaIncludeObjectSchema as DefaultFormSchemaIncludeObjectSchema } from './objects/DefaultFormSchemaInclude.schema';
import { DefaultFormSchemaCreateInputObjectSchema as DefaultFormSchemaCreateInputObjectSchema } from './objects/DefaultFormSchemaCreateInput.schema';
import { DefaultFormSchemaUncheckedCreateInputObjectSchema as DefaultFormSchemaUncheckedCreateInputObjectSchema } from './objects/DefaultFormSchemaUncheckedCreateInput.schema';

export const DefaultFormSchemaCreateOneSchema: z.ZodType<Prisma.DefaultFormSchemaCreateArgs> = z.object({ select: DefaultFormSchemaSelectObjectSchema.optional(), include: DefaultFormSchemaIncludeObjectSchema.optional(), data: z.union([DefaultFormSchemaCreateInputObjectSchema, DefaultFormSchemaUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.DefaultFormSchemaCreateArgs>;

export const DefaultFormSchemaCreateOneZodSchema = z.object({ select: DefaultFormSchemaSelectObjectSchema.optional(), include: DefaultFormSchemaIncludeObjectSchema.optional(), data: z.union([DefaultFormSchemaCreateInputObjectSchema, DefaultFormSchemaUncheckedCreateInputObjectSchema]) }).strict();