import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormCreateManyDomainInputObjectSchema as RecruiterFormCreateManyDomainInputObjectSchema } from './RecruiterFormCreateManyDomainInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => RecruiterFormCreateManyDomainInputObjectSchema), z.lazy(() => RecruiterFormCreateManyDomainInputObjectSchema).array()])
}).strict();
export const RecruiterFormCreateManyDomainInputEnvelopeObjectSchema: z.ZodType<Prisma.RecruiterFormCreateManyDomainInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormCreateManyDomainInputEnvelope>;
export const RecruiterFormCreateManyDomainInputEnvelopeObjectZodSchema = makeSchema();
