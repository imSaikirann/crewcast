import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FormViewSelectObjectSchema as FormViewSelectObjectSchema } from './objects/FormViewSelect.schema';
import { FormViewIncludeObjectSchema as FormViewIncludeObjectSchema } from './objects/FormViewInclude.schema';
import { FormViewUpdateInputObjectSchema as FormViewUpdateInputObjectSchema } from './objects/FormViewUpdateInput.schema';
import { FormViewUncheckedUpdateInputObjectSchema as FormViewUncheckedUpdateInputObjectSchema } from './objects/FormViewUncheckedUpdateInput.schema';
import { FormViewWhereUniqueInputObjectSchema as FormViewWhereUniqueInputObjectSchema } from './objects/FormViewWhereUniqueInput.schema';

export const FormViewUpdateOneSchema: z.ZodType<Prisma.FormViewUpdateArgs> = z.object({ select: FormViewSelectObjectSchema.optional(), include: FormViewIncludeObjectSchema.optional(), data: z.union([FormViewUpdateInputObjectSchema, FormViewUncheckedUpdateInputObjectSchema]), where: FormViewWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.FormViewUpdateArgs>;

export const FormViewUpdateOneZodSchema = z.object({ select: FormViewSelectObjectSchema.optional(), include: FormViewIncludeObjectSchema.optional(), data: z.union([FormViewUpdateInputObjectSchema, FormViewUncheckedUpdateInputObjectSchema]), where: FormViewWhereUniqueInputObjectSchema }).strict();