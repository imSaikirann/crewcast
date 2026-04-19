import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FormViewSelectObjectSchema as FormViewSelectObjectSchema } from './objects/FormViewSelect.schema';
import { FormViewIncludeObjectSchema as FormViewIncludeObjectSchema } from './objects/FormViewInclude.schema';
import { FormViewCreateInputObjectSchema as FormViewCreateInputObjectSchema } from './objects/FormViewCreateInput.schema';
import { FormViewUncheckedCreateInputObjectSchema as FormViewUncheckedCreateInputObjectSchema } from './objects/FormViewUncheckedCreateInput.schema';

export const FormViewCreateOneSchema: z.ZodType<Prisma.FormViewCreateArgs> = z.object({ select: FormViewSelectObjectSchema.optional(), include: FormViewIncludeObjectSchema.optional(), data: z.union([FormViewCreateInputObjectSchema, FormViewUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.FormViewCreateArgs>;

export const FormViewCreateOneZodSchema = z.object({ select: FormViewSelectObjectSchema.optional(), include: FormViewIncludeObjectSchema.optional(), data: z.union([FormViewCreateInputObjectSchema, FormViewUncheckedCreateInputObjectSchema]) }).strict();