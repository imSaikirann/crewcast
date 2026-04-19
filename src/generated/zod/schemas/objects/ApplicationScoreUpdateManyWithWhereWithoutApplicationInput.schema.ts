import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationScoreScalarWhereInputObjectSchema as ApplicationScoreScalarWhereInputObjectSchema } from './ApplicationScoreScalarWhereInput.schema';
import { ApplicationScoreUpdateManyMutationInputObjectSchema as ApplicationScoreUpdateManyMutationInputObjectSchema } from './ApplicationScoreUpdateManyMutationInput.schema';
import { ApplicationScoreUncheckedUpdateManyWithoutApplicationInputObjectSchema as ApplicationScoreUncheckedUpdateManyWithoutApplicationInputObjectSchema } from './ApplicationScoreUncheckedUpdateManyWithoutApplicationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ApplicationScoreScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ApplicationScoreUpdateManyMutationInputObjectSchema), z.lazy(() => ApplicationScoreUncheckedUpdateManyWithoutApplicationInputObjectSchema)])
}).strict();
export const ApplicationScoreUpdateManyWithWhereWithoutApplicationInputObjectSchema: z.ZodType<Prisma.ApplicationScoreUpdateManyWithWhereWithoutApplicationInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationScoreUpdateManyWithWhereWithoutApplicationInput>;
export const ApplicationScoreUpdateManyWithWhereWithoutApplicationInputObjectZodSchema = makeSchema();
