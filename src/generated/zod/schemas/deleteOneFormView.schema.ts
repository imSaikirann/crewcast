import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FormViewSelectObjectSchema as FormViewSelectObjectSchema } from './objects/FormViewSelect.schema';
import { FormViewIncludeObjectSchema as FormViewIncludeObjectSchema } from './objects/FormViewInclude.schema';
import { FormViewWhereUniqueInputObjectSchema as FormViewWhereUniqueInputObjectSchema } from './objects/FormViewWhereUniqueInput.schema';

export const FormViewDeleteOneSchema: z.ZodType<Prisma.FormViewDeleteArgs> = z.object({ select: FormViewSelectObjectSchema.optional(), include: FormViewIncludeObjectSchema.optional(), where: FormViewWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.FormViewDeleteArgs>;

export const FormViewDeleteOneZodSchema = z.object({ select: FormViewSelectObjectSchema.optional(), include: FormViewIncludeObjectSchema.optional(), where: FormViewWhereUniqueInputObjectSchema }).strict();