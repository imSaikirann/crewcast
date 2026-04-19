import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormCreateWithoutRecruiterInputObjectSchema as RecruiterFormCreateWithoutRecruiterInputObjectSchema } from './RecruiterFormCreateWithoutRecruiterInput.schema';
import { RecruiterFormUncheckedCreateWithoutRecruiterInputObjectSchema as RecruiterFormUncheckedCreateWithoutRecruiterInputObjectSchema } from './RecruiterFormUncheckedCreateWithoutRecruiterInput.schema';
import { RecruiterFormCreateOrConnectWithoutRecruiterInputObjectSchema as RecruiterFormCreateOrConnectWithoutRecruiterInputObjectSchema } from './RecruiterFormCreateOrConnectWithoutRecruiterInput.schema';
import { RecruiterFormUpsertWithWhereUniqueWithoutRecruiterInputObjectSchema as RecruiterFormUpsertWithWhereUniqueWithoutRecruiterInputObjectSchema } from './RecruiterFormUpsertWithWhereUniqueWithoutRecruiterInput.schema';
import { RecruiterFormCreateManyRecruiterInputEnvelopeObjectSchema as RecruiterFormCreateManyRecruiterInputEnvelopeObjectSchema } from './RecruiterFormCreateManyRecruiterInputEnvelope.schema';
import { RecruiterFormWhereUniqueInputObjectSchema as RecruiterFormWhereUniqueInputObjectSchema } from './RecruiterFormWhereUniqueInput.schema';
import { RecruiterFormUpdateWithWhereUniqueWithoutRecruiterInputObjectSchema as RecruiterFormUpdateWithWhereUniqueWithoutRecruiterInputObjectSchema } from './RecruiterFormUpdateWithWhereUniqueWithoutRecruiterInput.schema';
import { RecruiterFormUpdateManyWithWhereWithoutRecruiterInputObjectSchema as RecruiterFormUpdateManyWithWhereWithoutRecruiterInputObjectSchema } from './RecruiterFormUpdateManyWithWhereWithoutRecruiterInput.schema';
import { RecruiterFormScalarWhereInputObjectSchema as RecruiterFormScalarWhereInputObjectSchema } from './RecruiterFormScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RecruiterFormCreateWithoutRecruiterInputObjectSchema), z.lazy(() => RecruiterFormCreateWithoutRecruiterInputObjectSchema).array(), z.lazy(() => RecruiterFormUncheckedCreateWithoutRecruiterInputObjectSchema), z.lazy(() => RecruiterFormUncheckedCreateWithoutRecruiterInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => RecruiterFormCreateOrConnectWithoutRecruiterInputObjectSchema), z.lazy(() => RecruiterFormCreateOrConnectWithoutRecruiterInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => RecruiterFormUpsertWithWhereUniqueWithoutRecruiterInputObjectSchema), z.lazy(() => RecruiterFormUpsertWithWhereUniqueWithoutRecruiterInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => RecruiterFormCreateManyRecruiterInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema), z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema), z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema), z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema), z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => RecruiterFormUpdateWithWhereUniqueWithoutRecruiterInputObjectSchema), z.lazy(() => RecruiterFormUpdateWithWhereUniqueWithoutRecruiterInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => RecruiterFormUpdateManyWithWhereWithoutRecruiterInputObjectSchema), z.lazy(() => RecruiterFormUpdateManyWithWhereWithoutRecruiterInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => RecruiterFormScalarWhereInputObjectSchema), z.lazy(() => RecruiterFormScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const RecruiterFormUpdateManyWithoutRecruiterNestedInputObjectSchema: z.ZodType<Prisma.RecruiterFormUpdateManyWithoutRecruiterNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormUpdateManyWithoutRecruiterNestedInput>;
export const RecruiterFormUpdateManyWithoutRecruiterNestedInputObjectZodSchema = makeSchema();
