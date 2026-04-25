import * as z from 'zod';
export const DefaultFormSchemaFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  domainId: z.string(),
  domain: z.unknown(),
  version: z.number().int(),
  fields: z.unknown(),
  isActive: z.boolean(),
  isForSoftwareRoles: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date()
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});