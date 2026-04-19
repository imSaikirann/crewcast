import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApplicationStatusSchema } from '../enums/ApplicationStatus.schema'

const nestedenumapplicationstatusfilterSchema = z.object({
  equals: ApplicationStatusSchema.optional(),
  in: ApplicationStatusSchema.array().optional(),
  notIn: ApplicationStatusSchema.array().optional(),
  not: z.union([ApplicationStatusSchema, z.lazy(() => NestedEnumApplicationStatusFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumApplicationStatusFilterObjectSchema: z.ZodType<Prisma.NestedEnumApplicationStatusFilter> = nestedenumapplicationstatusfilterSchema as unknown as z.ZodType<Prisma.NestedEnumApplicationStatusFilter>;
export const NestedEnumApplicationStatusFilterObjectZodSchema = nestedenumapplicationstatusfilterSchema;
