import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DefaultFormSchemaWhereUniqueInputObjectSchema as DefaultFormSchemaWhereUniqueInputObjectSchema } from './DefaultFormSchemaWhereUniqueInput.schema';
import { DefaultFormSchemaUpdateWithoutDomainInputObjectSchema as DefaultFormSchemaUpdateWithoutDomainInputObjectSchema } from './DefaultFormSchemaUpdateWithoutDomainInput.schema';
import { DefaultFormSchemaUncheckedUpdateWithoutDomainInputObjectSchema as DefaultFormSchemaUncheckedUpdateWithoutDomainInputObjectSchema } from './DefaultFormSchemaUncheckedUpdateWithoutDomainInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => DefaultFormSchemaWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => DefaultFormSchemaUpdateWithoutDomainInputObjectSchema), z.lazy(() => DefaultFormSchemaUncheckedUpdateWithoutDomainInputObjectSchema)])
}).strict();
export const DefaultFormSchemaUpdateWithWhereUniqueWithoutDomainInputObjectSchema: z.ZodType<Prisma.DefaultFormSchemaUpdateWithWhereUniqueWithoutDomainInput> = makeSchema() as unknown as z.ZodType<Prisma.DefaultFormSchemaUpdateWithWhereUniqueWithoutDomainInput>;
export const DefaultFormSchemaUpdateWithWhereUniqueWithoutDomainInputObjectZodSchema = makeSchema();
