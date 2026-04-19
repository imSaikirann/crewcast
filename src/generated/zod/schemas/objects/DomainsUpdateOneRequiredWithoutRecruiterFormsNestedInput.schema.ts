import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DomainsCreateWithoutRecruiterFormsInputObjectSchema as DomainsCreateWithoutRecruiterFormsInputObjectSchema } from './DomainsCreateWithoutRecruiterFormsInput.schema';
import { DomainsUncheckedCreateWithoutRecruiterFormsInputObjectSchema as DomainsUncheckedCreateWithoutRecruiterFormsInputObjectSchema } from './DomainsUncheckedCreateWithoutRecruiterFormsInput.schema';
import { DomainsCreateOrConnectWithoutRecruiterFormsInputObjectSchema as DomainsCreateOrConnectWithoutRecruiterFormsInputObjectSchema } from './DomainsCreateOrConnectWithoutRecruiterFormsInput.schema';
import { DomainsUpsertWithoutRecruiterFormsInputObjectSchema as DomainsUpsertWithoutRecruiterFormsInputObjectSchema } from './DomainsUpsertWithoutRecruiterFormsInput.schema';
import { DomainsWhereUniqueInputObjectSchema as DomainsWhereUniqueInputObjectSchema } from './DomainsWhereUniqueInput.schema';
import { DomainsUpdateToOneWithWhereWithoutRecruiterFormsInputObjectSchema as DomainsUpdateToOneWithWhereWithoutRecruiterFormsInputObjectSchema } from './DomainsUpdateToOneWithWhereWithoutRecruiterFormsInput.schema';
import { DomainsUpdateWithoutRecruiterFormsInputObjectSchema as DomainsUpdateWithoutRecruiterFormsInputObjectSchema } from './DomainsUpdateWithoutRecruiterFormsInput.schema';
import { DomainsUncheckedUpdateWithoutRecruiterFormsInputObjectSchema as DomainsUncheckedUpdateWithoutRecruiterFormsInputObjectSchema } from './DomainsUncheckedUpdateWithoutRecruiterFormsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => DomainsCreateWithoutRecruiterFormsInputObjectSchema), z.lazy(() => DomainsUncheckedCreateWithoutRecruiterFormsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => DomainsCreateOrConnectWithoutRecruiterFormsInputObjectSchema).optional(),
  upsert: z.lazy(() => DomainsUpsertWithoutRecruiterFormsInputObjectSchema).optional(),
  connect: z.lazy(() => DomainsWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => DomainsUpdateToOneWithWhereWithoutRecruiterFormsInputObjectSchema), z.lazy(() => DomainsUpdateWithoutRecruiterFormsInputObjectSchema), z.lazy(() => DomainsUncheckedUpdateWithoutRecruiterFormsInputObjectSchema)]).optional()
}).strict();
export const DomainsUpdateOneRequiredWithoutRecruiterFormsNestedInputObjectSchema: z.ZodType<Prisma.DomainsUpdateOneRequiredWithoutRecruiterFormsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.DomainsUpdateOneRequiredWithoutRecruiterFormsNestedInput>;
export const DomainsUpdateOneRequiredWithoutRecruiterFormsNestedInputObjectZodSchema = makeSchema();
