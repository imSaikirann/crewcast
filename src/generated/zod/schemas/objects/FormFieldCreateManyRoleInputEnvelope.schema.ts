import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FormFieldCreateManyRoleInputObjectSchema as FormFieldCreateManyRoleInputObjectSchema } from './FormFieldCreateManyRoleInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => FormFieldCreateManyRoleInputObjectSchema), z.lazy(() => FormFieldCreateManyRoleInputObjectSchema).array()])
}).strict();
export const FormFieldCreateManyRoleInputEnvelopeObjectSchema: z.ZodType<Prisma.FormFieldCreateManyRoleInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.FormFieldCreateManyRoleInputEnvelope>;
export const FormFieldCreateManyRoleInputEnvelopeObjectZodSchema = makeSchema();
