import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FormFieldSelectObjectSchema as FormFieldSelectObjectSchema } from './objects/FormFieldSelect.schema';
import { FormFieldIncludeObjectSchema as FormFieldIncludeObjectSchema } from './objects/FormFieldInclude.schema';
import { FormFieldCreateInputObjectSchema as FormFieldCreateInputObjectSchema } from './objects/FormFieldCreateInput.schema';
import { FormFieldUncheckedCreateInputObjectSchema as FormFieldUncheckedCreateInputObjectSchema } from './objects/FormFieldUncheckedCreateInput.schema';

export const FormFieldCreateOneSchema: z.ZodType<Prisma.FormFieldCreateArgs> = z.object({ select: FormFieldSelectObjectSchema.optional(), include: FormFieldIncludeObjectSchema.optional(), data: z.union([FormFieldCreateInputObjectSchema, FormFieldUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.FormFieldCreateArgs>;

export const FormFieldCreateOneZodSchema = z.object({ select: FormFieldSelectObjectSchema.optional(), include: FormFieldIncludeObjectSchema.optional(), data: z.union([FormFieldCreateInputObjectSchema, FormFieldUncheckedCreateInputObjectSchema]) }).strict();