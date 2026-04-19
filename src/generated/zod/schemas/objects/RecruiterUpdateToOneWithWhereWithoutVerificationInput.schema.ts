import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterWhereInputObjectSchema as RecruiterWhereInputObjectSchema } from './RecruiterWhereInput.schema';
import { RecruiterUpdateWithoutVerificationInputObjectSchema as RecruiterUpdateWithoutVerificationInputObjectSchema } from './RecruiterUpdateWithoutVerificationInput.schema';
import { RecruiterUncheckedUpdateWithoutVerificationInputObjectSchema as RecruiterUncheckedUpdateWithoutVerificationInputObjectSchema } from './RecruiterUncheckedUpdateWithoutVerificationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RecruiterWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => RecruiterUpdateWithoutVerificationInputObjectSchema), z.lazy(() => RecruiterUncheckedUpdateWithoutVerificationInputObjectSchema)])
}).strict();
export const RecruiterUpdateToOneWithWhereWithoutVerificationInputObjectSchema: z.ZodType<Prisma.RecruiterUpdateToOneWithWhereWithoutVerificationInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterUpdateToOneWithWhereWithoutVerificationInput>;
export const RecruiterUpdateToOneWithWhereWithoutVerificationInputObjectZodSchema = makeSchema();
