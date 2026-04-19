import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FormFieldUpdateManyMutationInputObjectSchema as FormFieldUpdateManyMutationInputObjectSchema } from './objects/FormFieldUpdateManyMutationInput.schema';
import { FormFieldWhereInputObjectSchema as FormFieldWhereInputObjectSchema } from './objects/FormFieldWhereInput.schema';

export const FormFieldUpdateManySchema: z.ZodType<Prisma.FormFieldUpdateManyArgs> = z.object({ data: FormFieldUpdateManyMutationInputObjectSchema, where: FormFieldWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.FormFieldUpdateManyArgs>;

export const FormFieldUpdateManyZodSchema = z.object({ data: FormFieldUpdateManyMutationInputObjectSchema, where: FormFieldWhereInputObjectSchema.optional() }).strict();