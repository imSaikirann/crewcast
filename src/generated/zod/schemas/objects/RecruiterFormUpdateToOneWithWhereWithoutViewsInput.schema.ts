import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormWhereInputObjectSchema as RecruiterFormWhereInputObjectSchema } from './RecruiterFormWhereInput.schema';
import { RecruiterFormUpdateWithoutViewsInputObjectSchema as RecruiterFormUpdateWithoutViewsInputObjectSchema } from './RecruiterFormUpdateWithoutViewsInput.schema';
import { RecruiterFormUncheckedUpdateWithoutViewsInputObjectSchema as RecruiterFormUncheckedUpdateWithoutViewsInputObjectSchema } from './RecruiterFormUncheckedUpdateWithoutViewsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RecruiterFormWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => RecruiterFormUpdateWithoutViewsInputObjectSchema), z.lazy(() => RecruiterFormUncheckedUpdateWithoutViewsInputObjectSchema)])
}).strict();
export const RecruiterFormUpdateToOneWithWhereWithoutViewsInputObjectSchema: z.ZodType<Prisma.RecruiterFormUpdateToOneWithWhereWithoutViewsInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormUpdateToOneWithWhereWithoutViewsInput>;
export const RecruiterFormUpdateToOneWithWhereWithoutViewsInputObjectZodSchema = makeSchema();
