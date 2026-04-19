import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DomainsCreateWithoutDefaultFormSchemasInputObjectSchema as DomainsCreateWithoutDefaultFormSchemasInputObjectSchema } from './DomainsCreateWithoutDefaultFormSchemasInput.schema';
import { DomainsUncheckedCreateWithoutDefaultFormSchemasInputObjectSchema as DomainsUncheckedCreateWithoutDefaultFormSchemasInputObjectSchema } from './DomainsUncheckedCreateWithoutDefaultFormSchemasInput.schema';
import { DomainsCreateOrConnectWithoutDefaultFormSchemasInputObjectSchema as DomainsCreateOrConnectWithoutDefaultFormSchemasInputObjectSchema } from './DomainsCreateOrConnectWithoutDefaultFormSchemasInput.schema';
import { DomainsWhereUniqueInputObjectSchema as DomainsWhereUniqueInputObjectSchema } from './DomainsWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => DomainsCreateWithoutDefaultFormSchemasInputObjectSchema), z.lazy(() => DomainsUncheckedCreateWithoutDefaultFormSchemasInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => DomainsCreateOrConnectWithoutDefaultFormSchemasInputObjectSchema).optional(),
  connect: z.lazy(() => DomainsWhereUniqueInputObjectSchema).optional()
}).strict();
export const DomainsCreateNestedOneWithoutDefaultFormSchemasInputObjectSchema: z.ZodType<Prisma.DomainsCreateNestedOneWithoutDefaultFormSchemasInput> = makeSchema() as unknown as z.ZodType<Prisma.DomainsCreateNestedOneWithoutDefaultFormSchemasInput>;
export const DomainsCreateNestedOneWithoutDefaultFormSchemasInputObjectZodSchema = makeSchema();
