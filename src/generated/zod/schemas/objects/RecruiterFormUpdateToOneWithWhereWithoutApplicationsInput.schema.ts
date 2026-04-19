import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormWhereInputObjectSchema as RecruiterFormWhereInputObjectSchema } from './RecruiterFormWhereInput.schema';
import { RecruiterFormUpdateWithoutApplicationsInputObjectSchema as RecruiterFormUpdateWithoutApplicationsInputObjectSchema } from './RecruiterFormUpdateWithoutApplicationsInput.schema';
import { RecruiterFormUncheckedUpdateWithoutApplicationsInputObjectSchema as RecruiterFormUncheckedUpdateWithoutApplicationsInputObjectSchema } from './RecruiterFormUncheckedUpdateWithoutApplicationsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RecruiterFormWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => RecruiterFormUpdateWithoutApplicationsInputObjectSchema), z.lazy(() => RecruiterFormUncheckedUpdateWithoutApplicationsInputObjectSchema)])
}).strict();
export const RecruiterFormUpdateToOneWithWhereWithoutApplicationsInputObjectSchema: z.ZodType<Prisma.RecruiterFormUpdateToOneWithWhereWithoutApplicationsInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormUpdateToOneWithWhereWithoutApplicationsInput>;
export const RecruiterFormUpdateToOneWithWhereWithoutApplicationsInputObjectZodSchema = makeSchema();
