import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecruiterFormUpdateManyMutationInputObjectSchema as RecruiterFormUpdateManyMutationInputObjectSchema } from './objects/RecruiterFormUpdateManyMutationInput.schema';
import { RecruiterFormWhereInputObjectSchema as RecruiterFormWhereInputObjectSchema } from './objects/RecruiterFormWhereInput.schema';

export const RecruiterFormUpdateManySchema: z.ZodType<Prisma.RecruiterFormUpdateManyArgs> = z.object({ data: RecruiterFormUpdateManyMutationInputObjectSchema, where: RecruiterFormWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.RecruiterFormUpdateManyArgs>;

export const RecruiterFormUpdateManyZodSchema = z.object({ data: RecruiterFormUpdateManyMutationInputObjectSchema, where: RecruiterFormWhereInputObjectSchema.optional() }).strict();