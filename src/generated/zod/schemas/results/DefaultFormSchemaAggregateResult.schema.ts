import * as z from 'zod';
export const DefaultFormSchemaAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    domainId: z.number(),
    domain: z.number(),
    version: z.number(),
    fields: z.number(),
    isActive: z.number(),
    isForSoftwareRoles: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    version: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    version: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    domainId: z.string().nullable(),
    version: z.number().int().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    domainId: z.string().nullable(),
    version: z.number().int().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});