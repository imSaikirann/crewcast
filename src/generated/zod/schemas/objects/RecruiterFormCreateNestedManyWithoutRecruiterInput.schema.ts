import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormCreateWithoutRecruiterInputObjectSchema as RecruiterFormCreateWithoutRecruiterInputObjectSchema } from './RecruiterFormCreateWithoutRecruiterInput.schema';
import { RecruiterFormUncheckedCreateWithoutRecruiterInputObjectSchema as RecruiterFormUncheckedCreateWithoutRecruiterInputObjectSchema } from './RecruiterFormUncheckedCreateWithoutRecruiterInput.schema';
import { RecruiterFormCreateOrConnectWithoutRecruiterInputObjectSchema as RecruiterFormCreateOrConnectWithoutRecruiterInputObjectSchema } from './RecruiterFormCreateOrConnectWithoutRecruiterInput.schema';
import { RecruiterFormCreateManyRecruiterInputEnvelopeObjectSchema as RecruiterFormCreateManyRecruiterInputEnvelopeObjectSchema } from './RecruiterFormCreateManyRecruiterInputEnvelope.schema';
import { RecruiterFormWhereUniqueInputObjectSchema as RecruiterFormWhereUniqueInputObjectSchema } from './RecruiterFormWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RecruiterFormCreateWithoutRecruiterInputObjectSchema), z.lazy(() => RecruiterFormCreateWithoutRecruiterInputObjectSchema).array(), z.lazy(() => RecruiterFormUncheckedCreateWithoutRecruiterInputObjectSchema), z.lazy(() => RecruiterFormUncheckedCreateWithoutRecruiterInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => RecruiterFormCreateOrConnectWithoutRecruiterInputObjectSchema), z.lazy(() => RecruiterFormCreateOrConnectWithoutRecruiterInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => RecruiterFormCreateManyRecruiterInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema), z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const RecruiterFormCreateNestedManyWithoutRecruiterInputObjectSchema: z.ZodType<Prisma.RecruiterFormCreateNestedManyWithoutRecruiterInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormCreateNestedManyWithoutRecruiterInput>;
export const RecruiterFormCreateNestedManyWithoutRecruiterInputObjectZodSchema = makeSchema();
