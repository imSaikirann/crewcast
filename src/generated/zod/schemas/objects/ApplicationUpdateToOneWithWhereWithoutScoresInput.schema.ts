import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationWhereInputObjectSchema as ApplicationWhereInputObjectSchema } from './ApplicationWhereInput.schema';
import { ApplicationUpdateWithoutScoresInputObjectSchema as ApplicationUpdateWithoutScoresInputObjectSchema } from './ApplicationUpdateWithoutScoresInput.schema';
import { ApplicationUncheckedUpdateWithoutScoresInputObjectSchema as ApplicationUncheckedUpdateWithoutScoresInputObjectSchema } from './ApplicationUncheckedUpdateWithoutScoresInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ApplicationWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ApplicationUpdateWithoutScoresInputObjectSchema), z.lazy(() => ApplicationUncheckedUpdateWithoutScoresInputObjectSchema)])
}).strict();
export const ApplicationUpdateToOneWithWhereWithoutScoresInputObjectSchema: z.ZodType<Prisma.ApplicationUpdateToOneWithWhereWithoutScoresInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationUpdateToOneWithWhereWithoutScoresInput>;
export const ApplicationUpdateToOneWithWhereWithoutScoresInputObjectZodSchema = makeSchema();
