import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationWhereUniqueInputObjectSchema as ApplicationWhereUniqueInputObjectSchema } from './ApplicationWhereUniqueInput.schema';
import { ApplicationUpdateWithoutJobInputObjectSchema as ApplicationUpdateWithoutJobInputObjectSchema } from './ApplicationUpdateWithoutJobInput.schema';
import { ApplicationUncheckedUpdateWithoutJobInputObjectSchema as ApplicationUncheckedUpdateWithoutJobInputObjectSchema } from './ApplicationUncheckedUpdateWithoutJobInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ApplicationWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ApplicationUpdateWithoutJobInputObjectSchema), z.lazy(() => ApplicationUncheckedUpdateWithoutJobInputObjectSchema)])
}).strict();
export const ApplicationUpdateWithWhereUniqueWithoutJobInputObjectSchema: z.ZodType<Prisma.ApplicationUpdateWithWhereUniqueWithoutJobInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationUpdateWithWhereUniqueWithoutJobInput>;
export const ApplicationUpdateWithWhereUniqueWithoutJobInputObjectZodSchema = makeSchema();
