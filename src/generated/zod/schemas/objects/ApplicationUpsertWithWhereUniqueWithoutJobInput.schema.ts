import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationWhereUniqueInputObjectSchema as ApplicationWhereUniqueInputObjectSchema } from './ApplicationWhereUniqueInput.schema';
import { ApplicationUpdateWithoutJobInputObjectSchema as ApplicationUpdateWithoutJobInputObjectSchema } from './ApplicationUpdateWithoutJobInput.schema';
import { ApplicationUncheckedUpdateWithoutJobInputObjectSchema as ApplicationUncheckedUpdateWithoutJobInputObjectSchema } from './ApplicationUncheckedUpdateWithoutJobInput.schema';
import { ApplicationCreateWithoutJobInputObjectSchema as ApplicationCreateWithoutJobInputObjectSchema } from './ApplicationCreateWithoutJobInput.schema';
import { ApplicationUncheckedCreateWithoutJobInputObjectSchema as ApplicationUncheckedCreateWithoutJobInputObjectSchema } from './ApplicationUncheckedCreateWithoutJobInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ApplicationWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ApplicationUpdateWithoutJobInputObjectSchema), z.lazy(() => ApplicationUncheckedUpdateWithoutJobInputObjectSchema)]),
  create: z.union([z.lazy(() => ApplicationCreateWithoutJobInputObjectSchema), z.lazy(() => ApplicationUncheckedCreateWithoutJobInputObjectSchema)])
}).strict();
export const ApplicationUpsertWithWhereUniqueWithoutJobInputObjectSchema: z.ZodType<Prisma.ApplicationUpsertWithWhereUniqueWithoutJobInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationUpsertWithWhereUniqueWithoutJobInput>;
export const ApplicationUpsertWithWhereUniqueWithoutJobInputObjectZodSchema = makeSchema();
