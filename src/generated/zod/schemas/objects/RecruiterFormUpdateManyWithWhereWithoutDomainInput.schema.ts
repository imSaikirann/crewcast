import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormScalarWhereInputObjectSchema as RecruiterFormScalarWhereInputObjectSchema } from './RecruiterFormScalarWhereInput.schema';
import { RecruiterFormUpdateManyMutationInputObjectSchema as RecruiterFormUpdateManyMutationInputObjectSchema } from './RecruiterFormUpdateManyMutationInput.schema';
import { RecruiterFormUncheckedUpdateManyWithoutDomainInputObjectSchema as RecruiterFormUncheckedUpdateManyWithoutDomainInputObjectSchema } from './RecruiterFormUncheckedUpdateManyWithoutDomainInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RecruiterFormScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => RecruiterFormUpdateManyMutationInputObjectSchema), z.lazy(() => RecruiterFormUncheckedUpdateManyWithoutDomainInputObjectSchema)])
}).strict();
export const RecruiterFormUpdateManyWithWhereWithoutDomainInputObjectSchema: z.ZodType<Prisma.RecruiterFormUpdateManyWithWhereWithoutDomainInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormUpdateManyWithWhereWithoutDomainInput>;
export const RecruiterFormUpdateManyWithWhereWithoutDomainInputObjectZodSchema = makeSchema();
