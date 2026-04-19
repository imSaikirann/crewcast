import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationScoreCreateWithoutApplicationInputObjectSchema as ApplicationScoreCreateWithoutApplicationInputObjectSchema } from './ApplicationScoreCreateWithoutApplicationInput.schema';
import { ApplicationScoreUncheckedCreateWithoutApplicationInputObjectSchema as ApplicationScoreUncheckedCreateWithoutApplicationInputObjectSchema } from './ApplicationScoreUncheckedCreateWithoutApplicationInput.schema';
import { ApplicationScoreCreateOrConnectWithoutApplicationInputObjectSchema as ApplicationScoreCreateOrConnectWithoutApplicationInputObjectSchema } from './ApplicationScoreCreateOrConnectWithoutApplicationInput.schema';
import { ApplicationScoreUpsertWithWhereUniqueWithoutApplicationInputObjectSchema as ApplicationScoreUpsertWithWhereUniqueWithoutApplicationInputObjectSchema } from './ApplicationScoreUpsertWithWhereUniqueWithoutApplicationInput.schema';
import { ApplicationScoreCreateManyApplicationInputEnvelopeObjectSchema as ApplicationScoreCreateManyApplicationInputEnvelopeObjectSchema } from './ApplicationScoreCreateManyApplicationInputEnvelope.schema';
import { ApplicationScoreWhereUniqueInputObjectSchema as ApplicationScoreWhereUniqueInputObjectSchema } from './ApplicationScoreWhereUniqueInput.schema';
import { ApplicationScoreUpdateWithWhereUniqueWithoutApplicationInputObjectSchema as ApplicationScoreUpdateWithWhereUniqueWithoutApplicationInputObjectSchema } from './ApplicationScoreUpdateWithWhereUniqueWithoutApplicationInput.schema';
import { ApplicationScoreUpdateManyWithWhereWithoutApplicationInputObjectSchema as ApplicationScoreUpdateManyWithWhereWithoutApplicationInputObjectSchema } from './ApplicationScoreUpdateManyWithWhereWithoutApplicationInput.schema';
import { ApplicationScoreScalarWhereInputObjectSchema as ApplicationScoreScalarWhereInputObjectSchema } from './ApplicationScoreScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ApplicationScoreCreateWithoutApplicationInputObjectSchema), z.lazy(() => ApplicationScoreCreateWithoutApplicationInputObjectSchema).array(), z.lazy(() => ApplicationScoreUncheckedCreateWithoutApplicationInputObjectSchema), z.lazy(() => ApplicationScoreUncheckedCreateWithoutApplicationInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ApplicationScoreCreateOrConnectWithoutApplicationInputObjectSchema), z.lazy(() => ApplicationScoreCreateOrConnectWithoutApplicationInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ApplicationScoreUpsertWithWhereUniqueWithoutApplicationInputObjectSchema), z.lazy(() => ApplicationScoreUpsertWithWhereUniqueWithoutApplicationInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ApplicationScoreCreateManyApplicationInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ApplicationScoreWhereUniqueInputObjectSchema), z.lazy(() => ApplicationScoreWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ApplicationScoreWhereUniqueInputObjectSchema), z.lazy(() => ApplicationScoreWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ApplicationScoreWhereUniqueInputObjectSchema), z.lazy(() => ApplicationScoreWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ApplicationScoreWhereUniqueInputObjectSchema), z.lazy(() => ApplicationScoreWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ApplicationScoreUpdateWithWhereUniqueWithoutApplicationInputObjectSchema), z.lazy(() => ApplicationScoreUpdateWithWhereUniqueWithoutApplicationInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ApplicationScoreUpdateManyWithWhereWithoutApplicationInputObjectSchema), z.lazy(() => ApplicationScoreUpdateManyWithWhereWithoutApplicationInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ApplicationScoreScalarWhereInputObjectSchema), z.lazy(() => ApplicationScoreScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ApplicationScoreUncheckedUpdateManyWithoutApplicationNestedInputObjectSchema: z.ZodType<Prisma.ApplicationScoreUncheckedUpdateManyWithoutApplicationNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationScoreUncheckedUpdateManyWithoutApplicationNestedInput>;
export const ApplicationScoreUncheckedUpdateManyWithoutApplicationNestedInputObjectZodSchema = makeSchema();
