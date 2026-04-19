import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterWhereInputObjectSchema as RecruiterWhereInputObjectSchema } from './RecruiterWhereInput.schema';
import { RecruiterUpdateWithoutUserInputObjectSchema as RecruiterUpdateWithoutUserInputObjectSchema } from './RecruiterUpdateWithoutUserInput.schema';
import { RecruiterUncheckedUpdateWithoutUserInputObjectSchema as RecruiterUncheckedUpdateWithoutUserInputObjectSchema } from './RecruiterUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RecruiterWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => RecruiterUpdateWithoutUserInputObjectSchema), z.lazy(() => RecruiterUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const RecruiterUpdateToOneWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.RecruiterUpdateToOneWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterUpdateToOneWithWhereWithoutUserInput>;
export const RecruiterUpdateToOneWithWhereWithoutUserInputObjectZodSchema = makeSchema();
