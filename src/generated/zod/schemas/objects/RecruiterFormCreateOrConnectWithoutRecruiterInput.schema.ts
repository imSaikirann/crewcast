import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormWhereUniqueInputObjectSchema as RecruiterFormWhereUniqueInputObjectSchema } from './RecruiterFormWhereUniqueInput.schema';
import { RecruiterFormCreateWithoutRecruiterInputObjectSchema as RecruiterFormCreateWithoutRecruiterInputObjectSchema } from './RecruiterFormCreateWithoutRecruiterInput.schema';
import { RecruiterFormUncheckedCreateWithoutRecruiterInputObjectSchema as RecruiterFormUncheckedCreateWithoutRecruiterInputObjectSchema } from './RecruiterFormUncheckedCreateWithoutRecruiterInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => RecruiterFormCreateWithoutRecruiterInputObjectSchema), z.lazy(() => RecruiterFormUncheckedCreateWithoutRecruiterInputObjectSchema)])
}).strict();
export const RecruiterFormCreateOrConnectWithoutRecruiterInputObjectSchema: z.ZodType<Prisma.RecruiterFormCreateOrConnectWithoutRecruiterInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormCreateOrConnectWithoutRecruiterInput>;
export const RecruiterFormCreateOrConnectWithoutRecruiterInputObjectZodSchema = makeSchema();
