import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FormFieldCreateManyInputObjectSchema as FormFieldCreateManyInputObjectSchema } from './objects/FormFieldCreateManyInput.schema';

export const FormFieldCreateManySchema: z.ZodType<Prisma.FormFieldCreateManyArgs> = z.object({ data: z.union([ FormFieldCreateManyInputObjectSchema, z.array(FormFieldCreateManyInputObjectSchema) ]),  }).strict() as unknown as z.ZodType<Prisma.FormFieldCreateManyArgs>;

export const FormFieldCreateManyZodSchema = z.object({ data: z.union([ FormFieldCreateManyInputObjectSchema, z.array(FormFieldCreateManyInputObjectSchema) ]),  }).strict();