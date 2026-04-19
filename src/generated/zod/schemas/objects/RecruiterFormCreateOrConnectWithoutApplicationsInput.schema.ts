import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormWhereUniqueInputObjectSchema as RecruiterFormWhereUniqueInputObjectSchema } from './RecruiterFormWhereUniqueInput.schema';
import { RecruiterFormCreateWithoutApplicationsInputObjectSchema as RecruiterFormCreateWithoutApplicationsInputObjectSchema } from './RecruiterFormCreateWithoutApplicationsInput.schema';
import { RecruiterFormUncheckedCreateWithoutApplicationsInputObjectSchema as RecruiterFormUncheckedCreateWithoutApplicationsInputObjectSchema } from './RecruiterFormUncheckedCreateWithoutApplicationsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => RecruiterFormCreateWithoutApplicationsInputObjectSchema), z.lazy(() => RecruiterFormUncheckedCreateWithoutApplicationsInputObjectSchema)])
}).strict();
export const RecruiterFormCreateOrConnectWithoutApplicationsInputObjectSchema: z.ZodType<Prisma.RecruiterFormCreateOrConnectWithoutApplicationsInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormCreateOrConnectWithoutApplicationsInput>;
export const RecruiterFormCreateOrConnectWithoutApplicationsInputObjectZodSchema = makeSchema();
