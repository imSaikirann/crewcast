import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DomainsUpdateWithoutDefaultFormSchemasInputObjectSchema as DomainsUpdateWithoutDefaultFormSchemasInputObjectSchema } from './DomainsUpdateWithoutDefaultFormSchemasInput.schema';
import { DomainsUncheckedUpdateWithoutDefaultFormSchemasInputObjectSchema as DomainsUncheckedUpdateWithoutDefaultFormSchemasInputObjectSchema } from './DomainsUncheckedUpdateWithoutDefaultFormSchemasInput.schema';
import { DomainsCreateWithoutDefaultFormSchemasInputObjectSchema as DomainsCreateWithoutDefaultFormSchemasInputObjectSchema } from './DomainsCreateWithoutDefaultFormSchemasInput.schema';
import { DomainsUncheckedCreateWithoutDefaultFormSchemasInputObjectSchema as DomainsUncheckedCreateWithoutDefaultFormSchemasInputObjectSchema } from './DomainsUncheckedCreateWithoutDefaultFormSchemasInput.schema';
import { DomainsWhereInputObjectSchema as DomainsWhereInputObjectSchema } from './DomainsWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => DomainsUpdateWithoutDefaultFormSchemasInputObjectSchema), z.lazy(() => DomainsUncheckedUpdateWithoutDefaultFormSchemasInputObjectSchema)]),
  create: z.union([z.lazy(() => DomainsCreateWithoutDefaultFormSchemasInputObjectSchema), z.lazy(() => DomainsUncheckedCreateWithoutDefaultFormSchemasInputObjectSchema)]),
  where: z.lazy(() => DomainsWhereInputObjectSchema).optional()
}).strict();
export const DomainsUpsertWithoutDefaultFormSchemasInputObjectSchema: z.ZodType<Prisma.DomainsUpsertWithoutDefaultFormSchemasInput> = makeSchema() as unknown as z.ZodType<Prisma.DomainsUpsertWithoutDefaultFormSchemasInput>;
export const DomainsUpsertWithoutDefaultFormSchemasInputObjectZodSchema = makeSchema();
