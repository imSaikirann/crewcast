import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationStatusSchema } from '../enums/ApplicationStatus.schema';
import { NestedEnumApplicationStatusFilterObjectSchema as NestedEnumApplicationStatusFilterObjectSchema } from './NestedEnumApplicationStatusFilter.schema'

const makeSchema = () => z.object({
  equals: ApplicationStatusSchema.optional(),
  in: ApplicationStatusSchema.array().optional(),
  notIn: ApplicationStatusSchema.array().optional(),
  not: z.union([ApplicationStatusSchema, z.lazy(() => NestedEnumApplicationStatusFilterObjectSchema)]).optional()
}).strict();
export const EnumApplicationStatusFilterObjectSchema: z.ZodType<Prisma.EnumApplicationStatusFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumApplicationStatusFilter>;
export const EnumApplicationStatusFilterObjectZodSchema = makeSchema();
