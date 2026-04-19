import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FormFieldSelectObjectSchema as FormFieldSelectObjectSchema } from './objects/FormFieldSelect.schema';
import { FormFieldIncludeObjectSchema as FormFieldIncludeObjectSchema } from './objects/FormFieldInclude.schema';
import { FormFieldWhereUniqueInputObjectSchema as FormFieldWhereUniqueInputObjectSchema } from './objects/FormFieldWhereUniqueInput.schema';
import { FormFieldCreateInputObjectSchema as FormFieldCreateInputObjectSchema } from './objects/FormFieldCreateInput.schema';
import { FormFieldUncheckedCreateInputObjectSchema as FormFieldUncheckedCreateInputObjectSchema } from './objects/FormFieldUncheckedCreateInput.schema';
import { FormFieldUpdateInputObjectSchema as FormFieldUpdateInputObjectSchema } from './objects/FormFieldUpdateInput.schema';
import { FormFieldUncheckedUpdateInputObjectSchema as FormFieldUncheckedUpdateInputObjectSchema } from './objects/FormFieldUncheckedUpdateInput.schema';

export const FormFieldUpsertOneSchema: z.ZodType<Prisma.FormFieldUpsertArgs> = z.object({ select: FormFieldSelectObjectSchema.optional(), include: FormFieldIncludeObjectSchema.optional(), where: FormFieldWhereUniqueInputObjectSchema, create: z.union([ FormFieldCreateInputObjectSchema, FormFieldUncheckedCreateInputObjectSchema ]), update: z.union([ FormFieldUpdateInputObjectSchema, FormFieldUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.FormFieldUpsertArgs>;

export const FormFieldUpsertOneZodSchema = z.object({ select: FormFieldSelectObjectSchema.optional(), include: FormFieldIncludeObjectSchema.optional(), where: FormFieldWhereUniqueInputObjectSchema, create: z.union([ FormFieldCreateInputObjectSchema, FormFieldUncheckedCreateInputObjectSchema ]), update: z.union([ FormFieldUpdateInputObjectSchema, FormFieldUncheckedUpdateInputObjectSchema ]) }).strict();