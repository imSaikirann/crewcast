import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RoleCountOutputTypeCountFieldsArgsObjectSchema as RoleCountOutputTypeCountFieldsArgsObjectSchema } from './RoleCountOutputTypeCountFieldsArgs.schema'

const makeSchema = () => z.object({
  fields: z.union([z.boolean(), z.lazy(() => RoleCountOutputTypeCountFieldsArgsObjectSchema)]).optional()
}).strict();
export const RoleCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.RoleCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.RoleCountOutputTypeSelect>;
export const RoleCountOutputTypeSelectObjectZodSchema = makeSchema();
