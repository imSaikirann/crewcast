import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormWhereUniqueInputObjectSchema as RecruiterFormWhereUniqueInputObjectSchema } from './RecruiterFormWhereUniqueInput.schema';
import { RecruiterFormCreateWithoutViewsInputObjectSchema as RecruiterFormCreateWithoutViewsInputObjectSchema } from './RecruiterFormCreateWithoutViewsInput.schema';
import { RecruiterFormUncheckedCreateWithoutViewsInputObjectSchema as RecruiterFormUncheckedCreateWithoutViewsInputObjectSchema } from './RecruiterFormUncheckedCreateWithoutViewsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => RecruiterFormCreateWithoutViewsInputObjectSchema), z.lazy(() => RecruiterFormUncheckedCreateWithoutViewsInputObjectSchema)])
}).strict();
export const RecruiterFormCreateOrConnectWithoutViewsInputObjectSchema: z.ZodType<Prisma.RecruiterFormCreateOrConnectWithoutViewsInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormCreateOrConnectWithoutViewsInput>;
export const RecruiterFormCreateOrConnectWithoutViewsInputObjectZodSchema = makeSchema();
