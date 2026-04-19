import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationCreateWithoutScoresInputObjectSchema as ApplicationCreateWithoutScoresInputObjectSchema } from './ApplicationCreateWithoutScoresInput.schema';
import { ApplicationUncheckedCreateWithoutScoresInputObjectSchema as ApplicationUncheckedCreateWithoutScoresInputObjectSchema } from './ApplicationUncheckedCreateWithoutScoresInput.schema';
import { ApplicationCreateOrConnectWithoutScoresInputObjectSchema as ApplicationCreateOrConnectWithoutScoresInputObjectSchema } from './ApplicationCreateOrConnectWithoutScoresInput.schema';
import { ApplicationWhereUniqueInputObjectSchema as ApplicationWhereUniqueInputObjectSchema } from './ApplicationWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ApplicationCreateWithoutScoresInputObjectSchema), z.lazy(() => ApplicationUncheckedCreateWithoutScoresInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ApplicationCreateOrConnectWithoutScoresInputObjectSchema).optional(),
  connect: z.lazy(() => ApplicationWhereUniqueInputObjectSchema).optional()
}).strict();
export const ApplicationCreateNestedOneWithoutScoresInputObjectSchema: z.ZodType<Prisma.ApplicationCreateNestedOneWithoutScoresInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationCreateNestedOneWithoutScoresInput>;
export const ApplicationCreateNestedOneWithoutScoresInputObjectZodSchema = makeSchema();
