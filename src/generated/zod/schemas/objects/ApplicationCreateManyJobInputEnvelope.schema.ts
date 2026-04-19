import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationCreateManyJobInputObjectSchema as ApplicationCreateManyJobInputObjectSchema } from './ApplicationCreateManyJobInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ApplicationCreateManyJobInputObjectSchema), z.lazy(() => ApplicationCreateManyJobInputObjectSchema).array()])
}).strict();
export const ApplicationCreateManyJobInputEnvelopeObjectSchema: z.ZodType<Prisma.ApplicationCreateManyJobInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ApplicationCreateManyJobInputEnvelope>;
export const ApplicationCreateManyJobInputEnvelopeObjectZodSchema = makeSchema();
