import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationCreateWithoutJobInputObjectSchema as ApplicationCreateWithoutJobInputObjectSchema } from './ApplicationCreateWithoutJobInput.schema';
import { ApplicationUncheckedCreateWithoutJobInputObjectSchema as ApplicationUncheckedCreateWithoutJobInputObjectSchema } from './ApplicationUncheckedCreateWithoutJobInput.schema';
import { ApplicationCreateOrConnectWithoutJobInputObjectSchema as ApplicationCreateOrConnectWithoutJobInputObjectSchema } from './ApplicationCreateOrConnectWithoutJobInput.schema';
import { ApplicationUpsertWithWhereUniqueWithoutJobInputObjectSchema as ApplicationUpsertWithWhereUniqueWithoutJobInputObjectSchema } from './ApplicationUpsertWithWhereUniqueWithoutJobInput.schema';
import { ApplicationCreateManyJobInputEnvelopeObjectSchema as ApplicationCreateManyJobInputEnvelopeObjectSchema } from './ApplicationCreateManyJobInputEnvelope.schema';
import { ApplicationWhereUniqueInputObjectSchema as ApplicationWhereUniqueInputObjectSchema } from './ApplicationWhereUniqueInput.schema';
import { ApplicationUpdateWithWhereUniqueWithoutJobInputObjectSchema as ApplicationUpdateWithWhereUniqueWithoutJobInputObjectSchema } from './ApplicationUpdateWithWhereUniqueWithoutJobInput.schema';
import { ApplicationUpdateManyWithWhereWithoutJobInputObjectSchema as ApplicationUpdateManyWithWhereWithoutJobInputObjectSchema } from './ApplicationUpdateManyWithWhereWithoutJobInput.schema';
import { ApplicationScalarWhereInputObjectSchema as ApplicationScalarWhereInputObjectSchema } from './ApplicationScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ApplicationCreateWithoutJobInputObjectSchema), z.lazy(() => ApplicationCreateWithoutJobInputObjectSchema).array(), z.lazy(() => ApplicationUncheckedCreateWithoutJobInputObjectSchema), z.lazy(() => ApplicationUncheckedCreateWithoutJobInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ApplicationCreateOrConnectWithoutJobInputObjectSchema), z.lazy(() => ApplicationCreateOrConnectWithoutJobInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ApplicationUpsertWithWhereUniqueWithoutJobInputObjectSchema), z.lazy(() => ApplicationUpsertWithWhereUniqueWithoutJobInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ApplicationCreateManyJobInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ApplicationWhereUniqueInputObjectSchema), z.lazy(() => ApplicationWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ApplicationWhereUniqueInputObjectSchema), z.lazy(() => ApplicationWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ApplicationWhereUniqueInputObjectSchema), z.lazy(() => ApplicationWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ApplicationWhereUniqueInputObjectSchema), z.lazy(() => ApplicationWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ApplicationUpdateWithWhereUniqueWithoutJobInputObjectSchema), z.lazy(() => ApplicationUpdateWithWhereUniqueWithoutJobInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ApplicationUpdateManyWithWhereWithoutJobInputObjectSchema), z.lazy(() => ApplicationUpdateManyWithWhereWithoutJobInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ApplicationScalarWhereInputObjectSchema), z.lazy(() => ApplicationScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ApplicationUncheckedUpdateManyWithoutJobNestedInputObjectSchema: z.ZodType<Prisma.ApplicationUncheckedUpdateManyWithoutJobNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationUncheckedUpdateManyWithoutJobNestedInput>;
export const ApplicationUncheckedUpdateManyWithoutJobNestedInputObjectZodSchema = makeSchema();
