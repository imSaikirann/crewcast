import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecruiterFormSelectObjectSchema as RecruiterFormSelectObjectSchema } from './objects/RecruiterFormSelect.schema';
import { RecruiterFormIncludeObjectSchema as RecruiterFormIncludeObjectSchema } from './objects/RecruiterFormInclude.schema';
import { RecruiterFormWhereUniqueInputObjectSchema as RecruiterFormWhereUniqueInputObjectSchema } from './objects/RecruiterFormWhereUniqueInput.schema';

export const RecruiterFormFindUniqueOrThrowSchema: z.ZodType<Prisma.RecruiterFormFindUniqueOrThrowArgs> = z.object({ select: RecruiterFormSelectObjectSchema.optional(), include: RecruiterFormIncludeObjectSchema.optional(), where: RecruiterFormWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.RecruiterFormFindUniqueOrThrowArgs>;

export const RecruiterFormFindUniqueOrThrowZodSchema = z.object({ select: RecruiterFormSelectObjectSchema.optional(), include: RecruiterFormIncludeObjectSchema.optional(), where: RecruiterFormWhereUniqueInputObjectSchema }).strict();