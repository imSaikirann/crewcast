import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DomainsWhereUniqueInputObjectSchema as DomainsWhereUniqueInputObjectSchema } from './DomainsWhereUniqueInput.schema';
import { DomainsCreateWithoutDefaultFormSchemasInputObjectSchema as DomainsCreateWithoutDefaultFormSchemasInputObjectSchema } from './DomainsCreateWithoutDefaultFormSchemasInput.schema';
import { DomainsUncheckedCreateWithoutDefaultFormSchemasInputObjectSchema as DomainsUncheckedCreateWithoutDefaultFormSchemasInputObjectSchema } from './DomainsUncheckedCreateWithoutDefaultFormSchemasInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => DomainsWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => DomainsCreateWithoutDefaultFormSchemasInputObjectSchema), z.lazy(() => DomainsUncheckedCreateWithoutDefaultFormSchemasInputObjectSchema)])
}).strict();
export const DomainsCreateOrConnectWithoutDefaultFormSchemasInputObjectSchema: z.ZodType<Prisma.DomainsCreateOrConnectWithoutDefaultFormSchemasInput> = makeSchema() as unknown as z.ZodType<Prisma.DomainsCreateOrConnectWithoutDefaultFormSchemasInput>;
export const DomainsCreateOrConnectWithoutDefaultFormSchemasInputObjectZodSchema = makeSchema();
