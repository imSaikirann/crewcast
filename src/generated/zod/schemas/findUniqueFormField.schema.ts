import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FormFieldSelectObjectSchema as FormFieldSelectObjectSchema } from './objects/FormFieldSelect.schema';
import { FormFieldIncludeObjectSchema as FormFieldIncludeObjectSchema } from './objects/FormFieldInclude.schema';
import { FormFieldWhereUniqueInputObjectSchema as FormFieldWhereUniqueInputObjectSchema } from './objects/FormFieldWhereUniqueInput.schema';

export const FormFieldFindUniqueSchema: z.ZodType<Prisma.FormFieldFindUniqueArgs> = z.object({ select: FormFieldSelectObjectSchema.optional(), include: FormFieldIncludeObjectSchema.optional(), where: FormFieldWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.FormFieldFindUniqueArgs>;

export const FormFieldFindUniqueZodSchema = z.object({ select: FormFieldSelectObjectSchema.optional(), include: FormFieldIncludeObjectSchema.optional(), where: FormFieldWhereUniqueInputObjectSchema }).strict();