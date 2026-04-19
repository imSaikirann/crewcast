import * as z from 'zod';
// prettier-ignore
export const UpgradeRequestResultSchema = z.object({
    id: z.string(),
    userId: z.string(),
    email: z.string(),
    company: z.string(),
    plan: z.string(),
    status: z.string(),
    createdAt: z.date()
}).strict();

export type UpgradeRequestResultType = z.infer<typeof UpgradeRequestResultSchema>;
