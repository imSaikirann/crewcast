import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormWhereUniqueInputObjectSchema as RecruiterFormWhereUniqueInputObjectSchema } from './RecruiterFormWhereUniqueInput.schema';
import { RecruiterFormUpdateWithoutDomainInputObjectSchema as RecruiterFormUpdateWithoutDomainInputObjectSchema } from './RecruiterFormUpdateWithoutDomainInput.schema';
import { RecruiterFormUncheckedUpdateWithoutDomainInputObjectSchema as RecruiterFormUncheckedUpdateWithoutDomainInputObjectSchema } from './RecruiterFormUncheckedUpdateWithoutDomainInput.schema';
import { RecruiterFormCreateWithoutDomainInputObjectSchema as RecruiterFormCreateWithoutDomainInputObjectSchema } from './RecruiterFormCreateWithoutDomainInput.schema';
import { RecruiterFormUncheckedCreateWithoutDomainInputObjectSchema as RecruiterFormUncheckedCreateWithoutDomainInputObjectSchema } from './RecruiterFormUncheckedCreateWithoutDomainInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => RecruiterFormUpdateWithoutDomainInputObjectSchema), z.lazy(() => RecruiterFormUncheckedUpdateWithoutDomainInputObjectSchema)]),
  create: z.union([z.lazy(() => RecruiterFormCreateWithoutDomainInputObjectSchema), z.lazy(() => RecruiterFormUncheckedCreateWithoutDomainInputObjectSchema)])
}).strict();
export const RecruiterFormUpsertWithWhereUniqueWithoutDomainInputObjectSchema: z.ZodType<Prisma.RecruiterFormUpsertWithWhereUniqueWithoutDomainInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormUpsertWithWhereUniqueWithoutDomainInput>;
export const RecruiterFormUpsertWithWhereUniqueWithoutDomainInputObjectZodSchema = makeSchema();
