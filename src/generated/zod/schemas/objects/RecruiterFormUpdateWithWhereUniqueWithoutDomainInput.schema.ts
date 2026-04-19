import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormWhereUniqueInputObjectSchema as RecruiterFormWhereUniqueInputObjectSchema } from './RecruiterFormWhereUniqueInput.schema';
import { RecruiterFormUpdateWithoutDomainInputObjectSchema as RecruiterFormUpdateWithoutDomainInputObjectSchema } from './RecruiterFormUpdateWithoutDomainInput.schema';
import { RecruiterFormUncheckedUpdateWithoutDomainInputObjectSchema as RecruiterFormUncheckedUpdateWithoutDomainInputObjectSchema } from './RecruiterFormUncheckedUpdateWithoutDomainInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RecruiterFormWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => RecruiterFormUpdateWithoutDomainInputObjectSchema), z.lazy(() => RecruiterFormUncheckedUpdateWithoutDomainInputObjectSchema)])
}).strict();
export const RecruiterFormUpdateWithWhereUniqueWithoutDomainInputObjectSchema: z.ZodType<Prisma.RecruiterFormUpdateWithWhereUniqueWithoutDomainInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormUpdateWithWhereUniqueWithoutDomainInput>;
export const RecruiterFormUpdateWithWhereUniqueWithoutDomainInputObjectZodSchema = makeSchema();
