import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { DomainsCreateManyInputObjectSchema as DomainsCreateManyInputObjectSchema } from './objects/DomainsCreateManyInput.schema';

export const DomainsCreateManySchema: z.ZodType<Prisma.DomainsCreateManyArgs> = z.object({ data: z.union([ DomainsCreateManyInputObjectSchema, z.array(DomainsCreateManyInputObjectSchema) ]),  }).strict() as unknown as z.ZodType<Prisma.DomainsCreateManyArgs>;

export const DomainsCreateManyZodSchema = z.object({ data: z.union([ DomainsCreateManyInputObjectSchema, z.array(DomainsCreateManyInputObjectSchema) ]),  }).strict();