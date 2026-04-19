import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecruiterFormSelectObjectSchema as RecruiterFormSelectObjectSchema } from './objects/RecruiterFormSelect.schema';
import { RecruiterFormIncludeObjectSchema as RecruiterFormIncludeObjectSchema } from './objects/RecruiterFormInclude.schema';
import { RecruiterFormWhereUniqueInputObjectSchema as RecruiterFormWhereUniqueInputObjectSchema } from './objects/RecruiterFormWhereUniqueInput.schema';
import { RecruiterFormCreateInputObjectSchema as RecruiterFormCreateInputObjectSchema } from './objects/RecruiterFormCreateInput.schema';
import { RecruiterFormUncheckedCreateInputObjectSchema as RecruiterFormUncheckedCreateInputObjectSchema } from './objects/RecruiterFormUncheckedCreateInput.schema';
import { RecruiterFormUpdateInputObjectSchema as RecruiterFormUpdateInputObjectSchema } from './objects/RecruiterFormUpdateInput.schema';
import { RecruiterFormUncheckedUpdateInputObjectSchema as RecruiterFormUncheckedUpdateInputObjectSchema } from './objects/RecruiterFormUncheckedUpdateInput.schema';

export const RecruiterFormUpsertOneSchema: z.ZodType<Prisma.RecruiterFormUpsertArgs> = z.object({ select: RecruiterFormSelectObjectSchema.optional(), include: RecruiterFormIncludeObjectSchema.optional(), where: RecruiterFormWhereUniqueInputObjectSchema, create: z.union([ RecruiterFormCreateInputObjectSchema, RecruiterFormUncheckedCreateInputObjectSchema ]), update: z.union([ RecruiterFormUpdateInputObjectSchema, RecruiterFormUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.RecruiterFormUpsertArgs>;

export const RecruiterFormUpsertOneZodSchema = z.object({ select: RecruiterFormSelectObjectSchema.optional(), include: RecruiterFormIncludeObjectSchema.optional(), where: RecruiterFormWhereUniqueInputObjectSchema, create: z.union([ RecruiterFormCreateInputObjectSchema, RecruiterFormUncheckedCreateInputObjectSchema ]), update: z.union([ RecruiterFormUpdateInputObjectSchema, RecruiterFormUncheckedUpdateInputObjectSchema ]) }).strict();