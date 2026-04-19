import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecruiterCreateWithoutRecruiterFormsInputObjectSchema as RecruiterCreateWithoutRecruiterFormsInputObjectSchema } from './RecruiterCreateWithoutRecruiterFormsInput.schema';
import { RecruiterUncheckedCreateWithoutRecruiterFormsInputObjectSchema as RecruiterUncheckedCreateWithoutRecruiterFormsInputObjectSchema } from './RecruiterUncheckedCreateWithoutRecruiterFormsInput.schema';
import { RecruiterCreateOrConnectWithoutRecruiterFormsInputObjectSchema as RecruiterCreateOrConnectWithoutRecruiterFormsInputObjectSchema } from './RecruiterCreateOrConnectWithoutRecruiterFormsInput.schema';
import { RecruiterUpsertWithoutRecruiterFormsInputObjectSchema as RecruiterUpsertWithoutRecruiterFormsInputObjectSchema } from './RecruiterUpsertWithoutRecruiterFormsInput.schema';
import { RecruiterWhereUniqueInputObjectSchema as RecruiterWhereUniqueInputObjectSchema } from './RecruiterWhereUniqueInput.schema';
import { RecruiterUpdateToOneWithWhereWithoutRecruiterFormsInputObjectSchema as RecruiterUpdateToOneWithWhereWithoutRecruiterFormsInputObjectSchema } from './RecruiterUpdateToOneWithWhereWithoutRecruiterFormsInput.schema';
import { RecruiterUpdateWithoutRecruiterFormsInputObjectSchema as RecruiterUpdateWithoutRecruiterFormsInputObjectSchema } from './RecruiterUpdateWithoutRecruiterFormsInput.schema';
import { RecruiterUncheckedUpdateWithoutRecruiterFormsInputObjectSchema as RecruiterUncheckedUpdateWithoutRecruiterFormsInputObjectSchema } from './RecruiterUncheckedUpdateWithoutRecruiterFormsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RecruiterCreateWithoutRecruiterFormsInputObjectSchema), z.lazy(() => RecruiterUncheckedCreateWithoutRecruiterFormsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => RecruiterCreateOrConnectWithoutRecruiterFormsInputObjectSchema).optional(),
  upsert: z.lazy(() => RecruiterUpsertWithoutRecruiterFormsInputObjectSchema).optional(),
  connect: z.lazy(() => RecruiterWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => RecruiterUpdateToOneWithWhereWithoutRecruiterFormsInputObjectSchema), z.lazy(() => RecruiterUpdateWithoutRecruiterFormsInputObjectSchema), z.lazy(() => RecruiterUncheckedUpdateWithoutRecruiterFormsInputObjectSchema)]).optional()
}).strict();
export const RecruiterUpdateOneRequiredWithoutRecruiterFormsNestedInputObjectSchema: z.ZodType<Prisma.RecruiterUpdateOneRequiredWithoutRecruiterFormsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterUpdateOneRequiredWithoutRecruiterFormsNestedInput>;
export const RecruiterUpdateOneRequiredWithoutRecruiterFormsNestedInputObjectZodSchema = makeSchema();
