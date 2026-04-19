import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FormFieldSelectObjectSchema as FormFieldSelectObjectSchema } from './objects/FormFieldSelect.schema';
import { FormFieldIncludeObjectSchema as FormFieldIncludeObjectSchema } from './objects/FormFieldInclude.schema';
import { FormFieldUpdateInputObjectSchema as FormFieldUpdateInputObjectSchema } from './objects/FormFieldUpdateInput.schema';
import { FormFieldUncheckedUpdateInputObjectSchema as FormFieldUncheckedUpdateInputObjectSchema } from './objects/FormFieldUncheckedUpdateInput.schema';
import { FormFieldWhereUniqueInputObjectSchema as FormFieldWhereUniqueInputObjectSchema } from './objects/FormFieldWhereUniqueInput.schema';

export const FormFieldUpdateOneSchema: z.ZodType<Prisma.FormFieldUpdateArgs> = z.object({ select: FormFieldSelectObjectSchema.optional(), include: FormFieldIncludeObjectSchema.optional(), data: z.union([FormFieldUpdateInputObjectSchema, FormFieldUncheckedUpdateInputObjectSchema]), where: FormFieldWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.FormFieldUpdateArgs>;

export const FormFieldUpdateOneZodSchema = z.object({ select: FormFieldSelectObjectSchema.optional(), include: FormFieldIncludeObjectSchema.optional(), data: z.union([FormFieldUpdateInputObjectSchema, FormFieldUncheckedUpdateInputObjectSchema]), where: FormFieldWhereUniqueInputObjectSchema }).strict();