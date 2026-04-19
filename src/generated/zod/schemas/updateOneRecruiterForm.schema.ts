import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecruiterFormSelectObjectSchema as RecruiterFormSelectObjectSchema } from './objects/RecruiterFormSelect.schema';
import { RecruiterFormIncludeObjectSchema as RecruiterFormIncludeObjectSchema } from './objects/RecruiterFormInclude.schema';
import { RecruiterFormUpdateInputObjectSchema as RecruiterFormUpdateInputObjectSchema } from './objects/RecruiterFormUpdateInput.schema';
import { RecruiterFormUncheckedUpdateInputObjectSchema as RecruiterFormUncheckedUpdateInputObjectSchema } from './objects/RecruiterFormUncheckedUpdateInput.schema';
import { RecruiterFormWhereUniqueInputObjectSchema as RecruiterFormWhereUniqueInputObjectSchema } from './objects/RecruiterFormWhereUniqueInput.schema';

export const RecruiterFormUpdateOneSchema: z.ZodType<Prisma.RecruiterFormUpdateArgs> = z.object({ select: RecruiterFormSelectObjectSchema.optional(), include: RecruiterFormIncludeObjectSchema.optional(), data: z.union([RecruiterFormUpdateInputObjectSchema, RecruiterFormUncheckedUpdateInputObjectSchema]), where: RecruiterFormWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.RecruiterFormUpdateArgs>;

export const RecruiterFormUpdateOneZodSchema = z.object({ select: RecruiterFormSelectObjectSchema.optional(), include: RecruiterFormIncludeObjectSchema.optional(), data: z.union([RecruiterFormUpdateInputObjectSchema, RecruiterFormUncheckedUpdateInputObjectSchema]), where: RecruiterFormWhereUniqueInputObjectSchema }).strict();