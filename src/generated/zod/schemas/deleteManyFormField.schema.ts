import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FormFieldWhereInputObjectSchema as FormFieldWhereInputObjectSchema } from './objects/FormFieldWhereInput.schema';

export const FormFieldDeleteManySchema: z.ZodType<Prisma.FormFieldDeleteManyArgs> = z.object({ where: FormFieldWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.FormFieldDeleteManyArgs>;

export const FormFieldDeleteManyZodSchema = z.object({ where: FormFieldWhereInputObjectSchema.optional() }).strict();