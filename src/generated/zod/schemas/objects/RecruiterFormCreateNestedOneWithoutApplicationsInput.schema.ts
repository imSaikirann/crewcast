import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormCreateWithoutApplicationsInputObjectSchema as RecruiterFormCreateWithoutApplicationsInputObjectSchema } from './RecruiterFormCreateWithoutApplicationsInput.schema';
import { RecruiterFormUncheckedCreateWithoutApplicationsInputObjectSchema as RecruiterFormUncheckedCreateWithoutApplicationsInputObjectSchema } from './RecruiterFormUncheckedCreateWithoutApplicationsInput.schema';
import { RecruiterFormCreateOrConnectWithoutApplicationsInputObjectSchema as RecruiterFormCreateOrConnectWithoutApplicationsInputObjectSchema } from './RecruiterFormCreateOrConnectWithoutApplicationsInput.schema';
import { RecruiterFormWhereUniqueInputObjectSchema as RecruiterFormWhereUniqueInputObjectSchema } from './RecruiterFormWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RecruiterFormCreateWithoutApplicationsInputObjectSchema), z.lazy(() => RecruiterFormUncheckedCreateWithoutApplicationsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => RecruiterFormCreateOrConnectWithoutApplicationsInputObjectSchema).optional(),
  connect: z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema).optional()
}).strict();
export const RecruiterFormCreateNestedOneWithoutApplicationsInputObjectSchema: z.ZodType<Prisma.RecruiterFormCreateNestedOneWithoutApplicationsInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormCreateNestedOneWithoutApplicationsInput>;
export const RecruiterFormCreateNestedOneWithoutApplicationsInputObjectZodSchema = makeSchema();
