import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationScoreWhereUniqueInputObjectSchema as ApplicationScoreWhereUniqueInputObjectSchema } from './ApplicationScoreWhereUniqueInput.schema';
import { ApplicationScoreUpdateWithoutApplicationInputObjectSchema as ApplicationScoreUpdateWithoutApplicationInputObjectSchema } from './ApplicationScoreUpdateWithoutApplicationInput.schema';
import { ApplicationScoreUncheckedUpdateWithoutApplicationInputObjectSchema as ApplicationScoreUncheckedUpdateWithoutApplicationInputObjectSchema } from './ApplicationScoreUncheckedUpdateWithoutApplicationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ApplicationScoreWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ApplicationScoreUpdateWithoutApplicationInputObjectSchema), z.lazy(() => ApplicationScoreUncheckedUpdateWithoutApplicationInputObjectSchema)])
}).strict();
export const ApplicationScoreUpdateWithWhereUniqueWithoutApplicationInputObjectSchema: z.ZodType<Prisma.ApplicationScoreUpdateWithWhereUniqueWithoutApplicationInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationScoreUpdateWithWhereUniqueWithoutApplicationInput>;
export const ApplicationScoreUpdateWithWhereUniqueWithoutApplicationInputObjectZodSchema = makeSchema();
