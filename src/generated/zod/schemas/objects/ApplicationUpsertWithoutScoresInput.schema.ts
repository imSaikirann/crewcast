import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationUpdateWithoutScoresInputObjectSchema as ApplicationUpdateWithoutScoresInputObjectSchema } from './ApplicationUpdateWithoutScoresInput.schema';
import { ApplicationUncheckedUpdateWithoutScoresInputObjectSchema as ApplicationUncheckedUpdateWithoutScoresInputObjectSchema } from './ApplicationUncheckedUpdateWithoutScoresInput.schema';
import { ApplicationCreateWithoutScoresInputObjectSchema as ApplicationCreateWithoutScoresInputObjectSchema } from './ApplicationCreateWithoutScoresInput.schema';
import { ApplicationUncheckedCreateWithoutScoresInputObjectSchema as ApplicationUncheckedCreateWithoutScoresInputObjectSchema } from './ApplicationUncheckedCreateWithoutScoresInput.schema';
import { ApplicationWhereInputObjectSchema as ApplicationWhereInputObjectSchema } from './ApplicationWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ApplicationUpdateWithoutScoresInputObjectSchema), z.lazy(() => ApplicationUncheckedUpdateWithoutScoresInputObjectSchema)]),
  create: z.union([z.lazy(() => ApplicationCreateWithoutScoresInputObjectSchema), z.lazy(() => ApplicationUncheckedCreateWithoutScoresInputObjectSchema)]),
  where: z.lazy(() => ApplicationWhereInputObjectSchema).optional()
}).strict();
export const ApplicationUpsertWithoutScoresInputObjectSchema: z.ZodType<Prisma.ApplicationUpsertWithoutScoresInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationUpsertWithoutScoresInput>;
export const ApplicationUpsertWithoutScoresInputObjectZodSchema = makeSchema();
