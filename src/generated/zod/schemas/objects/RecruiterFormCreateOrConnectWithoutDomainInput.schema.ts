import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormWhereUniqueInputObjectSchema as RecruiterFormWhereUniqueInputObjectSchema } from './RecruiterFormWhereUniqueInput.schema';
import { RecruiterFormCreateWithoutDomainInputObjectSchema as RecruiterFormCreateWithoutDomainInputObjectSchema } from './RecruiterFormCreateWithoutDomainInput.schema';
import { RecruiterFormUncheckedCreateWithoutDomainInputObjectSchema as RecruiterFormUncheckedCreateWithoutDomainInputObjectSchema } from './RecruiterFormUncheckedCreateWithoutDomainInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => RecruiterFormCreateWithoutDomainInputObjectSchema), z.lazy(() => RecruiterFormUncheckedCreateWithoutDomainInputObjectSchema)])
}).strict();
export const RecruiterFormCreateOrConnectWithoutDomainInputObjectSchema: z.ZodType<Prisma.RecruiterFormCreateOrConnectWithoutDomainInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormCreateOrConnectWithoutDomainInput>;
export const RecruiterFormCreateOrConnectWithoutDomainInputObjectZodSchema = makeSchema();
