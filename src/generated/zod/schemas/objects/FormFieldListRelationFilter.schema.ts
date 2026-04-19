import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FormFieldWhereInputObjectSchema as FormFieldWhereInputObjectSchema } from './FormFieldWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => FormFieldWhereInputObjectSchema).optional(),
  some: z.lazy(() => FormFieldWhereInputObjectSchema).optional(),
  none: z.lazy(() => FormFieldWhereInputObjectSchema).optional()
}).strict();
export const FormFieldListRelationFilterObjectSchema: z.ZodType<Prisma.FormFieldListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.FormFieldListRelationFilter>;
export const FormFieldListRelationFilterObjectZodSchema = makeSchema();
