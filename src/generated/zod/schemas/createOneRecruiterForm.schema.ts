import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecruiterFormSelectObjectSchema as RecruiterFormSelectObjectSchema } from './objects/RecruiterFormSelect.schema';
import { RecruiterFormIncludeObjectSchema as RecruiterFormIncludeObjectSchema } from './objects/RecruiterFormInclude.schema';
import { RecruiterFormCreateInputObjectSchema as RecruiterFormCreateInputObjectSchema } from './objects/RecruiterFormCreateInput.schema';
import { RecruiterFormUncheckedCreateInputObjectSchema as RecruiterFormUncheckedCreateInputObjectSchema } from './objects/RecruiterFormUncheckedCreateInput.schema';

export const RecruiterFormCreateOneSchema: z.ZodType<Prisma.RecruiterFormCreateArgs> = z.object({ select: RecruiterFormSelectObjectSchema.optional(), include: RecruiterFormIncludeObjectSchema.optional(), data: z.union([RecruiterFormCreateInputObjectSchema, RecruiterFormUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.RecruiterFormCreateArgs>;

export const RecruiterFormCreateOneZodSchema = z.object({ select: RecruiterFormSelectObjectSchema.optional(), include: RecruiterFormIncludeObjectSchema.optional(), data: z.union([RecruiterFormCreateInputObjectSchema, RecruiterFormUncheckedCreateInputObjectSchema]) }).strict();