import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FormFieldSelectObjectSchema as FormFieldSelectObjectSchema } from './objects/FormFieldSelect.schema';
import { FormFieldIncludeObjectSchema as FormFieldIncludeObjectSchema } from './objects/FormFieldInclude.schema';
import { FormFieldWhereUniqueInputObjectSchema as FormFieldWhereUniqueInputObjectSchema } from './objects/FormFieldWhereUniqueInput.schema';

export const FormFieldDeleteOneSchema: z.ZodType<Prisma.FormFieldDeleteArgs> = z.object({ select: FormFieldSelectObjectSchema.optional(), include: FormFieldIncludeObjectSchema.optional(), where: FormFieldWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.FormFieldDeleteArgs>;

export const FormFieldDeleteOneZodSchema = z.object({ select: FormFieldSelectObjectSchema.optional(), include: FormFieldIncludeObjectSchema.optional(), where: FormFieldWhereUniqueInputObjectSchema }).strict();