import * as z from 'zod';
// prettier-ignore
export const RoleResultSchema = z.object({
    id: z.string(),
    name: z.string(),
    isActive: z.boolean(),
    fields: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type RoleResultType = z.infer<typeof RoleResultSchema>;
