import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormCreateWithoutDomainInputObjectSchema as RecruiterFormCreateWithoutDomainInputObjectSchema } from './RecruiterFormCreateWithoutDomainInput.schema';
import { RecruiterFormUncheckedCreateWithoutDomainInputObjectSchema as RecruiterFormUncheckedCreateWithoutDomainInputObjectSchema } from './RecruiterFormUncheckedCreateWithoutDomainInput.schema';
import { RecruiterFormCreateOrConnectWithoutDomainInputObjectSchema as RecruiterFormCreateOrConnectWithoutDomainInputObjectSchema } from './RecruiterFormCreateOrConnectWithoutDomainInput.schema';
import { RecruiterFormUpsertWithWhereUniqueWithoutDomainInputObjectSchema as RecruiterFormUpsertWithWhereUniqueWithoutDomainInputObjectSchema } from './RecruiterFormUpsertWithWhereUniqueWithoutDomainInput.schema';
import { RecruiterFormCreateManyDomainInputEnvelopeObjectSchema as RecruiterFormCreateManyDomainInputEnvelopeObjectSchema } from './RecruiterFormCreateManyDomainInputEnvelope.schema';
import { RecruiterFormWhereUniqueInputObjectSchema as RecruiterFormWhereUniqueInputObjectSchema } from './RecruiterFormWhereUniqueInput.schema';
import { RecruiterFormUpdateWithWhereUniqueWithoutDomainInputObjectSchema as RecruiterFormUpdateWithWhereUniqueWithoutDomainInputObjectSchema } from './RecruiterFormUpdateWithWhereUniqueWithoutDomainInput.schema';
import { RecruiterFormUpdateManyWithWhereWithoutDomainInputObjectSchema as RecruiterFormUpdateManyWithWhereWithoutDomainInputObjectSchema } from './RecruiterFormUpdateManyWithWhereWithoutDomainInput.schema';
import { RecruiterFormScalarWhereInputObjectSchema as RecruiterFormScalarWhereInputObjectSchema } from './RecruiterFormScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RecruiterFormCreateWithoutDomainInputObjectSchema), z.lazy(() => RecruiterFormCreateWithoutDomainInputObjectSchema).array(), z.lazy(() => RecruiterFormUncheckedCreateWithoutDomainInputObjectSchema), z.lazy(() => RecruiterFormUncheckedCreateWithoutDomainInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => RecruiterFormCreateOrConnectWithoutDomainInputObjectSchema), z.lazy(() => RecruiterFormCreateOrConnectWithoutDomainInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => RecruiterFormUpsertWithWhereUniqueWithoutDomainInputObjectSchema), z.lazy(() => RecruiterFormUpsertWithWhereUniqueWithoutDomainInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => RecruiterFormCreateManyDomainInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema), z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema), z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema), z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema), z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => RecruiterFormUpdateWithWhereUniqueWithoutDomainInputObjectSchema), z.lazy(() => RecruiterFormUpdateWithWhereUniqueWithoutDomainInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => RecruiterFormUpdateManyWithWhereWithoutDomainInputObjectSchema), z.lazy(() => RecruiterFormUpdateManyWithWhereWithoutDomainInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => RecruiterFormScalarWhereInputObjectSchema), z.lazy(() => RecruiterFormScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const RecruiterFormUpdateManyWithoutDomainNestedInputObjectSchema: z.ZodType<Prisma.RecruiterFormUpdateManyWithoutDomainNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormUpdateManyWithoutDomainNestedInput>;
export const RecruiterFormUpdateManyWithoutDomainNestedInputObjectZodSchema = makeSchema();
