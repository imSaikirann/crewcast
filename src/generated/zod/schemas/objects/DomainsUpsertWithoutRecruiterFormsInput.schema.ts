import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DomainsUpdateWithoutRecruiterFormsInputObjectSchema as DomainsUpdateWithoutRecruiterFormsInputObjectSchema } from './DomainsUpdateWithoutRecruiterFormsInput.schema';
import { DomainsUncheckedUpdateWithoutRecruiterFormsInputObjectSchema as DomainsUncheckedUpdateWithoutRecruiterFormsInputObjectSchema } from './DomainsUncheckedUpdateWithoutRecruiterFormsInput.schema';
import { DomainsCreateWithoutRecruiterFormsInputObjectSchema as DomainsCreateWithoutRecruiterFormsInputObjectSchema } from './DomainsCreateWithoutRecruiterFormsInput.schema';
import { DomainsUncheckedCreateWithoutRecruiterFormsInputObjectSchema as DomainsUncheckedCreateWithoutRecruiterFormsInputObjectSchema } from './DomainsUncheckedCreateWithoutRecruiterFormsInput.schema';
import { DomainsWhereInputObjectSchema as DomainsWhereInputObjectSchema } from './DomainsWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => DomainsUpdateWithoutRecruiterFormsInputObjectSchema), z.lazy(() => DomainsUncheckedUpdateWithoutRecruiterFormsInputObjectSchema)]),
  create: z.union([z.lazy(() => DomainsCreateWithoutRecruiterFormsInputObjectSchema), z.lazy(() => DomainsUncheckedCreateWithoutRecruiterFormsInputObjectSchema)]),
  where: z.lazy(() => DomainsWhereInputObjectSchema).optional()
}).strict();
export const DomainsUpsertWithoutRecruiterFormsInputObjectSchema: z.ZodType<Prisma.DomainsUpsertWithoutRecruiterFormsInput> = makeSchema() as unknown as z.ZodType<Prisma.DomainsUpsertWithoutRecruiterFormsInput>;
export const DomainsUpsertWithoutRecruiterFormsInputObjectZodSchema = makeSchema();
