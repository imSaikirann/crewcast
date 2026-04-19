import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ApplicationWhereInputObjectSchema as ApplicationWhereInputObjectSchema } from './objects/ApplicationWhereInput.schema';

export const ApplicationDeleteManySchema: z.ZodType<Prisma.ApplicationDeleteManyArgs> = z.object({ where: ApplicationWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ApplicationDeleteManyArgs>;

export const ApplicationDeleteManyZodSchema = z.object({ where: ApplicationWhereInputObjectSchema.optional() }).strict();