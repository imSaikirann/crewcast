import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ApplicationUpdateManyMutationInputObjectSchema as ApplicationUpdateManyMutationInputObjectSchema } from './objects/ApplicationUpdateManyMutationInput.schema';
import { ApplicationWhereInputObjectSchema as ApplicationWhereInputObjectSchema } from './objects/ApplicationWhereInput.schema';

export const ApplicationUpdateManySchema: z.ZodType<Prisma.ApplicationUpdateManyArgs> = z.object({ data: ApplicationUpdateManyMutationInputObjectSchema, where: ApplicationWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ApplicationUpdateManyArgs>;

export const ApplicationUpdateManyZodSchema = z.object({ data: ApplicationUpdateManyMutationInputObjectSchema, where: ApplicationWhereInputObjectSchema.optional() }).strict();