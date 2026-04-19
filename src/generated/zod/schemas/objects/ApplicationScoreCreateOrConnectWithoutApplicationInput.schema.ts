import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationScoreWhereUniqueInputObjectSchema as ApplicationScoreWhereUniqueInputObjectSchema } from './ApplicationScoreWhereUniqueInput.schema';
import { ApplicationScoreCreateWithoutApplicationInputObjectSchema as ApplicationScoreCreateWithoutApplicationInputObjectSchema } from './ApplicationScoreCreateWithoutApplicationInput.schema';
import { ApplicationScoreUncheckedCreateWithoutApplicationInputObjectSchema as ApplicationScoreUncheckedCreateWithoutApplicationInputObjectSchema } from './ApplicationScoreUncheckedCreateWithoutApplicationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ApplicationScoreWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ApplicationScoreCreateWithoutApplicationInputObjectSchema), z.lazy(() => ApplicationScoreUncheckedCreateWithoutApplicationInputObjectSchema)])
}).strict();
export const ApplicationScoreCreateOrConnectWithoutApplicationInputObjectSchema: z.ZodType<Prisma.ApplicationScoreCreateOrConnectWithoutApplicationInput> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationScoreCreateOrConnectWithoutApplicationInput>;
export const ApplicationScoreCreateOrConnectWithoutApplicationInputObjectZodSchema = makeSchema();
