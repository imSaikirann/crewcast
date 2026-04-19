import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecruiterUpdateManyMutationInputObjectSchema as RecruiterUpdateManyMutationInputObjectSchema } from './objects/RecruiterUpdateManyMutationInput.schema';
import { RecruiterWhereInputObjectSchema as RecruiterWhereInputObjectSchema } from './objects/RecruiterWhereInput.schema';

export const RecruiterUpdateManySchema: z.ZodType<Prisma.RecruiterUpdateManyArgs> = z.object({ data: RecruiterUpdateManyMutationInputObjectSchema, where: RecruiterWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.RecruiterUpdateManyArgs>;

export const RecruiterUpdateManyZodSchema = z.object({ data: RecruiterUpdateManyMutationInputObjectSchema, where: RecruiterWhereInputObjectSchema.optional() }).strict();