import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormCreateWithoutDomainInputObjectSchema as RecruiterFormCreateWithoutDomainInputObjectSchema } from './RecruiterFormCreateWithoutDomainInput.schema';
import { RecruiterFormUncheckedCreateWithoutDomainInputObjectSchema as RecruiterFormUncheckedCreateWithoutDomainInputObjectSchema } from './RecruiterFormUncheckedCreateWithoutDomainInput.schema';
import { RecruiterFormCreateOrConnectWithoutDomainInputObjectSchema as RecruiterFormCreateOrConnectWithoutDomainInputObjectSchema } from './RecruiterFormCreateOrConnectWithoutDomainInput.schema';
import { RecruiterFormCreateManyDomainInputEnvelopeObjectSchema as RecruiterFormCreateManyDomainInputEnvelopeObjectSchema } from './RecruiterFormCreateManyDomainInputEnvelope.schema';
import { RecruiterFormWhereUniqueInputObjectSchema as RecruiterFormWhereUniqueInputObjectSchema } from './RecruiterFormWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RecruiterFormCreateWithoutDomainInputObjectSchema), z.lazy(() => RecruiterFormCreateWithoutDomainInputObjectSchema).array(), z.lazy(() => RecruiterFormUncheckedCreateWithoutDomainInputObjectSchema), z.lazy(() => RecruiterFormUncheckedCreateWithoutDomainInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => RecruiterFormCreateOrConnectWithoutDomainInputObjectSchema), z.lazy(() => RecruiterFormCreateOrConnectWithoutDomainInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => RecruiterFormCreateManyDomainInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema), z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const RecruiterFormUncheckedCreateNestedManyWithoutDomainInputObjectSchema: z.ZodType<Prisma.RecruiterFormUncheckedCreateNestedManyWithoutDomainInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormUncheckedCreateNestedManyWithoutDomainInput>;
export const RecruiterFormUncheckedCreateNestedManyWithoutDomainInputObjectZodSchema = makeSchema();
