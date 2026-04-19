import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DefaultFormSchemaCreateManyDomainInputObjectSchema as DefaultFormSchemaCreateManyDomainInputObjectSchema } from './DefaultFormSchemaCreateManyDomainInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => DefaultFormSchemaCreateManyDomainInputObjectSchema), z.lazy(() => DefaultFormSchemaCreateManyDomainInputObjectSchema).array()])
}).strict();
export const DefaultFormSchemaCreateManyDomainInputEnvelopeObjectSchema: z.ZodType<Prisma.DefaultFormSchemaCreateManyDomainInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.DefaultFormSchemaCreateManyDomainInputEnvelope>;
export const DefaultFormSchemaCreateManyDomainInputEnvelopeObjectZodSchema = makeSchema();
