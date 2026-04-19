import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationScalarWhereInputObjectSchema as ApplicationScalarWhereInputObjectSchema } from './ApplicationScalarWhereInput.schema';
import { ApplicationUpdateManyMutationInputObjectSchema as ApplicationUpdateManyMutationInputObjectSchema } from './ApplicationUpdateManyMutationInput.schema';
import { ApplicationUncheckedUpdateManyWithoutJobInputObjectSchema as ApplicationUncheckedUpdateManyWithoutJobInputObjectSchema } from './ApplicationUncheckedUpdateManyWithoutJobInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ApplicationScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ApplicationUpdateManyMutationInputObjectSchema), z.lazy(() => ApplicationUncheckedUpdateManyWithoutJobInputObjectSchema)])
}).strict();
export const ApplicationUpdateManyWithWhereWithoutJobInputObjectSchema: z.ZodType<Prisma.ApplicationUpdateManyWithWhereWithoutJobInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationUpdateManyWithWhereWithoutJobInput>;
export const ApplicationUpdateManyWithWhereWithoutJobInputObjectZodSchema = makeSchema();
