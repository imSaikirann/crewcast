import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DefaultFormSchemaWhereUniqueInputObjectSchema as DefaultFormSchemaWhereUniqueInputObjectSchema } from './DefaultFormSchemaWhereUniqueInput.schema';
import { DefaultFormSchemaUpdateWithoutDomainInputObjectSchema as DefaultFormSchemaUpdateWithoutDomainInputObjectSchema } from './DefaultFormSchemaUpdateWithoutDomainInput.schema';
import { DefaultFormSchemaUncheckedUpdateWithoutDomainInputObjectSchema as DefaultFormSchemaUncheckedUpdateWithoutDomainInputObjectSchema } from './DefaultFormSchemaUncheckedUpdateWithoutDomainInput.schema';
import { DefaultFormSchemaCreateWithoutDomainInputObjectSchema as DefaultFormSchemaCreateWithoutDomainInputObjectSchema } from './DefaultFormSchemaCreateWithoutDomainInput.schema';
import { DefaultFormSchemaUncheckedCreateWithoutDomainInputObjectSchema as DefaultFormSchemaUncheckedCreateWithoutDomainInputObjectSchema } from './DefaultFormSchemaUncheckedCreateWithoutDomainInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => DefaultFormSchemaWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => DefaultFormSchemaUpdateWithoutDomainInputObjectSchema), z.lazy(() => DefaultFormSchemaUncheckedUpdateWithoutDomainInputObjectSchema)]),
  create: z.union([z.lazy(() => DefaultFormSchemaCreateWithoutDomainInputObjectSchema), z.lazy(() => DefaultFormSchemaUncheckedCreateWithoutDomainInputObjectSchema)])
}).strict();
export const DefaultFormSchemaUpsertWithWhereUniqueWithoutDomainInputObjectSchema: z.ZodType<Prisma.DefaultFormSchemaUpsertWithWhereUniqueWithoutDomainInput> = makeSchema() as unknown as z.ZodType<Prisma.DefaultFormSchemaUpsertWithWhereUniqueWithoutDomainInput>;
export const DefaultFormSchemaUpsertWithWhereUniqueWithoutDomainInputObjectZodSchema = makeSchema();
