import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FormViewWhereInputObjectSchema as FormViewWhereInputObjectSchema } from './FormViewWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FormViewWhereInputObjectSchema).optional()
}).strict();
export const RecruiterFormCountOutputTypeCountViewsArgsObjectSchema = makeSchema();
export const RecruiterFormCountOutputTypeCountViewsArgsObjectZodSchema = makeSchema();
