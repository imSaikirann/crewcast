import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DefaultFormSchemaCreateManyInputObjectSchema as DefaultFormSchemaCreateManyInputObjectSchema } from './objects/DefaultFormSchemaCreateManyInput.schema';

export const DefaultFormSchemaCreateManySchema: z.ZodType<Prisma.DefaultFormSchemaCreateManyArgs> = z.object({ data: z.union([ DefaultFormSchemaCreateManyInputObjectSchema, z.array(DefaultFormSchemaCreateManyInputObjectSchema) ]),  }).strict() as unknown as z.ZodType<Prisma.DefaultFormSchemaCreateManyArgs>;

export const DefaultFormSchemaCreateManyZodSchema = z.object({ data: z.union([ DefaultFormSchemaCreateManyInputObjectSchema, z.array(DefaultFormSchemaCreateManyInputObjectSchema) ]),  }).strict();