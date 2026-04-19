import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FormViewSelectObjectSchema as FormViewSelectObjectSchema } from './objects/FormViewSelect.schema';
import { FormViewIncludeObjectSchema as FormViewIncludeObjectSchema } from './objects/FormViewInclude.schema';
import { FormViewWhereUniqueInputObjectSchema as FormViewWhereUniqueInputObjectSchema } from './objects/FormViewWhereUniqueInput.schema';

export const FormViewFindUniqueOrThrowSchema: z.ZodType<Prisma.FormViewFindUniqueOrThrowArgs> = z.object({ select: FormViewSelectObjectSchema.optional(), include: FormViewIncludeObjectSchema.optional(), where: FormViewWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.FormViewFindUniqueOrThrowArgs>;

export const FormViewFindUniqueOrThrowZodSchema = z.object({ select: FormViewSelectObjectSchema.optional(), include: FormViewIncludeObjectSchema.optional(), where: FormViewWhereUniqueInputObjectSchema }).strict();