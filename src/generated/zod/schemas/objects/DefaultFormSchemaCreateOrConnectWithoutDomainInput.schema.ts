import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DefaultFormSchemaWhereUniqueInputObjectSchema as DefaultFormSchemaWhereUniqueInputObjectSchema } from './DefaultFormSchemaWhereUniqueInput.schema';
import { DefaultFormSchemaCreateWithoutDomainInputObjectSchema as DefaultFormSchemaCreateWithoutDomainInputObjectSchema } from './DefaultFormSchemaCreateWithoutDomainInput.schema';
import { DefaultFormSchemaUncheckedCreateWithoutDomainInputObjectSchema as DefaultFormSchemaUncheckedCreateWithoutDomainInputObjectSchema } from './DefaultFormSchemaUncheckedCreateWithoutDomainInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => DefaultFormSchemaWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => DefaultFormSchemaCreateWithoutDomainInputObjectSchema), z.lazy(() => DefaultFormSchemaUncheckedCreateWithoutDomainInputObjectSchema)])
}).strict();
export const DefaultFormSchemaCreateOrConnectWithoutDomainInputObjectSchema: z.ZodType<Prisma.DefaultFormSchemaCreateOrConnectWithoutDomainInput> = makeSchema() as unknown as z.ZodType<Prisma.DefaultFormSchemaCreateOrConnectWithoutDomainInput>;
export const DefaultFormSchemaCreateOrConnectWithoutDomainInputObjectZodSchema = makeSchema();
