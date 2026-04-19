import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DefaultFormSchemaCreateWithoutDomainInputObjectSchema as DefaultFormSchemaCreateWithoutDomainInputObjectSchema } from './DefaultFormSchemaCreateWithoutDomainInput.schema';
import { DefaultFormSchemaUncheckedCreateWithoutDomainInputObjectSchema as DefaultFormSchemaUncheckedCreateWithoutDomainInputObjectSchema } from './DefaultFormSchemaUncheckedCreateWithoutDomainInput.schema';
import { DefaultFormSchemaCreateOrConnectWithoutDomainInputObjectSchema as DefaultFormSchemaCreateOrConnectWithoutDomainInputObjectSchema } from './DefaultFormSchemaCreateOrConnectWithoutDomainInput.schema';
import { DefaultFormSchemaCreateManyDomainInputEnvelopeObjectSchema as DefaultFormSchemaCreateManyDomainInputEnvelopeObjectSchema } from './DefaultFormSchemaCreateManyDomainInputEnvelope.schema';
import { DefaultFormSchemaWhereUniqueInputObjectSchema as DefaultFormSchemaWhereUniqueInputObjectSchema } from './DefaultFormSchemaWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => DefaultFormSchemaCreateWithoutDomainInputObjectSchema), z.lazy(() => DefaultFormSchemaCreateWithoutDomainInputObjectSchema).array(), z.lazy(() => DefaultFormSchemaUncheckedCreateWithoutDomainInputObjectSchema), z.lazy(() => DefaultFormSchemaUncheckedCreateWithoutDomainInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => DefaultFormSchemaCreateOrConnectWithoutDomainInputObjectSchema), z.lazy(() => DefaultFormSchemaCreateOrConnectWithoutDomainInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => DefaultFormSchemaCreateManyDomainInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => DefaultFormSchemaWhereUniqueInputObjectSchema), z.lazy(() => DefaultFormSchemaWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const DefaultFormSchemaUncheckedCreateNestedManyWithoutDomainInputObjectSchema: z.ZodType<Prisma.DefaultFormSchemaUncheckedCreateNestedManyWithoutDomainInput> = makeSchema() as unknown as z.ZodType<Prisma.DefaultFormSchemaUncheckedCreateNestedManyWithoutDomainInput>;
export const DefaultFormSchemaUncheckedCreateNestedManyWithoutDomainInputObjectZodSchema = makeSchema();
