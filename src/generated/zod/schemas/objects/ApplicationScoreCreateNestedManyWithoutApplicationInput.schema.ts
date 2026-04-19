import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationScoreCreateWithoutApplicationInputObjectSchema as ApplicationScoreCreateWithoutApplicationInputObjectSchema } from './ApplicationScoreCreateWithoutApplicationInput.schema';
import { ApplicationScoreUncheckedCreateWithoutApplicationInputObjectSchema as ApplicationScoreUncheckedCreateWithoutApplicationInputObjectSchema } from './ApplicationScoreUncheckedCreateWithoutApplicationInput.schema';
import { ApplicationScoreCreateOrConnectWithoutApplicationInputObjectSchema as ApplicationScoreCreateOrConnectWithoutApplicationInputObjectSchema } from './ApplicationScoreCreateOrConnectWithoutApplicationInput.schema';
import { ApplicationScoreCreateManyApplicationInputEnvelopeObjectSchema as ApplicationScoreCreateManyApplicationInputEnvelopeObjectSchema } from './ApplicationScoreCreateManyApplicationInputEnvelope.schema';
import { ApplicationScoreWhereUniqueInputObjectSchema as ApplicationScoreWhereUniqueInputObjectSchema } from './ApplicationScoreWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ApplicationScoreCreateWithoutApplicationInputObjectSchema), z.lazy(() => ApplicationScoreCreateWithoutApplicationInputObjectSchema).array(), z.lazy(() => ApplicationScoreUncheckedCreateWithoutApplicationInputObjectSchema), z.lazy(() => ApplicationScoreUncheckedCreateWithoutApplicationInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ApplicationScoreCreateOrConnectWithoutApplicationInputObjectSchema), z.lazy(() => ApplicationScoreCreateOrConnectWithoutApplicationInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ApplicationScoreCreateManyApplicationInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ApplicationScoreWhereUniqueInputObjectSchema), z.lazy(() => ApplicationScoreWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ApplicationScoreCreateNestedManyWithoutApplicationInputObjectSchema: z.ZodType<Prisma.ApplicationScoreCreateNestedManyWithoutApplicationInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationScoreCreateNestedManyWithoutApplicationInput>;
export const ApplicationScoreCreateNestedManyWithoutApplicationInputObjectZodSchema = makeSchema();
