import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationCreateWithoutScoresInputObjectSchema as ApplicationCreateWithoutScoresInputObjectSchema } from './ApplicationCreateWithoutScoresInput.schema';
import { ApplicationUncheckedCreateWithoutScoresInputObjectSchema as ApplicationUncheckedCreateWithoutScoresInputObjectSchema } from './ApplicationUncheckedCreateWithoutScoresInput.schema';
import { ApplicationCreateOrConnectWithoutScoresInputObjectSchema as ApplicationCreateOrConnectWithoutScoresInputObjectSchema } from './ApplicationCreateOrConnectWithoutScoresInput.schema';
import { ApplicationUpsertWithoutScoresInputObjectSchema as ApplicationUpsertWithoutScoresInputObjectSchema } from './ApplicationUpsertWithoutScoresInput.schema';
import { ApplicationWhereUniqueInputObjectSchema as ApplicationWhereUniqueInputObjectSchema } from './ApplicationWhereUniqueInput.schema';
import { ApplicationUpdateToOneWithWhereWithoutScoresInputObjectSchema as ApplicationUpdateToOneWithWhereWithoutScoresInputObjectSchema } from './ApplicationUpdateToOneWithWhereWithoutScoresInput.schema';
import { ApplicationUpdateWithoutScoresInputObjectSchema as ApplicationUpdateWithoutScoresInputObjectSchema } from './ApplicationUpdateWithoutScoresInput.schema';
import { ApplicationUncheckedUpdateWithoutScoresInputObjectSchema as ApplicationUncheckedUpdateWithoutScoresInputObjectSchema } from './ApplicationUncheckedUpdateWithoutScoresInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ApplicationCreateWithoutScoresInputObjectSchema), z.lazy(() => ApplicationUncheckedCreateWithoutScoresInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ApplicationCreateOrConnectWithoutScoresInputObjectSchema).optional(),
  upsert: z.lazy(() => ApplicationUpsertWithoutScoresInputObjectSchema).optional(),
  connect: z.lazy(() => ApplicationWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ApplicationUpdateToOneWithWhereWithoutScoresInputObjectSchema), z.lazy(() => ApplicationUpdateWithoutScoresInputObjectSchema), z.lazy(() => ApplicationUncheckedUpdateWithoutScoresInputObjectSchema)]).optional()
}).strict();
export const ApplicationUpdateOneRequiredWithoutScoresNestedInputObjectSchema: z.ZodType<Prisma.ApplicationUpdateOneRequiredWithoutScoresNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationUpdateOneRequiredWithoutScoresNestedInput>;
export const ApplicationUpdateOneRequiredWithoutScoresNestedInputObjectZodSchema = makeSchema();
