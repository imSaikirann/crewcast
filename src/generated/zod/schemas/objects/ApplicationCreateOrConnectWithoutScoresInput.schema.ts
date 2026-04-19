import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationWhereUniqueInputObjectSchema as ApplicationWhereUniqueInputObjectSchema } from './ApplicationWhereUniqueInput.schema';
import { ApplicationCreateWithoutScoresInputObjectSchema as ApplicationCreateWithoutScoresInputObjectSchema } from './ApplicationCreateWithoutScoresInput.schema';
import { ApplicationUncheckedCreateWithoutScoresInputObjectSchema as ApplicationUncheckedCreateWithoutScoresInputObjectSchema } from './ApplicationUncheckedCreateWithoutScoresInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ApplicationWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ApplicationCreateWithoutScoresInputObjectSchema), z.lazy(() => ApplicationUncheckedCreateWithoutScoresInputObjectSchema)])
}).strict();
export const ApplicationCreateOrConnectWithoutScoresInputObjectSchema: z.ZodType<Prisma.ApplicationCreateOrConnectWithoutScoresInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationCreateOrConnectWithoutScoresInput>;
export const ApplicationCreateOrConnectWithoutScoresInputObjectZodSchema = makeSchema();
