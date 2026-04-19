import * as z from 'zod';
// prettier-ignore
export const DefaultFormSchemaInputSchema = z.object({
    id: z.string(),
    domainId: z.string(),
    domain: z.unknown(),
    version: z.number().int(),
    fields: z.unknown(),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type DefaultFormSchemaInputType = z.infer<typeof DefaultFormSchemaInputSchema>;
