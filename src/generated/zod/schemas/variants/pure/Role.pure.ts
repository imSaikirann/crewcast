import * as z from 'zod';
// prettier-ignore
export const RoleModelSchema = z.object({
    id: z.string(),
    name: z.string(),
    isActive: z.boolean(),
    fields: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type RolePureType = z.infer<typeof RoleModelSchema>;
