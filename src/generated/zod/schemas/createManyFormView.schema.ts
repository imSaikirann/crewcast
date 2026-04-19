import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FormViewCreateManyInputObjectSchema as FormViewCreateManyInputObjectSchema } from './objects/FormViewCreateManyInput.schema';

export const FormViewCreateManySchema: z.ZodType<Prisma.FormViewCreateManyArgs> = z.object({ data: z.union([ FormViewCreateManyInputObjectSchema, z.array(FormViewCreateManyInputObjectSchema) ]),  }).strict() as unknown as z.ZodType<Prisma.FormViewCreateManyArgs>;

export const FormViewCreateManyZodSchema = z.object({ data: z.union([ FormViewCreateManyInputObjectSchema, z.array(FormViewCreateManyInputObjectSchema) ]),  }).strict();