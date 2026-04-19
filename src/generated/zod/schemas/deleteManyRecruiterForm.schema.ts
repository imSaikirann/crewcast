import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecruiterFormWhereInputObjectSchema as RecruiterFormWhereInputObjectSchema } from './objects/RecruiterFormWhereInput.schema';

export const RecruiterFormDeleteManySchema: z.ZodType<Prisma.RecruiterFormDeleteManyArgs> = z.object({ where: RecruiterFormWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.RecruiterFormDeleteManyArgs>;

export const RecruiterFormDeleteManyZodSchema = z.object({ where: RecruiterFormWhereInputObjectSchema.optional() }).strict();