import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  ip: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const FormViewUncheckedCreateWithoutFormInputObjectSchema: z.ZodType<Prisma.FormViewUncheckedCreateWithoutFormInput> = makeSchema() as unknown as z.ZodType<Prisma.FormViewUncheckedCreateWithoutFormInput>;
export const FormViewUncheckedCreateWithoutFormInputObjectZodSchema = makeSchema();
