import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationScoreCreateManyApplicationInputObjectSchema as ApplicationScoreCreateManyApplicationInputObjectSchema } from './ApplicationScoreCreateManyApplicationInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ApplicationScoreCreateManyApplicationInputObjectSchema), z.lazy(() => ApplicationScoreCreateManyApplicationInputObjectSchema).array()])
}).strict();
export const ApplicationScoreCreateManyApplicationInputEnvelopeObjectSchema: z.ZodType<Prisma.ApplicationScoreCreateManyApplicationInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationScoreCreateManyApplicationInputEnvelope>;
export const ApplicationScoreCreateManyApplicationInputEnvelopeObjectZodSchema = makeSchema();
