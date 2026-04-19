import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ApplicationCreateManyInputObjectSchema as ApplicationCreateManyInputObjectSchema } from './objects/ApplicationCreateManyInput.schema';

export const ApplicationCreateManySchema: z.ZodType<Prisma.ApplicationCreateManyArgs> = z.object({ data: z.union([ ApplicationCreateManyInputObjectSchema, z.array(ApplicationCreateManyInputObjectSchema) ]),  }).strict() as unknown as z.ZodType<Prisma.ApplicationCreateManyArgs>;

export const ApplicationCreateManyZodSchema = z.object({ data: z.union([ ApplicationCreateManyInputObjectSchema, z.array(ApplicationCreateManyInputObjectSchema) ]),  }).strict();