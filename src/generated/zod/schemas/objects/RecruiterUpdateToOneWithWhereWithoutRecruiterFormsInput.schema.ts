import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterWhereInputObjectSchema as RecruiterWhereInputObjectSchema } from './RecruiterWhereInput.schema';
import { RecruiterUpdateWithoutRecruiterFormsInputObjectSchema as RecruiterUpdateWithoutRecruiterFormsInputObjectSchema } from './RecruiterUpdateWithoutRecruiterFormsInput.schema';
import { RecruiterUncheckedUpdateWithoutRecruiterFormsInputObjectSchema as RecruiterUncheckedUpdateWithoutRecruiterFormsInputObjectSchema } from './RecruiterUncheckedUpdateWithoutRecruiterFormsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RecruiterWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => RecruiterUpdateWithoutRecruiterFormsInputObjectSchema), z.lazy(() => RecruiterUncheckedUpdateWithoutRecruiterFormsInputObjectSchema)])
}).strict();
export const RecruiterUpdateToOneWithWhereWithoutRecruiterFormsInputObjectSchema: z.ZodType<Prisma.RecruiterUpdateToOneWithWhereWithoutRecruiterFormsInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterUpdateToOneWithWhereWithoutRecruiterFormsInput>;
export const RecruiterUpdateToOneWithWhereWithoutRecruiterFormsInputObjectZodSchema = makeSchema();
