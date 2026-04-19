import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DomainsWhereInputObjectSchema as DomainsWhereInputObjectSchema } from './DomainsWhereInput.schema';
import { DomainsUpdateWithoutRecruiterFormsInputObjectSchema as DomainsUpdateWithoutRecruiterFormsInputObjectSchema } from './DomainsUpdateWithoutRecruiterFormsInput.schema';
import { DomainsUncheckedUpdateWithoutRecruiterFormsInputObjectSchema as DomainsUncheckedUpdateWithoutRecruiterFormsInputObjectSchema } from './DomainsUncheckedUpdateWithoutRecruiterFormsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => DomainsWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => DomainsUpdateWithoutRecruiterFormsInputObjectSchema), z.lazy(() => DomainsUncheckedUpdateWithoutRecruiterFormsInputObjectSchema)])
}).strict();
export const DomainsUpdateToOneWithWhereWithoutRecruiterFormsInputObjectSchema: z.ZodType<Prisma.DomainsUpdateToOneWithWhereWithoutRecruiterFormsInput> = makeSchema() as unknown as z.ZodType<Prisma.DomainsUpdateToOneWithWhereWithoutRecruiterFormsInput>;
export const DomainsUpdateToOneWithWhereWithoutRecruiterFormsInputObjectZodSchema = makeSchema();
