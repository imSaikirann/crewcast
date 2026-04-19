import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterCreateWithoutRecruiterFormsInputObjectSchema as RecruiterCreateWithoutRecruiterFormsInputObjectSchema } from './RecruiterCreateWithoutRecruiterFormsInput.schema';
import { RecruiterUncheckedCreateWithoutRecruiterFormsInputObjectSchema as RecruiterUncheckedCreateWithoutRecruiterFormsInputObjectSchema } from './RecruiterUncheckedCreateWithoutRecruiterFormsInput.schema';
import { RecruiterCreateOrConnectWithoutRecruiterFormsInputObjectSchema as RecruiterCreateOrConnectWithoutRecruiterFormsInputObjectSchema } from './RecruiterCreateOrConnectWithoutRecruiterFormsInput.schema';
import { RecruiterWhereUniqueInputObjectSchema as RecruiterWhereUniqueInputObjectSchema } from './RecruiterWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RecruiterCreateWithoutRecruiterFormsInputObjectSchema), z.lazy(() => RecruiterUncheckedCreateWithoutRecruiterFormsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => RecruiterCreateOrConnectWithoutRecruiterFormsInputObjectSchema).optional(),
  connect: z.lazy(() => RecruiterWhereUniqueInputObjectSchema).optional()
}).strict();
export const RecruiterCreateNestedOneWithoutRecruiterFormsInputObjectSchema: z.ZodType<Prisma.RecruiterCreateNestedOneWithoutRecruiterFormsInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterCreateNestedOneWithoutRecruiterFormsInput>;
export const RecruiterCreateNestedOneWithoutRecruiterFormsInputObjectZodSchema = makeSchema();
