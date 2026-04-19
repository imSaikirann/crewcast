import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationCreateWithoutJobInputObjectSchema as ApplicationCreateWithoutJobInputObjectSchema } from './ApplicationCreateWithoutJobInput.schema';
import { ApplicationUncheckedCreateWithoutJobInputObjectSchema as ApplicationUncheckedCreateWithoutJobInputObjectSchema } from './ApplicationUncheckedCreateWithoutJobInput.schema';
import { ApplicationCreateOrConnectWithoutJobInputObjectSchema as ApplicationCreateOrConnectWithoutJobInputObjectSchema } from './ApplicationCreateOrConnectWithoutJobInput.schema';
import { ApplicationCreateManyJobInputEnvelopeObjectSchema as ApplicationCreateManyJobInputEnvelopeObjectSchema } from './ApplicationCreateManyJobInputEnvelope.schema';
import { ApplicationWhereUniqueInputObjectSchema as ApplicationWhereUniqueInputObjectSchema } from './ApplicationWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ApplicationCreateWithoutJobInputObjectSchema), z.lazy(() => ApplicationCreateWithoutJobInputObjectSchema).array(), z.lazy(() => ApplicationUncheckedCreateWithoutJobInputObjectSchema), z.lazy(() => ApplicationUncheckedCreateWithoutJobInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ApplicationCreateOrConnectWithoutJobInputObjectSchema), z.lazy(() => ApplicationCreateOrConnectWithoutJobInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ApplicationCreateManyJobInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ApplicationWhereUniqueInputObjectSchema), z.lazy(() => ApplicationWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ApplicationUncheckedCreateNestedManyWithoutJobInputObjectSchema: z.ZodType<Prisma.ApplicationUncheckedCreateNestedManyWithoutJobInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationUncheckedCreateNestedManyWithoutJobInput>;
export const ApplicationUncheckedCreateNestedManyWithoutJobInputObjectZodSchema = makeSchema();
