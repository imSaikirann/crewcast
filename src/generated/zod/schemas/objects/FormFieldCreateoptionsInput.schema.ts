import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  set: z.string().array()
}).strict();
export const FormFieldCreateoptionsInputObjectSchema: z.ZodType<Prisma.FormFieldCreateoptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.FormFieldCreateoptionsInput>;
export const FormFieldCreateoptionsInputObjectZodSchema = makeSchema();
