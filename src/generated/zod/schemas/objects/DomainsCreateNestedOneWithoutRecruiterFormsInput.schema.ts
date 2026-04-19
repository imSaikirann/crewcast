import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DomainsCreateWithoutRecruiterFormsInputObjectSchema as DomainsCreateWithoutRecruiterFormsInputObjectSchema } from './DomainsCreateWithoutRecruiterFormsInput.schema';
import { DomainsUncheckedCreateWithoutRecruiterFormsInputObjectSchema as DomainsUncheckedCreateWithoutRecruiterFormsInputObjectSchema } from './DomainsUncheckedCreateWithoutRecruiterFormsInput.schema';
import { DomainsCreateOrConnectWithoutRecruiterFormsInputObjectSchema as DomainsCreateOrConnectWithoutRecruiterFormsInputObjectSchema } from './DomainsCreateOrConnectWithoutRecruiterFormsInput.schema';
import { DomainsWhereUniqueInputObjectSchema as DomainsWhereUniqueInputObjectSchema } from './DomainsWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => DomainsCreateWithoutRecruiterFormsInputObjectSchema), z.lazy(() => DomainsUncheckedCreateWithoutRecruiterFormsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => DomainsCreateOrConnectWithoutRecruiterFormsInputObjectSchema).optional(),
  connect: z.lazy(() => DomainsWhereUniqueInputObjectSchema).optional()
}).strict();
export const DomainsCreateNestedOneWithoutRecruiterFormsInputObjectSchema: z.ZodType<Prisma.DomainsCreateNestedOneWithoutRecruiterFormsInput> = makeSchema() as unknown as z.ZodType<Prisma.DomainsCreateNestedOneWithoutRecruiterFormsInput>;
export const DomainsCreateNestedOneWithoutRecruiterFormsInputObjectZodSchema = makeSchema();
