import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FormViewWhereInputObjectSchema as FormViewWhereInputObjectSchema } from './objects/FormViewWhereInput.schema';

export const FormViewDeleteManySchema: z.ZodType<Prisma.FormViewDeleteManyArgs> = z.object({ where: FormViewWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.FormViewDeleteManyArgs>;

export const FormViewDeleteManyZodSchema = z.object({ where: FormViewWhereInputObjectSchema.optional() }).strict();