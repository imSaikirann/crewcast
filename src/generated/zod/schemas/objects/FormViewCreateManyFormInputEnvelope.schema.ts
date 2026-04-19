import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FormViewCreateManyFormInputObjectSchema as FormViewCreateManyFormInputObjectSchema } from './FormViewCreateManyFormInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => FormViewCreateManyFormInputObjectSchema), z.lazy(() => FormViewCreateManyFormInputObjectSchema).array()])
}).strict();
export const FormViewCreateManyFormInputEnvelopeObjectSchema: z.ZodType<Prisma.FormViewCreateManyFormInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.FormViewCreateManyFormInputEnvelope>;
export const FormViewCreateManyFormInputEnvelopeObjectZodSchema = makeSchema();
