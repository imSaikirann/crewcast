import * as z from 'zod';
// prettier-ignore
export const DefaultFormSchemaResultSchema = z.object({
    id: z.string(),
    domainId: z.string(),
    domain: z.unknown(),
    version: z.number().int(),
    fields: z.unknown(),
    isActive: z.boolean(),
    isForSoftwareRoles: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type DefaultFormSchemaResultType = z.infer<typeof DefaultFormSchemaResultSchema>;
