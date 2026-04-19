import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormCreateWithoutApplicationsInputObjectSchema as RecruiterFormCreateWithoutApplicationsInputObjectSchema } from './RecruiterFormCreateWithoutApplicationsInput.schema';
import { RecruiterFormUncheckedCreateWithoutApplicationsInputObjectSchema as RecruiterFormUncheckedCreateWithoutApplicationsInputObjectSchema } from './RecruiterFormUncheckedCreateWithoutApplicationsInput.schema';
import { RecruiterFormCreateOrConnectWithoutApplicationsInputObjectSchema as RecruiterFormCreateOrConnectWithoutApplicationsInputObjectSchema } from './RecruiterFormCreateOrConnectWithoutApplicationsInput.schema';
import { RecruiterFormUpsertWithoutApplicationsInputObjectSchema as RecruiterFormUpsertWithoutApplicationsInputObjectSchema } from './RecruiterFormUpsertWithoutApplicationsInput.schema';
import { RecruiterFormWhereUniqueInputObjectSchema as RecruiterFormWhereUniqueInputObjectSchema } from './RecruiterFormWhereUniqueInput.schema';
import { RecruiterFormUpdateToOneWithWhereWithoutApplicationsInputObjectSchema as RecruiterFormUpdateToOneWithWhereWithoutApplicationsInputObjectSchema } from './RecruiterFormUpdateToOneWithWhereWithoutApplicationsInput.schema';
import { RecruiterFormUpdateWithoutApplicationsInputObjectSchema as RecruiterFormUpdateWithoutApplicationsInputObjectSchema } from './RecruiterFormUpdateWithoutApplicationsInput.schema';
import { RecruiterFormUncheckedUpdateWithoutApplicationsInputObjectSchema as RecruiterFormUncheckedUpdateWithoutApplicationsInputObjectSchema } from './RecruiterFormUncheckedUpdateWithoutApplicationsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RecruiterFormCreateWithoutApplicationsInputObjectSchema), z.lazy(() => RecruiterFormUncheckedCreateWithoutApplicationsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => RecruiterFormCreateOrConnectWithoutApplicationsInputObjectSchema).optional(),
  upsert: z.lazy(() => RecruiterFormUpsertWithoutApplicationsInputObjectSchema).optional(),
  connect: z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => RecruiterFormUpdateToOneWithWhereWithoutApplicationsInputObjectSchema), z.lazy(() => RecruiterFormUpdateWithoutApplicationsInputObjectSchema), z.lazy(() => RecruiterFormUncheckedUpdateWithoutApplicationsInputObjectSchema)]).optional()
}).strict();
export const RecruiterFormUpdateOneRequiredWithoutApplicationsNestedInputObjectSchema: z.ZodType<Prisma.RecruiterFormUpdateOneRequiredWithoutApplicationsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormUpdateOneRequiredWithoutApplicationsNestedInput>;
export const RecruiterFormUpdateOneRequiredWithoutApplicationsNestedInputObjectZodSchema = makeSchema();
