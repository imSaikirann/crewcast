import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterWhereUniqueInputObjectSchema as RecruiterWhereUniqueInputObjectSchema } from './RecruiterWhereUniqueInput.schema';
import { RecruiterCreateWithoutRecruiterFormsInputObjectSchema as RecruiterCreateWithoutRecruiterFormsInputObjectSchema } from './RecruiterCreateWithoutRecruiterFormsInput.schema';
import { RecruiterUncheckedCreateWithoutRecruiterFormsInputObjectSchema as RecruiterUncheckedCreateWithoutRecruiterFormsInputObjectSchema } from './RecruiterUncheckedCreateWithoutRecruiterFormsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RecruiterWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => RecruiterCreateWithoutRecruiterFormsInputObjectSchema), z.lazy(() => RecruiterUncheckedCreateWithoutRecruiterFormsInputObjectSchema)])
}).strict();
export const RecruiterCreateOrConnectWithoutRecruiterFormsInputObjectSchema: z.ZodType<Prisma.RecruiterCreateOrConnectWithoutRecruiterFormsInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterCreateOrConnectWithoutRecruiterFormsInput>;
export const RecruiterCreateOrConnectWithoutRecruiterFormsInputObjectZodSchema = makeSchema();
