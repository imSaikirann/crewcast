import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormCreateManyRecruiterInputObjectSchema as RecruiterFormCreateManyRecruiterInputObjectSchema } from './RecruiterFormCreateManyRecruiterInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => RecruiterFormCreateManyRecruiterInputObjectSchema), z.lazy(() => RecruiterFormCreateManyRecruiterInputObjectSchema).array()])
}).strict();
export const RecruiterFormCreateManyRecruiterInputEnvelopeObjectSchema: z.ZodType<Prisma.RecruiterFormCreateManyRecruiterInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormCreateManyRecruiterInputEnvelope>;
export const RecruiterFormCreateManyRecruiterInputEnvelopeObjectZodSchema = makeSchema();
