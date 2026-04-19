import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterFormArgsObjectSchema as RecruiterFormArgsObjectSchema } from './RecruiterFormArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  formId: z.boolean().optional(),
  form: z.union([z.boolean(), z.lazy(() => RecruiterFormArgsObjectSchema)]).optional(),
  ip: z.boolean().optional(),
  userAgent: z.boolean().optional(),
  createdAt: z.boolean().optional()
}).strict();
export const FormViewSelectObjectSchema: z.ZodType<Prisma.FormViewSelect> = makeSchema() as unknown as z.ZodType<Prisma.FormViewSelect>;
export const FormViewSelectObjectZodSchema = makeSchema();
