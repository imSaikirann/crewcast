import * as z from 'zod';
export const DefaultFormSchemaDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  domainId: z.string(),
  domain: z.unknown(),
  version: z.number().int(),
  fields: z.unknown(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date()
}));