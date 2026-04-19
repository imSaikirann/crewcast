import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormCreateWithoutViewsInputObjectSchema as RecruiterFormCreateWithoutViewsInputObjectSchema } from './RecruiterFormCreateWithoutViewsInput.schema';
import { RecruiterFormUncheckedCreateWithoutViewsInputObjectSchema as RecruiterFormUncheckedCreateWithoutViewsInputObjectSchema } from './RecruiterFormUncheckedCreateWithoutViewsInput.schema';
import { RecruiterFormCreateOrConnectWithoutViewsInputObjectSchema as RecruiterFormCreateOrConnectWithoutViewsInputObjectSchema } from './RecruiterFormCreateOrConnectWithoutViewsInput.schema';
import { RecruiterFormWhereUniqueInputObjectSchema as RecruiterFormWhereUniqueInputObjectSchema } from './RecruiterFormWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RecruiterFormCreateWithoutViewsInputObjectSchema), z.lazy(() => RecruiterFormUncheckedCreateWithoutViewsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => RecruiterFormCreateOrConnectWithoutViewsInputObjectSchema).optional(),
  connect: z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema).optional()
}).strict();
export const RecruiterFormCreateNestedOneWithoutViewsInputObjectSchema: z.ZodType<Prisma.RecruiterFormCreateNestedOneWithoutViewsInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormCreateNestedOneWithoutViewsInput>;
export const RecruiterFormCreateNestedOneWithoutViewsInputObjectZodSchema = makeSchema();
