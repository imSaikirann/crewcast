import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DomainsCreateWithoutDefaultFormSchemasInputObjectSchema as DomainsCreateWithoutDefaultFormSchemasInputObjectSchema } from './DomainsCreateWithoutDefaultFormSchemasInput.schema';
import { DomainsUncheckedCreateWithoutDefaultFormSchemasInputObjectSchema as DomainsUncheckedCreateWithoutDefaultFormSchemasInputObjectSchema } from './DomainsUncheckedCreateWithoutDefaultFormSchemasInput.schema';
import { DomainsCreateOrConnectWithoutDefaultFormSchemasInputObjectSchema as DomainsCreateOrConnectWithoutDefaultFormSchemasInputObjectSchema } from './DomainsCreateOrConnectWithoutDefaultFormSchemasInput.schema';
import { DomainsUpsertWithoutDefaultFormSchemasInputObjectSchema as DomainsUpsertWithoutDefaultFormSchemasInputObjectSchema } from './DomainsUpsertWithoutDefaultFormSchemasInput.schema';
import { DomainsWhereUniqueInputObjectSchema as DomainsWhereUniqueInputObjectSchema } from './DomainsWhereUniqueInput.schema';
import { DomainsUpdateToOneWithWhereWithoutDefaultFormSchemasInputObjectSchema as DomainsUpdateToOneWithWhereWithoutDefaultFormSchemasInputObjectSchema } from './DomainsUpdateToOneWithWhereWithoutDefaultFormSchemasInput.schema';
import { DomainsUpdateWithoutDefaultFormSchemasInputObjectSchema as DomainsUpdateWithoutDefaultFormSchemasInputObjectSchema } from './DomainsUpdateWithoutDefaultFormSchemasInput.schema';
import { DomainsUncheckedUpdateWithoutDefaultFormSchemasInputObjectSchema as DomainsUncheckedUpdateWithoutDefaultFormSchemasInputObjectSchema } from './DomainsUncheckedUpdateWithoutDefaultFormSchemasInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => DomainsCreateWithoutDefaultFormSchemasInputObjectSchema), z.lazy(() => DomainsUncheckedCreateWithoutDefaultFormSchemasInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => DomainsCreateOrConnectWithoutDefaultFormSchemasInputObjectSchema).optional(),
  upsert: z.lazy(() => DomainsUpsertWithoutDefaultFormSchemasInputObjectSchema).optional(),
  connect: z.lazy(() => DomainsWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => DomainsUpdateToOneWithWhereWithoutDefaultFormSchemasInputObjectSchema), z.lazy(() => DomainsUpdateWithoutDefaultFormSchemasInputObjectSchema), z.lazy(() => DomainsUncheckedUpdateWithoutDefaultFormSchemasInputObjectSchema)]).optional()
}).strict();
export const DomainsUpdateOneRequiredWithoutDefaultFormSchemasNestedInputObjectSchema: z.ZodType<Prisma.DomainsUpdateOneRequiredWithoutDefaultFormSchemasNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.DomainsUpdateOneRequiredWithoutDefaultFormSchemasNestedInput>;
export const DomainsUpdateOneRequiredWithoutDefaultFormSchemasNestedInputObjectZodSchema = makeSchema();
