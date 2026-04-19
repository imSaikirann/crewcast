import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DomainsWhereInputObjectSchema as DomainsWhereInputObjectSchema } from './DomainsWhereInput.schema';
import { DomainsUpdateWithoutDefaultFormSchemasInputObjectSchema as DomainsUpdateWithoutDefaultFormSchemasInputObjectSchema } from './DomainsUpdateWithoutDefaultFormSchemasInput.schema';
import { DomainsUncheckedUpdateWithoutDefaultFormSchemasInputObjectSchema as DomainsUncheckedUpdateWithoutDefaultFormSchemasInputObjectSchema } from './DomainsUncheckedUpdateWithoutDefaultFormSchemasInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => DomainsWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => DomainsUpdateWithoutDefaultFormSchemasInputObjectSchema), z.lazy(() => DomainsUncheckedUpdateWithoutDefaultFormSchemasInputObjectSchema)])
}).strict();
export const DomainsUpdateToOneWithWhereWithoutDefaultFormSchemasInputObjectSchema: z.ZodType<Prisma.DomainsUpdateToOneWithWhereWithoutDefaultFormSchemasInput> = makeSchema() as unknown as z.ZodType<Prisma.DomainsUpdateToOneWithWhereWithoutDefaultFormSchemasInput>;
export const DomainsUpdateToOneWithWhereWithoutDefaultFormSchemasInputObjectZodSchema = makeSchema();
