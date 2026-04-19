import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormCreateWithoutViewsInputObjectSchema as RecruiterFormCreateWithoutViewsInputObjectSchema } from './RecruiterFormCreateWithoutViewsInput.schema';
import { RecruiterFormUncheckedCreateWithoutViewsInputObjectSchema as RecruiterFormUncheckedCreateWithoutViewsInputObjectSchema } from './RecruiterFormUncheckedCreateWithoutViewsInput.schema';
import { RecruiterFormCreateOrConnectWithoutViewsInputObjectSchema as RecruiterFormCreateOrConnectWithoutViewsInputObjectSchema } from './RecruiterFormCreateOrConnectWithoutViewsInput.schema';
import { RecruiterFormUpsertWithoutViewsInputObjectSchema as RecruiterFormUpsertWithoutViewsInputObjectSchema } from './RecruiterFormUpsertWithoutViewsInput.schema';
import { RecruiterFormWhereUniqueInputObjectSchema as RecruiterFormWhereUniqueInputObjectSchema } from './RecruiterFormWhereUniqueInput.schema';
import { RecruiterFormUpdateToOneWithWhereWithoutViewsInputObjectSchema as RecruiterFormUpdateToOneWithWhereWithoutViewsInputObjectSchema } from './RecruiterFormUpdateToOneWithWhereWithoutViewsInput.schema';
import { RecruiterFormUpdateWithoutViewsInputObjectSchema as RecruiterFormUpdateWithoutViewsInputObjectSchema } from './RecruiterFormUpdateWithoutViewsInput.schema';
import { RecruiterFormUncheckedUpdateWithoutViewsInputObjectSchema as RecruiterFormUncheckedUpdateWithoutViewsInputObjectSchema } from './RecruiterFormUncheckedUpdateWithoutViewsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RecruiterFormCreateWithoutViewsInputObjectSchema), z.lazy(() => RecruiterFormUncheckedCreateWithoutViewsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => RecruiterFormCreateOrConnectWithoutViewsInputObjectSchema).optional(),
  upsert: z.lazy(() => RecruiterFormUpsertWithoutViewsInputObjectSchema).optional(),
  connect: z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => RecruiterFormUpdateToOneWithWhereWithoutViewsInputObjectSchema), z.lazy(() => RecruiterFormUpdateWithoutViewsInputObjectSchema), z.lazy(() => RecruiterFormUncheckedUpdateWithoutViewsInputObjectSchema)]).optional()
}).strict();
export const RecruiterFormUpdateOneRequiredWithoutViewsNestedInputObjectSchema: z.ZodType<Prisma.RecruiterFormUpdateOneRequiredWithoutViewsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormUpdateOneRequiredWithoutViewsNestedInput>;
export const RecruiterFormUpdateOneRequiredWithoutViewsNestedInputObjectZodSchema = makeSchema();
