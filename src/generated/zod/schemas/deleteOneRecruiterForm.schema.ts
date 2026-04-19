import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecruiterFormSelectObjectSchema as RecruiterFormSelectObjectSchema } from './objects/RecruiterFormSelect.schema';
import { RecruiterFormIncludeObjectSchema as RecruiterFormIncludeObjectSchema } from './objects/RecruiterFormInclude.schema';
import { RecruiterFormWhereUniqueInputObjectSchema as RecruiterFormWhereUniqueInputObjectSchema } from './objects/RecruiterFormWhereUniqueInput.schema';

export const RecruiterFormDeleteOneSchema: z.ZodType<Prisma.RecruiterFormDeleteArgs> = z.object({ select: RecruiterFormSelectObjectSchema.optional(), include: RecruiterFormIncludeObjectSchema.optional(), where: RecruiterFormWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.RecruiterFormDeleteArgs>;

export const RecruiterFormDeleteOneZodSchema = z.object({ select: RecruiterFormSelectObjectSchema.optional(), include: RecruiterFormIncludeObjectSchema.optional(), where: RecruiterFormWhereUniqueInputObjectSchema }).strict();