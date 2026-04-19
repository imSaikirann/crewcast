import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecruiterCreateManyInputObjectSchema as RecruiterCreateManyInputObjectSchema } from './objects/RecruiterCreateManyInput.schema';

export const RecruiterCreateManySchema: z.ZodType<Prisma.RecruiterCreateManyArgs> = z.object({ data: z.union([ RecruiterCreateManyInputObjectSchema, z.array(RecruiterCreateManyInputObjectSchema) ]),  }).strict() as unknown as z.ZodType<Prisma.RecruiterCreateManyArgs>;

export const RecruiterCreateManyZodSchema = z.object({ data: z.union([ RecruiterCreateManyInputObjectSchema, z.array(RecruiterCreateManyInputObjectSchema) ]),  }).strict();