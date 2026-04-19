import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FormViewSelectObjectSchema as FormViewSelectObjectSchema } from './objects/FormViewSelect.schema';
import { FormViewIncludeObjectSchema as FormViewIncludeObjectSchema } from './objects/FormViewInclude.schema';
import { FormViewWhereUniqueInputObjectSchema as FormViewWhereUniqueInputObjectSchema } from './objects/FormViewWhereUniqueInput.schema';
import { FormViewCreateInputObjectSchema as FormViewCreateInputObjectSchema } from './objects/FormViewCreateInput.schema';
import { FormViewUncheckedCreateInputObjectSchema as FormViewUncheckedCreateInputObjectSchema } from './objects/FormViewUncheckedCreateInput.schema';
import { FormViewUpdateInputObjectSchema as FormViewUpdateInputObjectSchema } from './objects/FormViewUpdateInput.schema';
import { FormViewUncheckedUpdateInputObjectSchema as FormViewUncheckedUpdateInputObjectSchema } from './objects/FormViewUncheckedUpdateInput.schema';

export const FormViewUpsertOneSchema: z.ZodType<Prisma.FormViewUpsertArgs> = z.object({ select: FormViewSelectObjectSchema.optional(), include: FormViewIncludeObjectSchema.optional(), where: FormViewWhereUniqueInputObjectSchema, create: z.union([ FormViewCreateInputObjectSchema, FormViewUncheckedCreateInputObjectSchema ]), update: z.union([ FormViewUpdateInputObjectSchema, FormViewUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.FormViewUpsertArgs>;

export const FormViewUpsertOneZodSchema = z.object({ select: FormViewSelectObjectSchema.optional(), include: FormViewIncludeObjectSchema.optional(), where: FormViewWhereUniqueInputObjectSchema, create: z.union([ FormViewCreateInputObjectSchema, FormViewUncheckedCreateInputObjectSchema ]), update: z.union([ FormViewUpdateInputObjectSchema, FormViewUncheckedUpdateInputObjectSchema ]) }).strict();