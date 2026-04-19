import * as z from 'zod';
// prettier-ignore
export const RoleInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    isActive: z.boolean(),
    fields: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type RoleInputType = z.infer<typeof RoleInputSchema>;
