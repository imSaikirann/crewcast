import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DefaultFormSchemaCreateWithoutDomainInputObjectSchema as DefaultFormSchemaCreateWithoutDomainInputObjectSchema } from './DefaultFormSchemaCreateWithoutDomainInput.schema';
import { DefaultFormSchemaUncheckedCreateWithoutDomainInputObjectSchema as DefaultFormSchemaUncheckedCreateWithoutDomainInputObjectSchema } from './DefaultFormSchemaUncheckedCreateWithoutDomainInput.schema';
import { DefaultFormSchemaCreateOrConnectWithoutDomainInputObjectSchema as DefaultFormSchemaCreateOrConnectWithoutDomainInputObjectSchema } from './DefaultFormSchemaCreateOrConnectWithoutDomainInput.schema';
import { DefaultFormSchemaUpsertWithWhereUniqueWithoutDomainInputObjectSchema as DefaultFormSchemaUpsertWithWhereUniqueWithoutDomainInputObjectSchema } from './DefaultFormSchemaUpsertWithWhereUniqueWithoutDomainInput.schema';
import { DefaultFormSchemaCreateManyDomainInputEnvelopeObjectSchema as DefaultFormSchemaCreateManyDomainInputEnvelopeObjectSchema } from './DefaultFormSchemaCreateManyDomainInputEnvelope.schema';
import { DefaultFormSchemaWhereUniqueInputObjectSchema as DefaultFormSchemaWhereUniqueInputObjectSchema } from './DefaultFormSchemaWhereUniqueInput.schema';
import { DefaultFormSchemaUpdateWithWhereUniqueWithoutDomainInputObjectSchema as DefaultFormSchemaUpdateWithWhereUniqueWithoutDomainInputObjectSchema } from './DefaultFormSchemaUpdateWithWhereUniqueWithoutDomainInput.schema';
import { DefaultFormSchemaUpdateManyWithWhereWithoutDomainInputObjectSchema as DefaultFormSchemaUpdateManyWithWhereWithoutDomainInputObjectSchema } from './DefaultFormSchemaUpdateManyWithWhereWithoutDomainInput.schema';
import { DefaultFormSchemaScalarWhereInputObjectSchema as DefaultFormSchemaScalarWhereInputObjectSchema } from './DefaultFormSchemaScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => DefaultFormSchemaCreateWithoutDomainInputObjectSchema), z.lazy(() => DefaultFormSchemaCreateWithoutDomainInputObjectSchema).array(), z.lazy(() => DefaultFormSchemaUncheckedCreateWithoutDomainInputObjectSchema), z.lazy(() => DefaultFormSchemaUncheckedCreateWithoutDomainInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => DefaultFormSchemaCreateOrConnectWithoutDomainInputObjectSchema), z.lazy(() => DefaultFormSchemaCreateOrConnectWithoutDomainInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => DefaultFormSchemaUpsertWithWhereUniqueWithoutDomainInputObjectSchema), z.lazy(() => DefaultFormSchemaUpsertWithWhereUniqueWithoutDomainInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => DefaultFormSchemaCreateManyDomainInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => DefaultFormSchemaWhereUniqueInputObjectSchema), z.lazy(() => DefaultFormSchemaWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => DefaultFormSchemaWhereUniqueInputObjectSchema), z.lazy(() => DefaultFormSchemaWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => DefaultFormSchemaWhereUniqueInputObjectSchema), z.lazy(() => DefaultFormSchemaWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => DefaultFormSchemaWhereUniqueInputObjectSchema), z.lazy(() => DefaultFormSchemaWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => DefaultFormSchemaUpdateWithWhereUniqueWithoutDomainInputObjectSchema), z.lazy(() => DefaultFormSchemaUpdateWithWhereUniqueWithoutDomainInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => DefaultFormSchemaUpdateManyWithWhereWithoutDomainInputObjectSchema), z.lazy(() => DefaultFormSchemaUpdateManyWithWhereWithoutDomainInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => DefaultFormSchemaScalarWhereInputObjectSchema), z.lazy(() => DefaultFormSchemaScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const DefaultFormSchemaUpdateManyWithoutDomainNestedInputObjectSchema: z.ZodType<Prisma.DefaultFormSchemaUpdateManyWithoutDomainNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.DefaultFormSchemaUpdateManyWithoutDomainNestedInput>;
export const DefaultFormSchemaUpdateManyWithoutDomainNestedInputObjectZodSchema = makeSchema();
