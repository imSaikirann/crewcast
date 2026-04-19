import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ApplicationScoreCreateManyInputObjectSchema as ApplicationScoreCreateManyInputObjectSchema } from './objects/ApplicationScoreCreateManyInput.schema';

export const ApplicationScoreCreateManySchema: z.ZodType<Prisma.ApplicationScoreCreateManyArgs> = z.object({ data: z.union([ ApplicationScoreCreateManyInputObjectSchema, z.array(ApplicationScoreCreateManyInputObjectSchema) ]),  }).strict() as unknown as z.ZodType<Prisma.ApplicationScoreCreateManyArgs>;

export const ApplicationScoreCreateManyZodSchema = z.object({ data: z.union([ ApplicationScoreCreateManyInputObjectSchema, z.array(ApplicationScoreCreateManyInputObjectSchema) ]),  }).strict();