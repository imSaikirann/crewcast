import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecruiterFormCreateManyInputObjectSchema as RecruiterFormCreateManyInputObjectSchema } from './objects/RecruiterFormCreateManyInput.schema';

export const RecruiterFormCreateManySchema: z.ZodType<Prisma.RecruiterFormCreateManyArgs> = z.object({ data: z.union([ RecruiterFormCreateManyInputObjectSchema, z.array(RecruiterFormCreateManyInputObjectSchema) ]),  }).strict() as unknown as z.ZodType<Prisma.RecruiterFormCreateManyArgs>;

export const RecruiterFormCreateManyZodSchema = z.object({ data: z.union([ RecruiterFormCreateManyInputObjectSchema, z.array(RecruiterFormCreateManyInputObjectSchema) ]),  }).strict();