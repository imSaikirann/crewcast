import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DomainsWhereUniqueInputObjectSchema as DomainsWhereUniqueInputObjectSchema } from './DomainsWhereUniqueInput.schema';
import { DomainsCreateWithoutRecruiterFormsInputObjectSchema as DomainsCreateWithoutRecruiterFormsInputObjectSchema } from './DomainsCreateWithoutRecruiterFormsInput.schema';
import { DomainsUncheckedCreateWithoutRecruiterFormsInputObjectSchema as DomainsUncheckedCreateWithoutRecruiterFormsInputObjectSchema } from './DomainsUncheckedCreateWithoutRecruiterFormsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => DomainsWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => DomainsCreateWithoutRecruiterFormsInputObjectSchema), z.lazy(() => DomainsUncheckedCreateWithoutRecruiterFormsInputObjectSchema)])
}).strict();
export const DomainsCreateOrConnectWithoutRecruiterFormsInputObjectSchema: z.ZodType<Prisma.DomainsCreateOrConnectWithoutRecruiterFormsInput> = makeSchema() as unknown as z.ZodType<Prisma.DomainsCreateOrConnectWithoutRecruiterFormsInput>;
export const DomainsCreateOrConnectWithoutRecruiterFormsInputObjectZodSchema = makeSchema();
