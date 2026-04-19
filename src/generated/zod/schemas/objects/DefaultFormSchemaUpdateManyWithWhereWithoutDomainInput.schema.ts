import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DefaultFormSchemaScalarWhereInputObjectSchema as DefaultFormSchemaScalarWhereInputObjectSchema } from './DefaultFormSchemaScalarWhereInput.schema';
import { DefaultFormSchemaUpdateManyMutationInputObjectSchema as DefaultFormSchemaUpdateManyMutationInputObjectSchema } from './DefaultFormSchemaUpdateManyMutationInput.schema';
import { DefaultFormSchemaUncheckedUpdateManyWithoutDomainInputObjectSchema as DefaultFormSchemaUncheckedUpdateManyWithoutDomainInputObjectSchema } from './DefaultFormSchemaUncheckedUpdateManyWithoutDomainInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => DefaultFormSchemaScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => DefaultFormSchemaUpdateManyMutationInputObjectSchema), z.lazy(() => DefaultFormSchemaUncheckedUpdateManyWithoutDomainInputObjectSchema)])
}).strict();
export const DefaultFormSchemaUpdateManyWithWhereWithoutDomainInputObjectSchema: z.ZodType<Prisma.DefaultFormSchemaUpdateManyWithWhereWithoutDomainInput> = makeSchema() as unknown as z.ZodType<Prisma.DefaultFormSchemaUpdateManyWithWhereWithoutDomainInput>;
export const DefaultFormSchemaUpdateManyWithWhereWithoutDomainInputObjectZodSchema = makeSchema();
