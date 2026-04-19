import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FormViewUpdateManyMutationInputObjectSchema as FormViewUpdateManyMutationInputObjectSchema } from './objects/FormViewUpdateManyMutationInput.schema';
import { FormViewWhereInputObjectSchema as FormViewWhereInputObjectSchema } from './objects/FormViewWhereInput.schema';

export const FormViewUpdateManySchema: z.ZodType<Prisma.FormViewUpdateManyArgs> = z.object({ data: FormViewUpdateManyMutationInputObjectSchema, where: FormViewWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.FormViewUpdateManyArgs>;

export const FormViewUpdateManyZodSchema = z.object({ data: FormViewUpdateManyMutationInputObjectSchema, where: FormViewWhereInputObjectSchema.optional() }).strict();