import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationScoreWhereUniqueInputObjectSchema as ApplicationScoreWhereUniqueInputObjectSchema } from './ApplicationScoreWhereUniqueInput.schema';
import { ApplicationScoreUpdateWithoutApplicationInputObjectSchema as ApplicationScoreUpdateWithoutApplicationInputObjectSchema } from './ApplicationScoreUpdateWithoutApplicationInput.schema';
import { ApplicationScoreUncheckedUpdateWithoutApplicationInputObjectSchema as ApplicationScoreUncheckedUpdateWithoutApplicationInputObjectSchema } from './ApplicationScoreUncheckedUpdateWithoutApplicationInput.schema';
import { ApplicationScoreCreateWithoutApplicationInputObjectSchema as ApplicationScoreCreateWithoutApplicationInputObjectSchema } from './ApplicationScoreCreateWithoutApplicationInput.schema';
import { ApplicationScoreUncheckedCreateWithoutApplicationInputObjectSchema as ApplicationScoreUncheckedCreateWithoutApplicationInputObjectSchema } from './ApplicationScoreUncheckedCreateWithoutApplicationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ApplicationScoreWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ApplicationScoreUpdateWithoutApplicationInputObjectSchema), z.lazy(() => ApplicationScoreUncheckedUpdateWithoutApplicationInputObjectSchema)]),
  create: z.union([z.lazy(() => ApplicationScoreCreateWithoutApplicationInputObjectSchema), z.lazy(() => ApplicationScoreUncheckedCreateWithoutApplicationInputObjectSchema)])
}).strict();
export const ApplicationScoreUpsertWithWhereUniqueWithoutApplicationInputObjectSchema: z.ZodType<Prisma.ApplicationScoreUpsertWithWhereUniqueWithoutApplicationInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationScoreUpsertWithWhereUniqueWithoutApplicationInput>;
export const ApplicationScoreUpsertWithWhereUniqueWithoutApplicationInputObjectZodSchema = makeSchema();
